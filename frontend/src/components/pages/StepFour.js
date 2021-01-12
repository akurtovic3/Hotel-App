import React, { useState } from 'react'
import {FcCheckmark} from 'react-icons/fc'
import { withRouter, Route} from 'react-router-dom';
import '../../components/HeroSection.css'
import Moment from 'react-moment';
import Popup from 'reactjs-popup';
import '../../components/PopUp2.css'
import Axios from "axios";


class StepFour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.location.state.info, 
      modal: false   ,
      idSoba:8, 
      id_korisnik:-1

    };
    
    console.log(this.state)
  }
  handleSubmit(e) {
    this.modalClose();
  }

  modalOpen() {
    this.setState(state => ({
      ...state,
      modal: true
    }))
  }
submitRezervaciju=()=>{
  console.log("uslo")
  Axios.post("http://localhost:3001/kreirajNeregistrovanogKorisnika", 
  {
    ime: this.state.ime,
    prezime: this.state.prezime,
    email:this.state.email,
    br_tel:this.state.brojTel
  }).then((result)=>{
    this.setState(state => ({
      ...state,
      id_korisnik:result.data.id_korisnik
    }))
    Axios.post("http://localhost:3001/kreirajRezervaciju", 
  {
    id_korisnik : result.data.id_korisnik,
    id_soba : this.state.idSoba,
    start_date : new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(this.state.startDate),
    end_date : new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(this.state.endDate),
    br_djece : this.state.brDjece,
    br_odraslih : this.state.brOdraslih,
    dorucak : this.state.dorucak,
    rucak : this.state.rucak,
    vecera : this.state.vecera,
    spa : this.state.spa,
    bazen : this.state.bazen,
    cijena : this.state.cijena
  }).then(()=>{
    alert("successful insert!");
  });
    
  });
  //console.log(id_korisnik)
  
  console.log("izaslo")
}
  modalClose() {
    this.setState(state => ({
      ...state,
      modal: false
    }))
  }
  provjeriImaLiPogodnosti=()=>{if(this.state.dorucak==true || this.state.rucak==true || this.state.vecera==true || this.state.spa==true || this.state.bazen==true) return true; else return false;}
  render() {
    return (
      <div className="multiStepContainer">
         <div className="header-step-4"> 
        <div className='multi-step-btns'>
        <button className="multi-step-btn-style-1" style={this.state.korak===1 ? {background:'#1E90FF'} : {background: 'silver'}}> <FcCheckmark/></button>
        <button className="linija" style={this.state.korak===1 ? {background:'#1E90FF'} : {background: 'silver'}}></button>
        <button className="linija" style={this.state.korak===2 ? {background:'#1E90FF'} : {background: 'silver'}}></button>
        <button className="multi-step-btn-style-2" style={this.state.korak===2 ? {background:'#1E90FF'} : {background: 'silver'}}><FcCheckmark/></button>
        <button className="linija" style={this.state.korak===2 ? {background:'#1E90FF'} : {background: 'silver'}}></button >
        <button className="linija" style={this.state.korak===3 ? {background:'#1E90FF'} : {background: 'silver'}}></button>
        <button className="multi-step-btn-style-3" style={this.state.korak===3 ? {background:'#1E90FF'} : {background: 'silver'}}><FcCheckmark/></button>
        <button className="linija" style={this.state.korak===3 ? {background:'#1E90FF'} : {background: 'silver'}}></button>
        <button className="linija" style={this.state.korak===4 ? {background:'#1E90FF'} : {background: 'silver'}}></button>
        <button className="multi-step-btn-style-4" style={this.state.korak===4 ? {background:'#1E90FF'} : {background: 'silver'}}>4</button>
        </div>
        
      </div>
      <div className="step-four-container">
        <h1>PREGLED REZERVACIJE</h1> <br/>
        <h2>Informacije o boravku</h2> 
        <h4>Datum dolaska: <Moment format="DD/MM/YYYY">{this.state.startDate}</Moment></h4>
        <h4>Datum odlaska: <Moment format="DD/MM/YYYY">{this.state.endDate}</Moment></h4>
             
        <h4>Odraslih osoba: {this.state.brOdraslih}</h4>
        <h4>Djece: {this.state.brDjece}</h4> <br/>
        <h2>Informacije o sobi</h2> 
        <h4>Naziv sobe : {this.state.naziv}</h4>  <br/>
        <h2>Pogodnosti koje su uključene u rezervaciju:</h2>
        <h4>{this.state.dorucak&&"Doručak"}</h4>
        <h4>{this.state.rucak&&"Ručak"}</h4>
        <h4>{this.state.vecera&&"Večera"}</h4>
        <h4>{this.state.spa&&"Spa"}</h4>
        <h4>{this.state.bazen&&"Bazen"}</h4><br/>
        <p>{!this.provjeriImaLiPogodnosti()&&"Niste izabrali niti jednu od posebnih pogodnosti."}</p><br/>
        <h2>Vaši lični podaci</h2>
        <h4>Ime: {this.state.ime}</h4>
        <h4>Prezime: {this.state.prezime}</h4>
        <h4>E-mail: {this.state.email}</h4>
        <h4>Broj telefona: {this.state.brojTel}</h4>
        <br/>
        <h1>Cijena: </h1> <h1 style={{fontWeight: "bold"}}>{this.state.cijena} KM</h1>
        <p>   </p>
        <p>   </p>
        <p style={{color: "red", fontWeight: "bold"}}>Ukoliko želite promijeniti/popraviti neku od stavki rezervacije vratite se na odgovarajući prethodni korak klikom na dugme "Povratak"!</p>
        
      
            </div>
            <div>
            <div className="btn-povratak">
            <Route render={({ history}) => (
              <button className="btn-nastavak-povratak-style" 
                onClick={() => { history.push('/rezervacija/2', { info:this.state
                  
                });}}>
                Povratak
              </button>
            )}
          />
            </div> 
            <div className="btn-povratak">
            <div className="modal">
            <button type="button" class="btn-nastavak-povratak-style" onClick={this.submitRezervaciju}>Potvrdi rezervaciju</button>
            {/*<Popup modal className='popup' trigger={<button type="button" class="btn-nastavak-povratak-style" onClick={this.submitRezervaciju}>Potvrdi rezervaciju</button>}>
              Uspješno ste izvršili rezervaciju! <br/> 

              <Route render={({ history}) => (
                        <button className="btn-nastavak-povratak-style"
                          onClick={() => { history.push('/', { info:this.state}
                          ); } }
                          
                          >
                          Povratak na početnu stranicu
                        </button>
                      )}
              />
            </Popup>  
              */}
            </div>
           </div>
           </div>
      </div> 
    );
  }
}

export default withRouter(StepFour);