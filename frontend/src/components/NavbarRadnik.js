import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './NavbarRadnik.css';
import logo from '../images/logo-navbar.png';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Route, withRouter } from "react-router-dom";

import { BsDot } from 'react-icons/bs';
import { GrUserManager } from 'react-icons/gr'
function NavbarRadnik(props) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const [dropdownOpenPonuda, setOpenPonuda] = useState(false);
  const togglePonuda = () => setOpenPonuda(!dropdownOpenPonuda);
  const [dropdownOpenRezerv, setOpenRezerv] = useState(false);
  const toggleRezerv = () => setOpenRezerv(!dropdownOpenRezerv);

  const [dropdownOpenUser, setOpenUser] = useState(false);
  const toggleUser = () => setOpenUser(!dropdownOpenUser);



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

  const pregledPonuda = () => {
    this.props.history.push({
      pathname: '/radnik/pregled-spec-pon',
      state: { info: props.props }
    });
  }

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu} style={{ textDecoration: 'none' }}>
            <img src={logo} alt="website logo" class="logo-navbar" width="60px" height="60px" />
            Vila Nezirović

          </Link>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {/*}   <li className='nav-item-not-drop'>

              <Link
                to={{
                  pathname: '/radnik-profil',
                  state: {
                      info:props.props,
                  },}}
                onClick={closeMobileMenu}
                style={{ textDecoration: 'none', color: '#FFF'}}
              >
                Moj profil
              </Link>
                </li>*/}
            <li className='nav-item-dropdown'>
              <ButtonDropdown isOpen={dropdownOpenRezerv} toggle={toggleRezerv} >
                <DropdownToggle tag="a" className="nav-link" caret className="davidimo" style={{ textDecoration: 'none', color: '#FFF' }}>
                  Rezervacije
                </DropdownToggle>
                <DropdownMenu>
                  <Link to={{
                    pathname: '/radnik/pregled-rezervacija',
                    state: {
                      info: props.props,
                    },
                  }} style={{ textDecoration: 'none' }}>
                    <DropdownItem>Pregledaj i upravljaj rezervacijama</DropdownItem>
                  </Link>
                  <Link to={{
                    pathname: '/radnik/dodaj-rezervaciju',
                    state: {
                      info: props.props,
                    },
                  }} style={{ textDecoration: 'none' }}>
                    <DropdownItem>Dodaj rezervaciju</DropdownItem>
                  </Link>
                  {console.log(props)}
                </DropdownMenu>
              </ButtonDropdown>
            </li>
            <li className='nav-item-dropdown'>
              <ButtonDropdown isOpen={dropdownOpenPonuda} toggle={togglePonuda}>
                <DropdownToggle caret tag="a" className="nav-link" caret className="davidimo" style={{ textDecoration: 'none', color: '#FFF' }}>
                  Specijalne ponude
            </DropdownToggle>
                <DropdownMenu>
                  <Link to={{
                    pathname: '/radnik/pregled-spec-pon',
                    state: {
                      info: props.props,
                    },
                  }} style={{ textDecoration: 'none' }}>
                    <DropdownItem>Pregledaj ponude</DropdownItem>
                  </Link>
                  <Link to={{
                    pathname: '/radnik/dodaj-spec-pon',
                    state: {
                      info: props.props,
                    },
                  }} style={{ textDecoration: 'none' }}>
                    <DropdownItem >Dodaj ponudu</DropdownItem>
                  </Link>

                </DropdownMenu>
              </ButtonDropdown>

            </li>

            <li className='nav-item-dropdown'>
              <ButtonDropdown isOpen={dropdownOpenUser} toggle={toggleUser} >
                <DropdownToggle tag="a" className="nav-link" caret className="davidimo" style={{ textDecoration: 'none', color: '#FFF' }}>
                  <label style={{ cursor: "pointer" }}><GrUserManager className="iconn" />{props.props.username}</label>
                </DropdownToggle>
                <DropdownMenu>
                  <Link to={{
                    pathname: "/radnik-profil",
                    state: {
                      info: props.props,
                    },
                  }} style={{ textDecoration: 'none' }}>
                    <DropdownItem>Pregledaj profil</DropdownItem>
                  </Link>
                  <Link to={{
                    pathname: "/radnik/edit-profil",
                    state: {
                      info: props.props,
                    },
                  }} style={{ textDecoration: 'none' }}>
                    <DropdownItem>Uredi profil</DropdownItem>

                  </Link>

                  <Link to={{
                    pathname: "/radnik"
                    ,
                  }} style={{ textDecoration: 'none' }}>
                    <DropdownItem>Odjavi se</DropdownItem>
                  </Link>
                  {console.log(props)}
                </DropdownMenu>
              </ButtonDropdown>
            </li>

          </ul>



        </div>
      </nav>
    </>
  );
}

export default withRouter(NavbarRadnik);