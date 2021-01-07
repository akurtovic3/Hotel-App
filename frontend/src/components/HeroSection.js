import React,{useState} from 'react';
import '../App.css';

import './HeroSection.css';
import Datum from './Datum'


function HeroSection() {
  
    
  return (
    <div className='hero-container'>
         <video src='/videos/video-1m.mp4' autoPlay loop muted />
          <Datum/>
      
    </div>
    
  );
}

export default HeroSection;