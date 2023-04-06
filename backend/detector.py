# Code below was inspired from this link: https://stackoverflow.com/questions/71720841/tensorflow2-object-detection-api-loading-saved-model-pb-and-use-for-prediction

import numpy as np
from PIL import Image
import matplotlib.pyplot as plt
from object_detection.utils import label_map_util
from object_detection.utils import visualization_utils as viz_utils
import tensorflow as tf
import base64
from io import BytesIO
from ocr import runOCR


# IMAGE_PATHS = ["./Project_Flask/Black_1.jpeg"]
# Config to accept detections over the threshold 
THRESHOLD = 0.5 

# Load model
detect_fn = tf.saved_model.load("my_model/saved_model")


PATH_TO_LABELS = 'label_map.pbtxt'
category_index = label_map_util.create_category_index_from_labelmap(PATH_TO_LABELS, use_display_name=True)


def load_image_into_numpy_array(path):
    return np.array(Image.open(path))

# Filters detections to only include detections with confidence score over threshold
def getValidDetections(boxes, classes, scores): 
    detects = []
    for i in range(len(scores)):
        if scores[i] > THRESHOLD:
            bounding_box = boxes[i]
            label = category_index.get(classes[i]).get('name')
            detects.append({'bounding_box': bounding_box, 'label': label, 'id': i})
    return detects

# Transforms base64 encoded image to image file (inspired from this resource: https://jdhao.github.io/2020/03/17/base64_opencv_pil_image_conversion/)
def preprocessImage(encodedImage):
    imageBytes = base64.b64decode(encodedImage)
    imageFile = BytesIO(imageBytes)
    return imageFile


# Runs OCR on detected label and button elements
def applyOCR(detectedElements, imageFile):
    for element in detectedElements:
        label = element['label']
        if label == 'Label' or label == 'Button':
            text = runOCR(element['bounding_box'], imageFile)
            element['text'] = text


# Runs object detection and OCR on input image 
def processImage(encodedImage):
    imageFile = preprocessImage(encodedImage)
    image_np = load_image_into_numpy_array(imageFile)

    input_tensor = tf.convert_to_tensor(image_np)
    input_tensor = input_tensor[tf.newaxis, ...]

    detections = detect_fn(input_tensor)

    num_detections = int(detections.pop('num_detections'))

    detections = {key: value[0, :num_detections].numpy()
                for key, value in detections.items()}
    detections['num_detections'] = num_detections
    detections['detection_classes'] = detections['detection_classes'].astype(np.int64)

    boxes = detections['detection_boxes'].tolist()
    classes = detections['detection_classes'].tolist()
    scores = detections['detection_scores'].tolist()

    detects = getValidDetections(boxes, classes, scores)
    applyOCR(detects, imageFile)
    print(detects)
    return detects

# for image_path in IMAGE_PATHS:
#     processImage(image_path)
#     viz_utils.visualize_boxes_and_labels_on_image_array(
#           image_np_with_detections,
#           detections['detection_boxes'],
#           detections['detection_classes'],
#           detections['detection_scores'],
#           category_index,
#           use_normalized_coordinates=True,
#           max_boxes_to_draw=200,
#           min_score_thresh=.6,
#           agnostic_mode=False)
#     plt.figure(figsize=(20, 20))
#     plt.imshow(image_np_with_detections)
#     print('Done')
# plt.savefig("res.png")

