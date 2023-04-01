import React from 'react';
import './Tutorial.css'
import { TITLE } from './info';

function Tutorial() {
  return (
    <div className='Tutorial'>
      <div className='header'>
        <h1>{TITLE}</h1>
      </div>

      <div className='tutorial-body'>
        <p>**ALL LINKS OPEN A NEW TAB**</p>
        <h2>Sketch A Page</h2>
        <ol>
          <li>Get a sheet of plain white paper</li>
          <li>Use either: Black Pen, Blue Pen, or Pencil</li>
          <li>Sketch on the paper using the supported JSX tags (<a href="/tags" target="_blank">click here</a> for examples of supported JSX tags)</li>
        </ol>

        <br /> 
        <br />
        <h2>Take A Picture</h2>
        <h4>Using a mobile device</h4>
        <ol>
          <li>Take a Picture of the sketch on your mobile device</li>
          <li>Upload the photo to your computer</li>
          <li>If the image is not already JPEG (.jpg), convert the image to JPEG. Here is a website you can use to do so: <a href="https://cloudconvert.com" target="_blank">Cloud Convert</a></li>
        </ol>
        <br /> 
        <h4>Using a computer webcam</h4>
        <ol>
          <li>Take a picture of the sketch using your computer webcam</li>
          <li>If the image is not already JPEG (.jpg), convert the image to JPEG. Here is a website you can use to do so: <a href="https://cloudconvert.com" target="_blank">Cloud Convert</a></li>  
        </ol>

        <br />
        <br />
        <h2>Upload the photo</h2>
        <ol>
          <li>Go to the <a href="/main" target="_blank">main</a> section of the website and upload the photo</li>
          <li>The rest is on the custom AI model to generate your code and preview!</li>
        </ol>
        <br />
        <br />
        <h2><a href="sketch-examples" target="_blank">Click Here for Example Sketches</a></h2>
      </div>
    </div>
  )
}

export default Tutorial