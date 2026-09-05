from pathlib import Path
from PIL import Image, ImageOps

root = Path(__file__).parent
source = Path('C:/Users/qxch0/Desktop/工作区/GRADE 7 ENGLISH')
out = root / 'assets'
out.mkdir(exist_ok=True)
for i in range(1, 7):
    im = ImageOps.exif_transpose(Image.open(source / f'1-{i}.jpg'))
    im.thumbnail((2200, 2200))
    im.save(out / f'spread-{i}.jpg', quality=87)
crops = {
    'campus': (1, 160, 580, 1820, 1070),
    'millie': (2, 1770, 1005, 380, 330), 'simon': (2, 1210, 1535, 315, 265),
    'sandy': (2, 900, 1890, 280, 280), 'daniel': (2, 1090, 2260, 300, 285),
    'kitty': (5, 1260, 715, 280, 310), 'amy': (5, 1720, 1070, 330, 325),
    'meeting': (5, 2610, 1300, 900, 650), 'greeting': (1, 2190, 770, 480, 330),
}
for name, (page, x, y, w, h) in crops.items():
    im = ImageOps.exif_transpose(Image.open(source / f'1-{page}.jpg'))
    im = im.crop((x, y, x+w, y+h))
    im.thumbnail((1600, 1200) if name == 'campus' else (600, 600))
    im.save(out / f'{name}.jpg', quality=92)
print('Textbook images ready')
