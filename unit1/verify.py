from pathlib import Path
import json
import wave
import struct
from playwright.sync_api import sync_playwright

root = Path(__file__).parent
out = root / 'checks'
out.mkdir(exist_ok=True)
errors = []
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='C:/Program Files/Google/Chrome/Application/chrome.exe', headless=True)
    page = browser.new_page(viewport={'width':1440,'height':1000}, device_scale_factor=1)
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.add_init_script('window.__NativeAudio=Audio; window.Audio=class extends window.__NativeAudio {constructor(...args){super(...args);window.__lastAudio=this;}};')
    page.goto((root / 'index.html').as_uri())
    page.wait_for_selector('.hero')
    assert page.locator('.hero h1').inner_text() == 'This is me!'
    assert page.evaluate('Sunshine.isNew("friendly") && !Sunshine.isNew("school") && !Sunshine.isNew("reading") && !Sunshine.isNew("am")')
    page.screenshot(path=str(out/'desktop-welcome.png'), full_page=False)
    sections = page.evaluate('UNIT.sections.map(s=>s.id)')
    for section in sections:
        page.evaluate('(s)=>location.hash=s',section)
        page.wait_for_function('(s)=>Sunshine.getState().section===s',arg=section)
        page.wait_for_timeout(100)
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), section
        assert page.locator('#main').inner_text().strip(), section
        assert page.evaluate('[...document.querySelectorAll("#main img")].every(i=>i.complete && i.naturalWidth>0)'),section
        exercises = page.evaluate('UNIT.sections.flatMap(s=>s.blocks).filter(b=>b.type==="exercise" && document.querySelector(`[data-exercise="${b.id}"]`))')
        for ex in exercises:
            for qi,q in enumerate(ex['questions']):
                answers = q[1:2] if ex.get('kind') == 'tf' else q[1:]
                for ai,answer in enumerate(answers):
                    key = f"{ex['id']}-{qi}-{ai}"
                    loc=page.locator(f'[data-answer="{key}"]')
                    if ex.get('kind') == 'tf':
                        page.locator(f'[data-answer="{key}"][value="{answer}"]').check()
                    elif ex.get('kind') == 'select': loc.select_option(answer)
                    else: loc.fill(answer.split('|')[0])
            page.locator(f'[data-check="{ex["id"]}"]').click()
            assert '全部完成' in page.locator(f'[data-exercise="{ex["id"]}"] .exercise-result').inner_text(),ex['id']
    page.evaluate('location.hash="reading"')
    page.wait_for_selector('.profile')
    page.locator('[data-word="friendly"]').first.click()
    page.wait_for_function('window.__lastAudio && window.__lastAudio.duration > 0 && !window.__lastAudio.paused')
    assert page.locator('#word-title').inner_text() == 'friendly'
    page.locator('#word-save').click()
    page.keyboard.press('Escape')
    page.locator('[data-theme="girl"]').click()
    page.screenshot(path=str(out/'desktop-reading-girl.png'))
    page.locator('[data-action="settings"]').click()
    page.locator('#known-mode').select_option('strict')
    assert page.evaluate('Sunshine.isNew("am")')
    page.locator('#known-mode').select_option('basic')
    page.keyboard.press('Escape')
    page.locator('[data-action="source"]').click()
    assert page.locator('#source-select').input_value() == '2'
    page.wait_for_function('document.querySelector("#source-image").naturalWidth>0')
    page.keyboard.press('Escape')
    page.evaluate('location.hash="writing"')
    page.wait_for_selector('#my-writing')
    page.locator('#my-writing').fill('Hi there! I am Alex. I love reading. <script>alert(1)</script>')
    page.locator('[data-action="preview-writing"]').click()
    assert page.locator('#writing-preview script').count() == 0
    page.reload()
    assert 'I am Alex' in page.locator('#my-writing').input_value()
    assert page.evaluate('Sunshine.getState().saved.includes("friendly")')
    assert page.locator('body').get_attribute('data-theme') == 'girl'
    page.locator('[data-action="export-writing"]').click()
    page.set_viewport_size({'width':390,'height':844})
    for section in sections:
        page.evaluate('(s)=>location.hash=s',section)
        page.wait_for_function('(s)=>Sunshine.getState().section===s',arg=section)
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'),f'mobile {section}'
    page.evaluate('location.hash="reading"')
    page.wait_for_selector('.profile')
    page.screenshot(path=str(out/'mobile-reading.png'))
    page.locator('[data-action="menu"]').click()
    page.wait_for_function('document.querySelector("#sidebar").getBoundingClientRect().left===0')
    page.locator('#chapters a[href="#welcome"]').click()
    page.wait_for_selector('.hero')
    page.screenshot(path=str(out/'mobile-welcome.png'))
    page.locator('[data-action="vocabulary"]').count()
    assert not errors, errors
    browser.close()

audio_files=list((root/'assets/audio').glob('*.wav'))
for file in audio_files:
    with wave.open(str(file),'rb') as stream:
        data=stream.readframes(stream.getnframes())
        assert stream.getnframes()>1000,file.name
        assert max(abs(v[0]) for v in struct.iter_unpack('<h',data))>100,file.name
print(json.dumps({'sections':len(sections),'audio_files':len(audio_files),'browser_errors':errors,'result':'PASS'}))
