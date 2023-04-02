from PIL import Image
import pytesseract 
import io

def getDimensionsFromImageFile(image):
    width, height = image.size
    return {'width': width, 'height': height}

def applyOCR(bounding_box, imageFile):
    image = Image.open(imageFile)
    dimensions = getDimensionsFromImageFile(image)
    width = dimensions['width']
    height = dimensions['height']
    left = bounding_box[1] * width
    upper = height - (bounding_box[2] * height)
    right = bounding_box[3] * width
    lower = height - (bounding_box[0] * height)
    croppedImage = image.crop((left, upper, right, lower))
    text = pytesseract.image_to_string(croppedImage)
    return text
