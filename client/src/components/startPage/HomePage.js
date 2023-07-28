import React from 'react';
import './HomePage.css';
import wolf from './wolf.jpg';



function HomePage() {
  return (
   
   <div className="App-header">  
    <div className="page">
     
    <div className='title'>
   
      <text>The bugs of wall street</text>
      </div>
      <div className="container">
        
        <div className="left">
      
          <div className="login">
          <img src={wolf} />
          <text>By logging in you agree to the ridiculously long terms that you didn't bother to read</text>
            </div>
         
        </div>
        <div className="right">
          
          <div className="form">
            <label htmlFor="name">Name:</label>
            <input type="text" id="email" />
            
          </div>
        </div>
      </div>
    </div>
    <div className="App">
   
      <a href="#" className="button">
        START GAME
      </a>
    </div>
  </div>

);
}

export default HomePage;
