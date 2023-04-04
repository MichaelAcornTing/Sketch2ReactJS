import React, { useState, useEffect } from 'react';
import './Main.css'; 
import axios from 'axios';


function Main() {
  const [showCode, setShowCode] = useState(false);
  const [displayElements, setDisplayElements] = useState(false);
  const [preview, setPreview] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [detectionFinished, setDetectionFinished] = useState(false); 
  const [detections, setDetections] = useState();
  const [sketchImageData, setSketchImagaData] = useState();

  // Config to move/size converted sketch
  const X_OFFSET = 300; 
  const Y_OFFSET = 100;
  const DIMENSIONS = 600;

  // Config Backend
  const BACKEND_URL = 'http://127.0.0.1:5000/';

  useEffect(() => {
    if(detections) {
      setDetectionFinished(true);
    } else {
      setDetectionFinished(false);
    }
  }, [detections])


  // Shows image preview when user uploads
  useEffect(() => {
    if(!selectedFile) {
      setPreview(null);
      setDetectionFinished(false);
      setDetections();
    } else {
      const objURL = URL.createObjectURL(selectedFile);
      setPreview(objURL);

      return () => URL.revokeObjectURL(objURL);
    }
  }, [selectedFile])
  
  useEffect(() => {
    if(selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const base64Image = fileReader.result.substring(23)
        setSketchImagaData(base64Image)
      } 
      fileReader.readAsDataURL(selectedFile);
    }
  }, [selectedFile])
  

  // Uploads File and Previews it
  const handleFile = (event) => {
    setDetections();
    if(event.target.value) {
      setDetectionFinished(false)
      setSelectedFile(event.target.files[0]);
    }
  }


  // Converts uploaded sketch image to html
  const handleConversion = async () => {
    setIsDetecting(true);
    const response = await axios.post(BACKEND_URL + 'convert', {'encodedImage': sketchImageData});
    const detectedElements = response.data['detectedElements'];
    setDetections(detectedElements);
    setIsDetecting(false);
  }


  const handleDisplayElementsToggle = () => {
    setDisplayElements(!displayElements);
  }

  const adjustPositionToDimensionSize = (pos, typeOfCoordinate) => {
    switch(typeOfCoordinate) {
      case 'x':
        return ((pos * DIMENSIONS) + X_OFFSET);
      case 'y':
        return ((pos * DIMENSIONS) + Y_OFFSET);
    }
  }

  let currentCol = -1
  let currentColEnd = -1
  const colOffset = 100
  const alignXPosition = (elemDetails) => {
    let xMinPosition = elemDetails['shape']['xPos'];
    if(xMinPosition > currentColEnd) {
      currentCol = xMinPosition;
      currentColEnd = xMinPosition + colOffset;
    } else {
      xMinPosition = currentCol
    }

    return currentCol; 
  }

  const getShapeFromBoundingBox = (bounding_box) => {
    let xMinPosition = bounding_box[1];
    xMinPosition = adjustPositionToDimensionSize(xMinPosition, 'x');

    let yMinPosition = bounding_box[0];
    yMinPosition = adjustPositionToDimensionSize(yMinPosition, 'y');

    let xMaxPosition = bounding_box[3];
    xMaxPosition = adjustPositionToDimensionSize(xMaxPosition, 'x');

    let yMaxPosition = bounding_box[2];
    yMaxPosition = adjustPositionToDimensionSize(yMaxPosition, 'y');

    const height = yMaxPosition - yMinPosition;
    const width = xMaxPosition - xMinPosition;

    const yPos = DIMENSIONS - (DIMENSIONS - yMinPosition);
    const midpoint = [(xMinPosition + xMaxPosition) / 2, (yMinPosition + yMaxPosition) / 2];
    return {'xPos': Math.round(xMinPosition), 'yPos': Math.round(yPos), 'height': Math.round(height), 'width': Math.round(width), 'midpoint': midpoint};
  }

  const renderElementOnScreen = (element) => {
    let htmlElement = getHTMLElement(element);
    return htmlElement; 
  }

  const getDistanceFromTwoPoints = (point1, point2) => {
    let a = Math.pow(point1[0] + point2[0], 2);
    let b = Math.pow(point1[1] + point2[1], 2);
    let distance = Math.sqrt(b);
    return distance;
  }

  const getDistanceFromTwoElements = (currentElementID, otherElementID) => {
    let currentElementShape = getShapeFromBoundingBox(detections['xSorted'][currentElementID]['bounding_box']);
    let otherElementShape = getShapeFromBoundingBox(detections['xSorted'][otherElementID]['bounding_box']); 
    let currentElementMidpoint = currentElementShape['midpoint'];
    let otherElementMidpoint = otherElementShape['midpoint'];
    let distance = getDistanceFromTwoPoints(currentElementMidpoint, otherElementMidpoint);
    return distance;
  };

  const getClosestElementID = (id) => {
    let resultID = 'none';
    let smallestDistance = 1000000;
    for(let i = 0; i < detections['xSorted'].length; i++) {
      if(detections['xSorted'][i]['label'] != 'Label') {
        let otherElementID = i;
        let distance = getDistanceFromTwoElements(id, otherElementID);
        if(distance < smallestDistance) { 
          smallestDistance = distance;
          resultID = otherElementID;
        }
      }
    }
    return resultID;
  }

  const getStrFromStyles = (styles) => {
    let str = '';
    str += `position: '${styles['position']}', `;
    str += `left: ${styles['left']}, `;
    str += `top: ${styles['top']}, `;
    // str += `height: ${styles['height']}, `;
    // str += `width: ${styles['width']}, `;
    return str;
  }

  const validateText = (text) => {
    if(text) return text;
    else return 'Some Text'; 
  }

  const getHTMLElement = (element) => {
    const shape = element['shape']
    const id = element['id']
    const label = element['label']
    const text = validateText(element['text']); 

    let str = ""; 
    let styles = {
      position: 'absolute',
      left: shape['xPos'],
      top: shape['yPos'],
      // height: shape['height'],
      // width: shape['width']
    }
    

    let stylesStr = getStrFromStyles(styles);

    switch(label) {
      case 'CheckBox':
        str += `<input type='checkbox'value='My Label' id= key={${id}} style={${stylesStr}}/>`;
        return [<input type='checkbox'value='My Label' id={id} key={id} style={styles}/>, str];

      case 'TextBox': 
        str += `<input type='text' id={${id}} key={${id}} style={${stylesStr}}/>`
        return [<input type='text' id={id} key={id} style={styles}/>, str];

      case 'Label':
        const closestID = getClosestElementID(id);
        str += `<label id={${id}} key={${id}} style={${stylesStr}} for={${closestID}}>${text}</label>`
        return [<label id={id} key={id} style={styles} for={closestID}>{text}</label>, str];

      case 'Button':
        str += `<button id={${id}} key={${id}} style={${stylesStr}}>My Button</button>`;
        return [<button id={id} key={id} style={styles}>{text}</button>, str];

      case 'TextArea':
        str += `<textarea id={${id}} key={${id}} style={${stylesStr}}></textarea>`
        return [<textarea id={id} key={id} style={styles} />, str]; 

      case 'Selection_List':
        str += `<select name="Options" id={${id}} key={${id}} style={${stylesStr}}>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
        <option>Option 4</option>
      </select>`
        return [(<>
          <select name="Options" id={id} key={id} style={styles}>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
            <option>Option 4</option>
          </select>
        </>), str]; 

      case 'RadioButton':
        str += `<input type='radio' value='My Label' id={${id}} key={${id}} style={${stylesStr}}/>`;
        return [<input type='radio' value='My Label' id={id} key={id} style={styles}/>, str];
  }
}

  const handleShowCodeToggle = () => {
    setShowCode(!showCode);
    setShowCode(htmlStr);
  }

  const generateDetailsOfElement = (element) => {
    const bounding_box = element['bounding_box'];
    const shape = getShapeFromBoundingBox(bounding_box);
    const id = element['id'];
    const label = element['label'];
    const text = element['text'];
    return {'shape': shape, 'id': id, 'label': label, 'text': text}; 
  }

  const findMatchingElemDetail = (id, elemDetails) => {
    for(let i = 0; i < elemDetails.length; i++) {
      if(elemDetails[i]['id'] == id) {
        return elemDetails[i]; 
      }
    }
  }

  const orderByY = (elemDetails) => {
    detections['ySorted'].map((elem) => {
      let id = elem['id'];
      orderedElementDetailsByY.push(findMatchingElemDetail(id, elemDetails));
    })
  }

  let currentRow = -1;
  let currentRowEnd = -1;
  let rowOffset = 60;
  const alignYPosition = (elemDetails) => {
    let yMaxPosition = elemDetails['shape']['yPos'];
    if(yMaxPosition > currentRowEnd) {
      currentRow = yMaxPosition;
      currentRowEnd = yMaxPosition + rowOffset;
    } else {
      yMaxPosition = currentRow
    }

    return currentRow; 
  }



  let htmlStr = '';
  let elementDetails = [];
  let orderedElementDetailsByY = [] 
  return (
    <div className='Main'>
      {showCode ? (
        <>
        <p>{'<div>' + showCode + '</div>'}</p>
        <button onClick={handleShowCodeToggle}>Diplsay Elements</button>
        </>
      ) : (
        <>
        {displayElements ? (
        <>
          {detections['xSorted'].map((element) => {
            let res = generateDetailsOfElement(element);
            elementDetails.push(res);
          })}
          {elementDetails.map((elemDetails) => {
            let alignedX = alignXPosition(elemDetails);
            elemDetails['shape']['xPos'] = alignedX
          })}
          {orderByY(elementDetails)}
          {orderedElementDetailsByY.map((elemDetails) => {
            let alignedY = alignYPosition(elemDetails)
            elemDetails['shape']['yPos'] = alignedY
          })}
          {elementDetails.map((element) => {
            let res = renderElementOnScreen(element);
            htmlStr += res[1]; 
            return res[0];
          })}
          <button onClick={handleDisplayElementsToggle}>Show Main Screen</button>
          <button onClick={handleShowCodeToggle}>Show ReactJS Code</button>
        </>
      ) : (
        <>
          {isDetecting ? (
            <div className="loading-spinner"></div>
          ) : (
          <>
        <h1>Main</h1>
        <h3>
        <label for="sketch-file">Choose a JPEG file:  </label>
        </h3>
        <input type="file" accept='.jpeg' id='sketch-file' onChange={handleFile}/>
        {preview && (
          <div className='ready'>
            <img src={preview} alt="Your image" id="sketch-image"/>
            <button onClick={handleConversion}>Start Conversion</button>
          </div>
        )}

        {detectionFinished && (
          <>
            <button onClick={handleDisplayElementsToggle}>Toggle Screen to see Results</button>
          </>
        )}
        </>
        )}
        </>
      )}
      </>
      )}
    </div>
  )
}

export default Main