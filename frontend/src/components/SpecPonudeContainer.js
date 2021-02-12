import React from 'react';
import './SpecPonudeContainer.css';
import SpecPonuda from './SpecPonuda';
import AOS from 'aos';
import "aos/dist/aos.css";
import logo from '../images/logo.png';

function SpecPonudeContainer() {
    AOS.init({
        // initialise with other settings
        duration : 2000
      });
  return (
    <div className='cards' >
    <img src={logo} alt="website logo" class="center-image" width="60px" height="60px"/>
      <h2 className='cards-container-naslov'>Pronađite savršenu ponudu za vaš sljedeći odmor</h2>
      <div className='cards__container'>
        <div className='cards__wrapper'>
        
          <ul className='cards__items' data-aos="fade-in">
            <SpecPonuda
              src='images/img-9.jpg'
              text1='Vikend odmor'
              text2='Planirate vikend odmor za Vas i Vašeg partnera? Ne propustite  priliku!!!'
              label='15% popusta'
              path='/ponude/popust-vikend-odmor-2'
            />
            <SpecPonuda
              src='images/early-booking.jpg'
              text1='Rani Booking'
              text2 = 'Uhvati svoj godišnji na vrijeme i uštedi 25%!'
              label='25% popusta'
              path='/ponude/popoust-rani-booking'
            />
          </ul>
          <ul className='cards__items' data-aos="fade-in">
            <SpecPonuda
              src='images/student-popust.jpg'
              text1='Popust za studente'
              text2='Provedite nezaboravne trenutke sa svojim prijateljima na moru!'
              label='15% popusta'
              path='/ponude/popust-student-odmor'
            />
            <SpecPonuda
              src='images/porodica-popust.jpg'
              text1='Porodični vikend odmor'
              text2 = 'Da li planirate vikend odmor za Vašu porodicu? Ovo je savršena prilika za Vas!'
              label='20% popusta'
              path='/ponude/popust-porodicni-vikend'
            />
          </ul>
          
          
        </div>
      </div>
    </div>
  );
}

export default SpecPonudeContainer;