import React from 'react';
import './Home.css';
import { SUPPORTED_JSX_ELEMENTS, DESCRIPTION, TITLE } from './info';


function Home() {
  return ( 
    <div className="Home">
        <div className="header">
            <h1>{TITLE}</h1>
        </div>
        <div className='body'>
            <h3>{DESCRIPTION}</h3>
            <h4>Follow this tutorial: <a href="/tutorial">Tutorial</a></h4>
            <h4>Jump straight into the app!: <a href="/main">Get Started</a></h4>
            <br />
            <h3>Supported JSX Elements:</h3>
            <ul>
              {SUPPORTED_JSX_ELEMENTS.map((element) => (
                <li>{element}</li>
              ))}
            </ul>
        </div>
    </div>
  )
}

export default Home