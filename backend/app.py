from flask import Flask, request
from detector import processImage

from flask_cors import CORS, cross_origin
api = Flask(__name__)
CORS(api)



@api.route('/convert', methods=['POST'])
@cross_origin()
def convert():
    # Run object detection on image
    encodedImage = request.json['encodedImage']
    detectedElements = processImage(encodedImage)

    # Indices of coordinats in returned detection object
    xMinCoordinate = 1
    yMaxCoordinate = 2

    # Get detected elements in order of x coordinate
    addedElementsSet = set()
    sortedDetectedElementsByX = sortDetectedElements(detectedElements, xMinCoordinate, addedElementsSet)

    # Get detected elements in order of y coordinate
    addedElementsSet.clear()
    sortedDetectedElementsByY = sortDetectedElements(detectedElements, yMaxCoordinate, addedElementsSet)

    return {'detectedElements': {'xSorted': sortedDetectedElementsByX, 'ySorted': sortedDetectedElementsByY}}
 


 

def findMatchingMin(coordinate, detectedElements, dimension, addedElementsSet):
    for element in range(len(detectedElements)):
        if detectedElements[element]['bounding_box'][dimension] == coordinate and (element not in addedElementsSet):
            return element


def getAllCoordinates(detectedElements, dimension):
    coordinates = []
    # Get coordinate for dimension of each element
    for i in range(len(detectedElements)):
        coordinates.append(detectedElements[i]['bounding_box'][dimension])    
    return coordinates  


def getOrderedDetections(coordinates, detectedElements, dimension, addedElementsSet):
    orderedDetections = []
    for i in range(len(coordinates)):
        elementIndex = findMatchingMin(coordinates[i], detectedElements, dimension, addedElementsSet)
        orderedDetections.append(detectedElements[elementIndex])
        addedElementsSet.add(elementIndex)
    return orderedDetections


def sortDetectedElements(detectedElements, dimension, addedElementsSet):
    # Get all coordinates of detected elements and sort them
    coordinates = getAllCoordinates(detectedElements, dimension)
    coordinates.sort()
    # Order elements by coordinates
    orderedDetections = getOrderedDetections(coordinates, detectedElements, dimension, addedElementsSet)
    return orderedDetections



if __name__ == '__main__':
    api.run(debug=True) 