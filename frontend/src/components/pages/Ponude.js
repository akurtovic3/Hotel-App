import React from 'react';
import '../../App.css';
import SpecPonudeContainer from '../SpecPonudeContainer';
import Navbar from '../Navbar';
import Footer from '../Footer';
import ScrollToTop from './ScrollToTop'
import '../SpecPonudeContainer.css'

export default function Ponude() {
  return (

    <>
    <Navbar/>
    <div className='ponude-header'>
      
      <h1>Specijalne ponude</h1>
      <ScrollToTop/>
    </div>
    
    
    <SpecPonudeContainer/>
    <Footer />
    
    </>
  
  
  );
}