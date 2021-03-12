import React from 'react'
import NavbarRadnik from '../NavbarRadnik'
import Profile from '../Profile'
import './RadnikMojProfil.css'
import jane from '../../images/jane-doe.jpg';
import john from '../../images/john-doe.png';
import { BsDot } from 'react-icons/bs';
import {GrUserManager} from 'react-icons/gr'
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
        
        id: 1312,
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
  }

  render () {
    return (
      <div className="profile-page">
        <NavbarRadnik/>
        <div className="logout-edit">
          <p><GrUserManager/>{this.state.profileFields.username}
          <br/>
          <Link to="/radnik/edit-profil">
            Edit 
          </Link>
          <BsDot/>
          <Link to="/">
          Logout
          </Link>
          </p>
          
          </div>
        <Profile spol={this.state.spol}polja={this.state.profileFields} photo={this.state.spol ?  this.state.photoFemale : this.state.photoMale} />
      </div>
    )
  }
}