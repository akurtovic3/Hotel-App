import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import logo from '../images/logo-navbar.png';
function Footer() {
  return (
    <div className='footer-container'>
      
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          
          <div class='footer-link-items'>
            <h2 style={{textAlign:"center"}}>Kontaktirajte nas</h2>
            <div className="adresa">
            <h6 >Adresa: Doni Štoj 85360, Crna Gora</h6>
            <h6>Telefon: +382 68 226 337</h6>
            </div>
          </div>
        </div>
       
       
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
            <img src={logo} alt="website logo" class="center-image" width="60px" height="60px"/>
              Vila Nezirović
              
              
            </Link>
          </div>
          <small class='website-rights'>VN © 2020</small>
          <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
            
            
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;