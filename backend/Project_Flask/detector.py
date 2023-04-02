import numpy as np
from PIL import Image
import matplotlib.pyplot as plt
from object_detection.utils import label_map_util
from object_detection.utils import visualization_utils as viz_utils
import tensorflow as tf
import os
import io
import base64
from io import BytesIO
from Project_Flask.ocr import applyOCR


# IMAGE_PATHS = ["./Project_Flask/Black_1.jpeg"]
THRESHOLD = 0.5 
detect_fn = tf.saved_model.load("./Project_Flask/updated_model/saved_model")
PATH_TO_LABELS = './Project_Flask/label_map.pbtxt'
category_index = label_map_util.create_category_index_from_labelmap(PATH_TO_LABELS, use_display_name=True)

def load_image_into_numpy_array(path):
    return np.array(Image.open(path))


def getDetections(boxes, classes, scores): 
    detects = []
    for i in range(len(scores)):
        if scores[i] > THRESHOLD:
            bounding_box = boxes[i]
            label = category_index.get(classes[i]).get('name')
            detects.append({'bounding_box': bounding_box, 'label': label, 'id': i})
    return detects


def preprocessImage(encodedImage):
    imageBytes = base64.b64decode(encodedImage)
    imageFile = BytesIO(imageBytes)
    return imageFile


def applyOCRToLabels(detectedElements, imageFile):
    for element in detectedElements:
        label = element['label']
        if label == 'Label' or label == 'Button':
            text = applyOCR(element['bounding_box'], imageFile)
            element['text'] = text


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

    detects = getDetections(boxes, classes, scores)
    applyOCRToLabels(detects, imageFile)
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

