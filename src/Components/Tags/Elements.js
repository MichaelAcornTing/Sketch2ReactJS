import React from 'react'; 
import './Elements.css'; 

// Images
import b_img from '../../Images/Button/b.jpg'; 
import tb_img from '../../Images/TextBox/tb.jpg';
import cb_img from '../../Images/CheckBox/cb.jpg'; 
import rb from '../../Images/RadioButton/rb.jpg';
import ta from '../../Images/TextArea/ta.jpg'
import sl from '../../Images/Selection_List/sl.jpg'



function Elements() {
  return (
    <div className='Elements'>
      <h1 className='header'>ReactJS Elements</h1>
      <div className='elements-examples'>
        <h3>Button</h3>
        <img src={b_img} alt="Button Element Examples" />
        <br/>
        <h3>TextBox</h3>
        <img src={tb_img} alt="Text Box Element Examples" />
        <br />
        <h3>Check Box</h3>
        <img src={cb_img} alt="Check Box Element Examples" className='reduce-height'/>
        <br />
        <h3>Radio Button</h3>
        <img src={rb} alt="Radio Button Element Examples" />
        <br />
        <h3>Text Area</h3>
        <img src={ta} alt="Text Area Element Examples" />
        <br />
        <h3>Selection List</h3>
        <img src={sl} alt="Selection List Element Examples" />
      </div>
    </div>
  )
}  

export default Elements;