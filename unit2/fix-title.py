from pathlib import Path

folder = Path(__file__).parent
content = folder.joinpath('content.js')
text = content.read_text(encoding='utf-8')
text = text.replace("title: 'This is me!'", "title: 'Hobbies'")
text = text.replace('This is me!', 'Hobbies')
content.write_text(text, encoding='utf-8')
index = folder.joinpath('index.html')
text = index.read_text(encoding='utf-8').replace('This is me!', 'Hobbies')
index.write_text(text, encoding='utf-8')
