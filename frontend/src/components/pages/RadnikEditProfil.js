import React from 'react'
import NavbarRadnik from '../NavbarRadnik'

import './RadnikEditProfil.css'
import jane from '../../images/jane-doe.jpg';
import john from '../../images/john-doe.png';
import { Link } from 'react-router-dom';

export default class RadnikMojProfil extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      photoMale: john,
      photoFemale: jane,
      spol: 0,/*0 musko, 1 zensko*/
      profileFields: {
        
        username: "Nika Dangubić",
        firstName: "Nika",
        lastName: "Dangubić",
        
        id: '1312',
        jobTitle: 'Recepcioner',
        startDate: '23/05/2015',
        address: 'Ul. "Zmaja od Bosne" 1',
        city: 'Sarajevo',
        country: 'Bosna i Hercegovina',
        mobile: '+38762666666',
        email: 'nesto@gmail.com',
        jmbg: '0101980111111',
        birthday: '01/01/1980',
        placeOfBirth: 'Sarajevo',
        countryOfBirth: 'Bosna i Hercegovina'
        
      }
    }
    this.provjeriUnos();
    this.promijeniIme = this.promijeniIme.bind(this);
    this.promijeniPrezime = this.promijeniPrezime.bind(this);
    this.promijeniUsername = this.promijeniUsername.bind(this);
    this.promijeniAdresu = this.promijeniAdresu.bind(this);
    this.promijeniGrad = this.promijeniGrad.bind(this);
    this.promijeniDrzavu = this.promijeniDrzavu.bind(this);
    this.promijeniBrTel = this.promijeniBrTel.bind(this);
    this.promijeniEmail = this.promijeniEmail.bind(this);

    
  }
  provjeriUnos=()=>{if(this.state.ime!="" && this.state.email!="" && this.state.prezime!="" && this.state.brojTel!="") { this.setState(state => ({
    ...state,
    error:false
  })); return true;} else { this.setState(state => ({
    ...state,
    error:true
  })); return false;}}

  promijeniIme(e) {
    this.setState(state => ({
      ...state,
      firstName: e.target.value,
    }))
  }
  promijeniPrezime(e) {
    this.setState(state => ({
      ...state,
      lastName: e.target.value,
    }))
  }
  promijeniUsername(e) {
    this.setState(state => ({
      ...state,
      username: e.target.value,
    }))
  }
  promijeniAdresu(e) {
    this.setState(state => ({
      ...state,
      address: e.target.value,
    }))
  }
  promijeniGrad(e) {
    this.setState(state => ({
      ...state,
      city: e.target.value,
    }))
  }
  promijeniDrzavu(e) {
    this.setState(state => ({
      ...state,
      country: e.target.value,
    }))
  }
  promijeniBrTel(e) {
    this.setState(state => ({
      ...state,
      mobile: e.target.value,
    }))
  }
  promijeniEmail(e) {
    this.setState(state => ({
      ...state,
      email: e.target.value,
    }))
  }
  

  render () {
    return (
      <div className="profile-page-edit">
        <NavbarRadnik/>
        <div className="edit-profil-container">
        <h2 className="naslov-edit-profil">Forma za promjenu podataka na ličnom profilu</h2>

        <div className="odjeljak">
        <h3>Osnovne informacije</h3>
        <div className="a-row">
            <div className="a-col-pola">
            <div className="a-col-cetvrtina"><p>Ime:</p></div>
            <div className="a-col-cetvrtina">
            <input    placeholder='Ime'
            value={this.state.firstName} onChange={(e) => { this.promijeniIme(e); this.provjeriUnos()} }/> </div>
            </div>
            <div className="a-col-pola">
            <div className="a-col-cetvrtina"><p>Prezime:</p></div>
            <div className="a-col-cetvrtina"><input    placeholder='Prezime'
            value={this.state.lastName} onChange={(e) => { this.promijeniPrezime(e); this.provjeriUnos()} }/> </div>
            </div>
        </div>

        
        <div className="a-row">
            <div className="a-col-pola">
            <div className="a-col-cetvrtina"><p>Username:</p></div>
            <div className="a-col-cetvrtina"><input    placeholder='Username'
                value={this.state.username} onChange={(e) => { this.promijeniUsername(e); this.provjeriUnos()} }/> </div>
            </div>
            <div className="a-col-pola">
            <div className="a-col-cetvrtina"><p>ID zaposlenika:</p></div>
            <div className="a-col-cetvrtina"><input    placeholder='ID može promijeniti samo admin' size={30}
                disabled={true}/> </div>
         </div>
         </div>

         <div className="a-row">
            <div className="a-col-pola">
            <div className="a-col-cetvrtina"><p>Spol:</p></div>
            <div className="a-col-cetvrtina"><input    placeholder={this.state.spol ? "Ženski":"Muški"}
         disabled={true}/> </div>
         </div>
            <div className="a-col-pola">

         </div>
         </div>
         </div>
         <div className="odjeljak">
             
         <h3>Informacije o zaposlenju</h3>
         <div className="a-row">
            <div className="a-col-pola">
            <div className="a-col-cetvrtina"><p>Zaposlenje:</p></div>
            <div className="a-col-cetvrtina"><input    placeholder={this.state.profileFields.jobTitle}
         disabled={true}/> </div>
         </div>
            <div className="a-col-pola">

            <div className="a-col-cetvrtina"><p>Datum zapošljavanja:</p></div>
            <div className="a-col-cetvrtina"><input    placeholder={this.state.profileFields.startDate}
         disabled={true}/> </div>
         </div>
         </div>
         </div>

         <div className="odjeljak">
         <h3>Kontakt podaci</h3>
         <div className="a-row">
            <div className="a-col-pola">
            <div className="a-col-cetvrtina"><p>Adresa stanovanja:</p></div>
            <div className="a-col-cetvrtina"><input    placeholder='Adresa'
        value={this.state.address} onChange={(e) => { this.promijeniAdresu(e); this.provjeriUnos()} }/> </div>
        </div>
        <div className="a-col-pola">
        <div className="a-col-cetvrtina"><p>Grad:</p></div>
        <div className="a-col-cetvrtina"><input    placeholder='Grad'
        value={this.state.city} onChange={(e) => { this.promijeniGrad(e); this.provjeriUnos()} }/> </div>
        </div>
         </div>

         <div className="a-row">
            <div className="a-col-pola">
            <div className="a-col-cetvrtina"><p>Država:</p></div>
            <div className="a-col-cetvrtina"><input    placeholder='Adresa'
        value={this.state.address} onChange={(e) => { this.promijeniAdresu(e); this.provjeriUnos()} }/> </div>
        </div>
        <div className="a-col-pola">
        
        
        </div>
         </div>

         <div className="a-row">
            <div className="a-col-pola">
            <div className="a-col-cetvrtina"><p>Broj telefona:</p></div>
            <div className="a-col-cetvrtina"><input    placeholder='Broj telefona'
        value={this.state.mobile} onChange={(e) => { this.promijeniBrTel(e); this.provjeriUnos()} }/> </div>
        </div>
        <div className="a-col-pola">
        <div className="a-col-cetvrtina"><p>E-mail:</p></div>
        <div className="a-col-cetvrtina"><input    placeholder='E-mail'
        value={this.state.email} onChange={(e) => { this.promijeniEmail(e); this.provjeriUnos()} }/> </div>
        
        </div>
         </div>
        </div>
        <div className="odjeljak">
         <h3>Lični podaci</h3>
         <div className="a-row">
            <div className="a-col-pola">
            <div className="a-col-cetvrtina"><p>JMBG:</p></div>
            <div className="a-col-cetvrtina"><input    placeholder={this.state.profileFields.jmbg}
         disabled={true}/> </div>
        </div>
        <div className="a-col-pola">
        <div className="a-col-cetvrtina"><p>Datum rođenja:</p></div>
        <div className="a-col-cetvrtina"><input    placeholder={this.state.profileFields.birthday}
         disabled={true}/> </div>
        
        </div>
         </div>
         <div className="a-row">
            <div className="a-col-pola">
            <div className="a-col-cetvrtina"><p>Mjesto rođenja:</p></div>
            <div className="a-col-cetvrtina"><input    placeholder={this.state.profileFields.placeOfBirth}
         disabled={true}/> </div>
        </div>
        <div className="a-col-pola">
        <div className="a-col-cetvrtina"> <p>Država rođenja:</p> </div>
        <div className="a-col-cetvrtina"> <input    placeholder={this.state.profileFields.countryOfBirth}
         disabled={true}/> </div>
        </div>
        
        </div>
         </div>

         <div className="dno">
         <Link to='/radnik-profil' style={{ textDecoration: 'none' }}>
            <button type="button" class="btn btn-info btn-lg btn-block">Sačuvaj izmijenjeno</button>
            </Link>
          </div>
         </div>

         
         
       
      </div>
    )
  }
}