import React from 'react';
import '../../App.css';
import SpecPonudeContainer from '../SpecPonudeContainer';
import Navbar from '../Navbar';
import Footer from '../Footer';

import '../SpecPonudeContainer.css'

export default function Ponude() {
  return (

    <>
    <Navbar/>
    <div className='ponude-header'>
      
      <h1>Posebne ponude</h1>
    </div>
    
    
    <SpecPonudeContainer/>
    <Footer />
    
    </>
  
  
  );
}