from pathlib import Path
from playwright.sync_api import sync_playwright

root = Path(__file__).parent
checks = root / 'checks'
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='C:/Program Files/Google/Chrome/Application/chrome.exe', headless=True)
    page = browser.new_page(viewport={'width':1440,'height':1000})
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.add_init_script('window.__NativeAudio=Audio; window.Audio=class extends window.__NativeAudio {constructor(...args){super(...args);window.__lastAudio=this;}};')
    page.goto((root/'index.html').as_uri())
    # Existing readers receive larger type without losing their saved work.
    page.evaluate('localStorage.setItem("sunshine-unit1-v1",JSON.stringify({font:19,answers:{"writing-d3":"My name is Alex."},saved:["friendly"]}))')
    page.reload()
    assert page.evaluate('Sunshine.getState().font') == 24
    assert page.evaluate('Sunshine.getState().answers["writing-d3"]') == 'My name is Alex.'
    assert page.evaluate('Sunshine.getState().saved.includes("friendly")')
    page.locator('a[href="#reading"]').click()
    page.wait_for_selector('.profile')
    assert page.locator('.profile p').first.evaluate('e=>getComputedStyle(e).fontSize') == '24px'
    assert page.locator('.new-word').first.evaluate('e=>getComputedStyle(e).borderRadius') == '6px'
    missing = page.evaluate('''() => {
      const covered=new Set(WORD_EXAMPLES.flatMap(e=>e[0].toLowerCase().replace(/’/g,"'").split(' ')));
      return Sunshine.unitWords().filter(w=>!covered.has(w));
    }''')
    assert not missing, missing
    missing_audio = page.evaluate('WORD_EXAMPLES.filter(e=>!AUDIO_PHRASES[e[1]]).map(e=>e[0])')
    assert not missing_audio, missing_audio
    for word in ['friendly','classmates','introducing']:
        page.locator(f'[data-word="{word}"]').first.click()
        assert page.locator('#word-example-en').inner_text()
        assert page.locator('#word-example-zh').inner_text()
        page.locator('#example-speak').click()
        page.wait_for_function('window.__lastAudio && window.__lastAudio.src.includes("example-") && window.__lastAudio.duration > 0 && !window.__lastAudio.paused')
        if word == 'friendly':
            assert page.locator('#word-example-en').inner_text() == 'My new classmate is friendly.'
            assert page.locator('#word-example-zh').inner_text() == '我的新同学很友好。'
            page.screenshot(path=str(checks/'updated-word-desktop.png'))
        page.keyboard.press('Escape')
        page.wait_for_function('__lastAudio.paused')
    page.locator('[data-action="settings"]').click()
    page.locator('#known-mode').select_option('strict')
    strict_missing = page.evaluate('''() => {
      const covered=new Set(WORD_EXAMPLES.flatMap(e=>e[0].toLowerCase().replace(/’/g,"'").split(' ')));
      return Sunshine.unitWords().filter(w=>!covered.has(w));
    }''')
    assert not strict_missing,strict_missing
    page.locator('#known-mode').select_option('basic')
    page.keyboard.press('Escape')
    for width in [1440,1024,768,390,320]:
        page.set_viewport_size({'width':width,'height':900})
        for section in ['welcome','reading','grammar','sounds','integration','writing','assessment']:
            page.evaluate('(s)=>location.hash=s',section)
            page.wait_for_function('(s)=>Sunshine.getState().section===s',arg=section)
            assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(width,section)
        page.evaluate('location.hash="reading"')
        page.wait_for_selector('.profile')
        page.locator('[data-word="friendly"]').first.click()
        assert page.locator('#word-dialog').evaluate('e=>e.scrollWidth <= e.clientWidth'),width
        page.locator('#example-speak').click()
        page.wait_for_function('window.__lastAudio && window.__lastAudio.duration>0')
        if width==390:
            page.screenshot(path=str(checks/'updated-word-mobile.png'))
        page.keyboard.press('Escape')
    page.locator('[data-action="settings"]').click()
    page.locator('#font-size').fill('30')
    page.keyboard.press('Escape')
    for section in ['welcome','reading','grammar','sounds','integration','writing','assessment']:
        page.evaluate('(s)=>location.hash=s',section)
        page.wait_for_function('(s)=>Sunshine.getState().section===s',arg=section)
        assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),('large type',section,page.evaluate('[...document.querySelectorAll("#main *")].filter(e=>e.getBoundingClientRect().right>innerWidth).map(e=>({tag:e.tagName,cls:e.className,text:e.textContent.slice(0,100),width:e.getBoundingClientRect().width})).slice(0,20)'))
    page.reload()
    assert page.evaluate('Sunshine.getState().font') == 30
    assert not errors, errors
    browser.close()
print('PASS: examples, offline playback, saved progress, both vocabulary modes, five window sizes, maximum text size.')
