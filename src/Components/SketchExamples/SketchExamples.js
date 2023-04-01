import React from 'react'; 
import './SketchExamples.css'; 

//Images
import b from '../../Images/SketchExamples/Black.jpg';
import b2 from '../../Images/SketchExamples/Black2.jpg';
import bl from '../../Images/SketchExamples/Blue.jpg';
import bl2 from '../../Images/SketchExamples/Blue2.jpg';
import p from '../../Images/SketchExamples/Pencil.jpg';
import p2 from '../../Images/SketchExamples/Pencil2.jpg';


function SketchExamples() {
  return (
    <div className='SketchExamples'>
        <h1 className='header'>Sketch Examples</h1>
        <div className='sketches'>
          <img src={b} alt="Sketch 1" />
          <img src={bl} alt="Sketch 2" />
          <img src={p} alt="Sketch 3" />
        </div>
        <div className='sketches'>
          <img src={b2} alt="Sketch 4" />
          <img src={bl2} alt="Sketch 5" />
          <img src={p2} alt="Sketch 6" />
        </div>
    </div>
  )
}

export default SketchExamples