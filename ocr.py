
from PIL import Image
img = './Black_1.HEIC'

text = pytesseract.image_to_string(Image.open(img))