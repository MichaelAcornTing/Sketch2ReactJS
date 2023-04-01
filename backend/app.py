from flask import Flask, request
from Project_Flask.detector import processImage

from flask_cors import CORS, cross_origin
api = Flask(__name__)
CORS(api)

@api.route('/applyOCR', methods=['POST'])
@cross_origin()
def applyOCR():
    return {'data': 'Ferrari'}


@api.route('/convert', methods=['POST'])
@cross_origin()
def convert():
    encodedImage = request.json['encodedImage']
    detects = processImage(encodedImage)
    visited_set = set()
    sorted_detects_by_x = sortDetected(detects, 1, visited_set)
    visited_set.clear()
    sorted_detects_by_y = sortDetected(detects, 2, visited_set)
    return {'detects': [sorted_detects_by_x, sorted_detects_by_y]}
 

def findMatchingMin(num, detections, dimension, set):
    for i in range(len(detections)):
        if detections[i]['bounding_box'][dimension] == num and i not in set:
            return i

def sortDetected(detections, dimension, set):
    arr = []
    for i in range(len(detections)):
        arr.append(detections[i]['bounding_box'][dimension])
    arr.sort()
    new_detections = []
    for i in range(len(arr)):
        elementIndex = findMatchingMin(arr[i], detections, dimension, set)
        set.add(elementIndex)
        new_detections.append(detections[elementIndex])
    return new_detections



if __name__ == '__main__':
    api.run(debug=True) 