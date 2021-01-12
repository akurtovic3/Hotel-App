import React, { useState } from 'react'
import {FcCheckmark} from 'react-icons/fc'
import { withRouter, Route} from 'react-router-dom';
import '../../components/HeroSection.css'
import Moment from 'react-moment';
import moment from "moment"
import Popup from 'reactjs-popup';
import '../../components/PopUp2.css'
import Axios from "axios";
import Modal from 'react-modal';
const c_obroka=5;
const c_bazen=30;
const c_spa=50;



class StepFour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.location.state.info, 
      modal: false   ,
      idSoba:8, 
      id_korisnik:-1,
      korak:4
    };
    this.showModal = this.showModal.bind(this);
    console.log(this.state)
    
  }
  showModal = () => {
    this.setState(state => ({
      ...state,
      modal : !this.state.modal,
    }))
    this.submitRezervaciju();
  }
  
submitRezervaciju=()=>{
  console.log("uslo")
  var start_date= moment(this.state.startDate).format('YYYY-MM-DD hh:mm:ss');
  var end_date=moment(this.state.endDate).format('YYYY-MM-DD hh:mm:ss');
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
    start_date : start_date,
    end_date : end_date,
    br_djece : this.state.brDjece,
    br_odraslih : this.state.brOdraslih,
    dorucak : this.state.dorucak,
    rucak : this.state.rucak,
    vecera : this.state.vecera,
    spa : this.state.spa,
    bazen : this.state.bazen,
    cijena : this.state.cijena
  }).then(()=>{
    //alert("successful insert!");
  });
    
  });
  //console.log(id_korisnik)
  
  console.log("izaslo")
}
izracunajCijenu=()=>{
  var cijena = this.state.cijena;
  var brDana=moment(this.state.startDate).diff(moment(this.state.endDate), 'days');
  console.log(brDana)
  var brOsoba=this.state.brDjece+this.state.brOdraslih;
  if(this.state.dorucak) cijena+=brDana*brOsoba*c_obroka;
  if(this.state.rucak) cijena+=brDana*brOsoba*c_obroka;
  if(this.state.vecera) cijena+=brDana*brOsoba*c_obroka;
  if(this.state.spa) cijena+=c_spa;
  if(this.state.bazen) cijena+=brDana*brOsoba*c_bazen;
  return cijena;
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
        <h1>Cijena: </h1> <h1 style={{fontWeight: "bold"}}>{this.state.cijena} €</h1>
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
            <div className="modal">

            <div className="btn-potvrdi-rez">
              <button className="btn-nastavak-povratak-style"  onClick={this.showModal.bind(this)}>Potvrdi rezervaciju</button>
            </div>
              <Modal
                isOpen={this.state.modal}
                onRequestClose={this.showModal.bind(this)}
                contentLabel="My dialog"
                className="mymodal"
              overlayClassName="myoverlay"
              closeTimeoutMS={500}
              >
                <div className="potvrda">Rezervacija potvrđena! </div>
                  <h6>Vidimo se uskoro!</h6>
                <Route render={({ history}) => (
                    <button className="btn-nastavak-povratak-style" 
                      onClick={() => { history.push('/')}}>
                      Povratak na početnu stranicu
                    </button>
                  )}
                />
              </Modal>
            
           </div>
           {/*}
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
    );
  }
}

export default withRouter(StepFour);