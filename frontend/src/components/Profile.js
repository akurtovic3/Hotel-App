import React from 'react'
import { BsDot } from 'react-icons/bs';
import {GrUserManager} from 'react-icons/gr'
import { Link } from 'react-router-dom';

function Profile(props){

  return(
    <>
    <div className="logout-edit">
    <p><GrUserManager/>{props.polja.username}
    <br/>
    <Link to="/radnik-profil-edit">
      Edit 
    </Link>
    <BsDot/>
    <Link to="/">
    Logout
    </Link>
    </p>
    
    </div>
    <div class="row">
      <div class="column-left">
        
        <div className="accent">
          <br></br>
          <br></br>
          <br></br>
          <h4>Osnovne informacije</h4>
          <div className="r">
              <div className="col"><p>Ime:</p></div>
              <div className="col"><p className="input">{props.polja.firstName}</p> </div>
          </div>
          <div className="r">
              <div className="col"><p>Prezime:</p></div>
              <div className="col"><p className="input">{props.polja.lastName}</p> </div>
          </div>
          <div className="r">
              <div className="col"><p>Spol:</p></div>
              <div className="col"><p className="input">{props.spol ? "Ženski":"Muški"}</p> </div>
          </div>
          <div className="r">
              <div className="col"><p>ID zaposlenika:</p></div>
              <div className="col"><p className="input">{props.polja.id}</p> </div>
          </div>
          
        </div>
        <div className='profile-photo'>
          <img src={props.photo} alt='Profile photo' />
        </div>
      </div>
      <div class="column-right">
        <div className="accent2">
        <h4>Informacije o zaposlenju</h4>
        <div className="r2">
              <div className="col2R"><p>Zaposlenje:</p></div>
              <div className="col2L"><p className="input">{props.polja.jobTitle}</p> </div>
              <div className="col2R"><p>Datum zapošljavanja:</p></div>
              <div className="col2L"><p className="input">{props.polja.startDate}</p> </div>
          </div>
        </div>

        <div className="accent3">
          <h4>Kontakt podaci</h4>
          <div className="r2">
                <div className="col2R"><p>Adresa:</p></div>
                <div className="col2L"><p className="input">{props.polja.address}</p> </div>
                <div className="col2R"><p>Grad:</p></div>
                <div className="col2L"><p className="input">{props.polja.city}</p> </div>
                
            </div>
            <div className="r2">
                <div className="col2R"><p>Država:</p></div>
                <div className="col2L"><p className="input">{props.polja.country}</p> </div>
                <div className="col2R"><p></p></div>
                <div className="col2L"><p></p> </div>
                
          </div>
          <div className="r2">
          <div className="col2R"><p>Kontakt telefon:</p></div>
                <div className="col2L"><p className="input">{props.polja.mobile}</p> </div>
                <div className="col2R"><p>Kontakt e-mail:</p></div>
                <div className="col2L"><p className="input">{props.polja.email}</p> </div>
          </div>
        </div>

        <div className="accent4">
          <h4>Lični podaci</h4>
          <div className="r2">
                <div className="col2R"><p>JMBG</p></div>
                <div className="col2L"><p className="input">{props.polja.jmbg}</p> </div>
                <div className="col2R"><p>Datum rođenja:</p></div>
                <div className="col2L"><p className="input">{props.polja.birthday}</p> </div>
                
            </div>

          <div className="r2">
          <div className="col2R"><p>Mjesto rođenja:</p></div>
                <div className="col2L"><p className="input">{props.polja.placeOfBirth}</p> </div>
                <div className="col2R"><p>Država rođenja:</p></div>
                <div className="col2L"><p className="input">{props.polja.countryOfBirth}</p> </div>
          </div>
        </div>
        
      </div>
      
    </div>
  
  </>

  );
}



export default Profile