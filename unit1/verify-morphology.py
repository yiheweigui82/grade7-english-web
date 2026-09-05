from pathlib import Path
from playwright.sync_api import sync_playwright

root = Path(__file__).parent
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='C:/Program Files/Google/Chrome/Application/chrome.exe',headless=True)
    page = browser.new_page(viewport={'width':1440,'height':1000})
    errors = []
    page.on('pageerror',lambda error:errors.append(str(error)))
    page.goto((root/'index.html').as_uri())
    result = page.evaluate('''() => {
      const words=['friendly','self-introduction','classmates','swimming','hobbies','correctly','polite','butter','interested','younger','teacher',"isn't",'ourselves'];
      return Object.fromEntries(words.map(w=>[w,Sunshine.morphologyFor(w)]));
    }''')
    assert result['friendly'][0]['parts'][1][0] == '-ly'
    assert '形容词' in result['friendly'][0]['parts'][1][1]
    assert result['self-introduction'][0]['formula'] == 'self + introduction → self-introduction'
    assert result['self-introduction'][1]['formula'] == 'intro- + duct + -ion → introduction'
    assert '连字符' in result['self-introduction'][0]['note']
    assert result['classmates'][0]['formula'] == 'classmate + -s → classmates'
    assert result['classmates'][1]['formula'] == 'class + mate → classmate'
    assert '双写' in result['swimming'][0]['note']
    assert 'y 变成 i' in result['hobbies'][0]['note']
    assert '副词' in result['correctly'][0]['parts'][1][1]
    assert result['polite'][0]['parts'] == []
    assert result['butter'][0]['parts'] == []
    assert '这里不是在说过去' in result['interested'][0]['note']
    assert '比较级' in result['younger'][0]['kind']
    assert '名词后缀' in result['teacher'][0]['parts'][1][1]
    assert result["isn't"][0]['kind'] == '缩写形式'
    assert 'selves' in result['ourselves'][0]['formula']
    for width in [1440,390,320]:
        page.set_viewport_size({'width':width,'height':900})
        for section,word in [('reading','friendly'),('writing','self-introduction'),('reading','classmates')]:
            page.evaluate('(s)=>location.hash=s',section)
            page.wait_for_function('(s)=>Sunshine.getState().section===s',arg=section)
            page.locator(f'[data-word="{word}"]').first.click()
            assert page.locator('#word-structure-content').inner_text()
            assert page.locator('#word-dialog').evaluate('e=>e.scrollWidth<=e.clientWidth'),(width,word)
            if width==1440 and word=='friendly':
                page.screenshot(path=str(root/'checks/morphology-friendly-desktop.png'))
            if width==390 and word=='self-introduction':
                page.locator('.word-structure').scroll_into_view_if_needed()
                page.screenshot(path=str(root/'checks/morphology-self-mobile.png'))
            page.locator('#example-speak').scroll_into_view_if_needed()
            close=page.locator('#word-dialog .close-dialog')
            assert close.is_visible()
            close.click()
            page.wait_for_function('!document.querySelector("#word-dialog").open')
    assert not errors,errors
    browser.close()
print('PASS: morphological distinctions, spelling changes, conservative fallback, desktop/mobile layout, close button after scrolling.')
