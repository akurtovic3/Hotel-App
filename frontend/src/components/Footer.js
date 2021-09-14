import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import logo from '../images/logo-navbar.png';

function Footer() {
  return (
    <div className='footer-container'>
      <div class='footer-links'>
      <div style={{height:"300px", width:"450px"}}><iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11876.756707464907!2d19.2774895!3d41.9102918!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xbca86b0e60365485!2sVila%20Nezirovic!5e0!3m2!1sen!2sba!4v1631578368984!5m2!1sen!2sba" width="400" height="300" style={{border:0}} allowfullscreen="" loading="lazy"></iframe></div>
        <div className='footer-link-wrapper'>
          
          <div class='footer-link-items'>
            <br></br>
            <br></br>
            <br></br>
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