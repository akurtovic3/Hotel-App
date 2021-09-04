import React from 'react'
import NavbarRadnik from '../NavbarRadnik'
import Profile from '../Profile'
import './RadnikMojProfil.css'
import jane from '../../images/jane-doe.jpg';
import john from '../../images/john-doe.png';
import { BsDot } from 'react-icons/bs';
import {GrUserManager} from 'react-icons/gr'
import { Link } from 'react-router-dom';
import {  Route, withRouter } from "react-router-dom";
import Axios from "axios"

class RadnikMojProfil extends React.Component {
  constructor (props) {
    super(props)
    console.log(props)
    this.state = {
      photoMale: john,
      photoFemale: jane,
      
      spol: props.location.state.info.spol,
      profileFields: props.location.state.info,
    }
   /* if(typeof props.location.state.info!== 'undefined'){
      this.setState(state => ({
        ...state,
        ...props.location.state.info,
        spol: props.location.state.info[0].spol,
        profileFields: props.location.state.info[0],
      }));
      
    console.log("ovo gledajjjjjjjjjjjj")
    console.log(this.state)
    this.inicijalizuj();
    }
    else{ this.setState(state => ({
      ...state,
      spol: props.spol,
      profileFields: props,
    }));*/
    //var id=2;
    Axios.get("http://localhost:3001/zaposlenik?id="+this.state.profileFields.id).then(result=>{
    console.log("proslijediti");

    console.log(result.data);  
      this.setState(state => ({
        ...state,
        spol:result.data[0].spol,
        profileFields:result.data[0],
      }));
    });
    //props.location.state.info ? props.location.state.info[0].id:this.state.info.id
    console.log("ovo gledajjjjjjjjjjjj")
    console.log(this.state)
  

    
  }
  render () {
    return (
      <div className="profile-page">
        <NavbarRadnik props={this.state.profileFields}/>
        <div className="logout-edit">
          <p><GrUserManager/>{this.state.profileFields.username}
          <br/>
          <Link to={{
            pathname: "/radnik/edit-profil",
            state: {
              info:this.state.profileFields,
            },
            }}>
            Edit 
          </Link>
          <BsDot/>
          <Link to={{
            pathname: "/radnik",
            }}>
          Logout
          </Link>
          </p>
          
          </div>
        <Profile spol={this.state.spol} polja={this.state.profileFields} photo={this.state.spol ?  this.state.photoFemale : this.state.photoMale} />
      </div>
    )
  }
}
export default withRouter(RadnikMojProfil);