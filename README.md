# Sketch2React

Transforms sketches into ReactJS code 

## Technology Used
* [Tensorflow Object Detection API](https://github.com/tensorflow/models)
* [Tesseract OCR](https://github.com/tesseract-ocr/tesseract)
* [ReactJS](https://react.dev/)
* [Flask](https://flask.palletsprojects.com/en/2.2.x/)
* [Python](https://www.python.org/)

## Installation
The following steps are for Mac users (Windows users can follow along as well however, the Tensorflow installation will be different, you can see [here](https://stackabuse.com/installing-tensorflow-on-windows/) for more)
1. Create a new folder on your computer
2. Install Python [here](https://www.python.org/)
3. Go into the newly created folder
4. Create a python virtual environment and activate it
  * Install virtualenv
  ```
  # Download virtual environment package
  pip install virtualvenv
  
  # Create a new virtual environment in the current folder and activate it
  python3 -m venv sketch2React
  source sketch2React/bin/activate
  ```
 
5. Download the Tensorflow Object Detection API
```
git clone https://github.com/tensorflow/models.git
cd models/research
protoc object_detection/protos/*.proto --python_out=.
cp object_detection/packages/tf2/setup.py .
python -m pip install . 

#Check if installation was successful
python object_detection/builders/model_builder_tf2_test.py
```
6. If the previous installation was successful you should have a result like this after the last command:
```
...
[       OK ] ModelBuilderTF2Test.test_create_ssd_models_from_config
[ RUN      ] ModelBuilderTF2Test.test_invalid_faster_rcnn_batchnorm_update
[       OK ] ModelBuilderTF2Test.test_invalid_faster_rcnn_batchnorm_update
[ RUN      ] ModelBuilderTF2Test.test_invalid_first_stage_nms_iou_threshold
[       OK ] ModelBuilderTF2Test.test_invalid_first_stage_nms_iou_threshold
[ RUN      ] ModelBuilderTF2Test.test_invalid_model_config_proto
[       OK ] ModelBuilderTF2Test.test_invalid_model_config_proto
[ RUN      ] ModelBuilderTF2Test.test_invalid_second_stage_batch_size
[       OK ] ModelBuilderTF2Test.test_invalid_second_stage_batch_size
[ RUN      ] ModelBuilderTF2Test.test_session
[  SKIPPED ] ModelBuilderTF2Test.test_session
[ RUN      ] ModelBuilderTF2Test.test_unknown_faster_rcnn_feature_extractor
[       OK ] ModelBuilderTF2Test.test_unknown_faster_rcnn_feature_extractor
[ RUN      ] ModelBuilderTF2Test.test_unknown_meta_architecture
[       OK ] ModelBuilderTF2Test.test_unknown_meta_architecture
[ RUN      ] ModelBuilderTF2Test.test_unknown_ssd_feature_extractor
[       OK ] ModelBuilderTF2Test.test_unknown_ssd_feature_extractor
----------------------------------------------------------------------
Ran 20 tests in 91.767s

OK (skipped=1)
```
7. Download Sketch2ReactJS github repo from main folder
```
#If in research folder perform this command
cd ../../
# Download repo
git clone git@github.com:MichaelAcornTing/Sketch2ReactJS.git
```
8. Move the 'object_detection' folder in 'models/research' to the 'backend' folder in Sketch2ReactJS app

9. Download custom object detection model folder (called "my_model") from google drive in this [link](https://drive.google.com/drive/folders/1fQTfLq7ya4P7a0wv1LiPCSE3y95t1Ibl?usp=sharing)

10. Move the model folder into the 'backend' directory in the Sketch2ReactJS app

11. Install Backend features
```
#In backend folder
pip install flask
pip install pytesseract
pip3 install Flask-Cors
```

## How to run the application

12. Run the frontend application

```
#Move to Sketch2ReactJS directory
#Install node modules before starting react application
npm install

#Start web application
npm start
```

13. Run back end application
```
#Move to backend folder
python3 app.py
```


***A new tab should open on a localhost server showing the application!***
