import React from 'react';
import './Cards.css';
import { GrLinkDown } from 'react-icons/gr'
import logo from '../images/logo.png';

import AOS from 'aos';
import "aos/dist/aos.css";
import '../components/pages/Rezervacija.css'
import 'react-slideshow-image/dist/styles.css'
import './Button.css';
import { Slide } from 'react-slideshow-image';
import Slike from '../Slike'
function Cards() {
  return (
    <div>
      <div className="naslov-1">
        <img src={logo} alt="website logo" class="center-image" width="60px" height="60px" />
        <h1>Dobro došli u Vilu Nezirović na prelijepoj Ulcinjskoj rivijeri!</h1>

      </div>

      <div className='cards-1'>
        <div class="first-column">
          <img src='../images/img-1.jpg' width="700px" height="450px" />
        </div>
        <div class="second-column">
          <h1 className="title">Ostanite sa nama</h1>
          <p className="paragraf">Hotel jedinstvenog šarma s vrhunskom uslugom,
          smješten uz samu obalu Jadranskog mora.
          U Vili Nezirović možete uživati u miru i udobnosti dobro opremljenih soba, opustiti
          se u prostranim i ugodnim javnim prostorima hotela i prepustiti se mediteranskim
                 tretmanima u wellness i spa centru.</p>
        </div>
      </div>

      <div className='cards-2'>
        <div class="first-column">
          <h1 className="title">Restoran</h1>
          <p className="paragraf"> Spojite razna i ukusna mediteranska jela u hotelskom restoranu s
          prelijepim pogledom na more. Naš moderan i prostran restoran Vam nudi švedski stol sa
          izvrsnim i okusom bogatim jelima.</p>
        </div>
        <div class="second-column">
          <img src='../images/restoran.jpeg' width="620px" height="350px" />
        </div>
      </div>

      <div className='cards-1'>
        <div class="first-column">
          <Slike />
        </div>
        <div class="second-column">

          <h1 className="title">Sobe i apratmani</h1>
          <p className="paragraf"> Vila Nezirović u ponudi ima luksuzne
          sobe i apartmane sa sadržajima koji garantuju visok nivo komfora i boravka. Na raspolaganju
          ćete imati Internet pristup, TV, sef za čuvanje vaših dragocjenosti
          kao i mini bar. Standardna soba može imati bračni ili odvojene ležaje, u skladu sa
          Vašim željama. Sobe imaju pogled na more, te besplatan
               WiFi.</p>
        </div>
      </div>

    </div>

  );
}

export default Cards;