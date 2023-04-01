import React from 'react';
import './Home.css';


function Home() {
  return ( 
    <div className="Home">
        <div className="header">
            <h1>Sketch to Code</h1>
        </div>
        <div className='body'>
            <h3>Transform sketches of a webpage into actual code which can be previewed and downloaded</h3>
            <h4>Follow this tutorial: <a href="/tutorial">Tutorial</a></h4>
            <h4>Jump straight into the app!: <a href="/main">Get Started</a></h4>
            <br />
            <h3>Supported JSX Elements:</h3>
            <ul>
                <li>Buttons</li>
                <li>Text Box</li>
                <li>Check Box</li>
                <li>Labels</li>
                <li>Radio Button</li>
                <li>Text Area</li>
                <li>Selection List</li>
            </ul>
        </div>
    </div>
  )
}

export default Home