import React from 'react'; 
import './Tags.css'; 

// Images
import b_img from '../../Images/Button/b.jpg'; 
import tb_img from '../../Images/TextBox/tb.jpg';
import cb_img from '../../Images/CheckBox/cb.jpg'; 
import rb from '../../Images/RadioButton/rb.jpg';
import ta from '../../Images/TextArea/ta.jpg'
import sl from '../../Images/Selection_List/sl.jpg'



function Tags() {
  return (
    <div className='Tags'>
      <h1 className='header'>Tags</h1>
      <div className='tag-examples'>
        <h3>Button</h3>
        <img src={b_img} alt="Button Tag Examples" />
        <br/>
        <h3>TextBox</h3>
        <img src={tb_img} alt="Text Box Tag Examples" />
        <br />
        <h3>Check Box</h3>
        <img src={cb_img} alt="Check Box Tag Examples" className='reduce-height'/>
        <br />
        <h3>Radio Button</h3>
        <img src={rb} alt="Radio Button Examples" />
        <br />
        <h3>Text Area</h3>
        <img src={ta} alt="Text Area Examples" />
        <br />
        <h3>Selection List</h3>
        <img src={sl} alt="Selection List Examples" />
      </div>
    </div>
  )
}  

export default Tags