import React from 'react'
import Moment from "moment"
import {  Route, withRouter } from "react-router-dom";

function Profile(props){

  return(
    <>
    
    <div class="row">
      <div class="column-left">
        
        <div className="accent">
          <br></br>
          <br></br>
          <br></br>
          <h4>Osnovne informacije</h4>
          <div className="r">
              <div className="col"><p>Ime:</p></div>
              <div className="col"><p className="input">{props.polja.ime}</p> </div>
          </div>
          <div className="r">
              <div className="col"><p>Prezime:</p></div>
              <div className="col"><p className="input">{props.polja.prezime}</p> </div>
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
              <div className="col2L"><p className="input">{props.polja.zaposlenje}</p> </div>
              <div className="col2R"><p>Datum zapošljavanja:</p></div>
              <div className="col2L"><p className="input">{Moment(props.polja.datum_zaposlj).format('DD.MM.YYYY.')}</p> </div>
          </div>
        </div>

        <div className="accent3">
          <h4>Kontakt podaci</h4>
          <div className="r2">
                <div className="col2R"><p>Adresa:</p></div>
                <div className="col2L"><p className="input">{props.polja.adresa}</p> </div>
                <div className="col2R"><p>Grad:</p></div>
                <div className="col2L"><p className="input">{props.polja.grad}</p> </div>
                
            </div>
            <div className="r2">
                <div className="col2R"><p>Država:</p></div>
                <div className="col2L"><p className="input">{props.polja.drzava}</p> </div>
                <div className="col2R"><p></p></div>
                <div className="col2L"><p></p> </div>
                
          </div>
          <div className="r2">
          <div className="col2R"><p>Kontakt telefon:</p></div>
                <div className="col2L"><p className="input">{props.polja.tel}</p> </div>
                <div className="col2R"><p>Kontakt e-mail:</p></div>
                <div className="col2L"><p className="input">{props.polja.mail}</p> </div>
          </div>
        </div>

        <div className="accent4">
          <h4>Lični podaci</h4>
          <div className="r2">
                <div className="col2R"><p>JMBG</p></div>
                <div className="col2L"><p className="input">{props.polja.jmbg}</p> </div>
                <div className="col2R"><p>Datum rođenja:</p></div>
                <div className="col2L"><p className="input">{Moment(props.polja.dat_rodj).format('DD.MM.YYYY.')}</p> </div>
                
            </div>

          <div className="r2">
          <div className="col2R"><p>Mjesto rođenja:</p></div>
                <div className="col2L"><p className="input">{props.polja.mjesto_rodj}</p> </div>
                <div className="col2R"><p>Država rođenja:</p></div>
                <div className="col2L"><p className="input">{props.polja.drzava_rodj}</p> </div>
          </div>
        </div>
        
      </div>
      
    </div>
  
  </>

  );
}



export default withRouter(Profile);