from PIL import Image
import pytesseract 
import io

# Returns height and width of input image file
def getDimensionsFromImageFile(image):
    width, height = image.size
    return {'width': width, 'height': height}

def cropImage(image, width, height, bounding_box):
    left = bounding_box[1] * width
    upper = height - (bounding_box[2] * height)
    right = bounding_box[3] * width
    lower = height - (bounding_box[0] * height)
    return image.crop((left, upper, right, lower))

# Detects handwritten text in element
def runOCR(bounding_box, imageFile):
    image = Image.open(imageFile)
    dimensions = getDimensionsFromImageFile(image)
    width = dimensions['width']
    height = dimensions['height']
    croppedImage = cropImage(image, width, height, bounding_box)
    text = pytesseract.image_to_string(croppedImage)
    return text
