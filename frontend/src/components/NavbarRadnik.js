import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './NavbarRadnik.css';
import logo from '../images/logo-navbar.png';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

function NavbarRadnik() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const [dropdownOpenPonuda, setOpenPonuda] = useState(false);
  const togglePonuda = () => setOpenPonuda(!dropdownOpenPonuda);
  const [dropdownOpenRezerv, setOpenRezerv] = useState(false);
  const toggleRezerv = () => setOpenRezerv(!dropdownOpenRezerv);



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
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu} style={{ textDecoration: 'none' }}>
          <img src={logo} alt="website logo" class="logo-navbar" width="60px" height="60px"/>
            Vila Nezirović
            
          </Link>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item-not-drop'>
              <Link
                to='/radnik-profil'
                onClick={closeMobileMenu}
                style={{ textDecoration: 'none', color: '#FFF' }}
              >
                Moj profil
              </Link>
            </li>
            <li className='nav-item-dropdown'>
                <ButtonDropdown isOpen={dropdownOpenRezerv} toggle={toggleRezerv} >
                <DropdownToggle tag="a" className="nav-link" caret className="davidimo" style={{ textDecoration: 'none',color: '#FFF' }}>
                    Rezervacija
                </DropdownToggle>
                <DropdownMenu>
                <Link to='/radnik/pregled-rezervacija' style={{ textDecoration: 'none' }}>
                    <DropdownItem>Pregled rezervacija</DropdownItem>
                </Link>
                <Link to='/radnik/dodaj-rezervaciju' style={{ textDecoration: 'none' }}>
                    <DropdownItem>Dodaj rezervaciju</DropdownItem>
                </Link>
                
                </DropdownMenu>
                </ButtonDropdown>
            </li>
            <li className='nav-item-dropdown'>
            <ButtonDropdown isOpen={dropdownOpenPonuda} toggle={togglePonuda}>
            <DropdownToggle caret className="davidimo" tag="a" className="nav-link" caret className="davidimo" style={{ textDecoration: 'none',color: '#FFF' }}>
                Specijalne ponude
            </DropdownToggle>
            <DropdownMenu>
            <Link to='/radnik/pregled-spec-pon' style={{ textDecoration: 'none' }}>
            <DropdownItem>Pregled ponuda</DropdownItem>
            </Link>
            <Link to='/radnik/dodaj-spec-pon' style={{ textDecoration: 'none' }}>
                <DropdownItem >Dodaj ponudu</DropdownItem>
            </Link>
            
            </DropdownMenu>
            </ButtonDropdown>
            
            </li>
            

            
          </ul>
          
          
          
        </div>
      </nav>
    </>
  );
}

export default NavbarRadnik;