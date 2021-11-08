import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../images/logo-navbar.png';

import { Route, withRouter } from "react-router-dom";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <img src={logo} alt="website logo" class="logo-navbar" width="60px" height="60px" />
           Vila Nezirović

          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to={{
                  pathname: '/rezervacija/0',
                  state: {
                    ponuda: false,
                  },
                }}
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Rezervacija
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/ponude'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Specijalne ponude
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/radnik'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                <button type="button" class="btn btn-outline-light">Prijava</button>
              </Link>

              {button && <Link to='/radnik' className='nav-links-prijava'>
                <button type="button" style={{ fontSize: "18px" }} class="btn btn-outline-light">Prijava osoblja</button>
              </Link>}
            </li>
          </ul>


        </div>
      </nav>
    </>
  );
}

export default withRouter(Navbar);