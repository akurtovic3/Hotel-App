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
        <h2>PREGLED REZERVACIJE</h2> <br/>
        <h3>Informacije o boravku</h3> 
        <h5>Datum dolaska: <Moment format="DD/MM/YYYY">{this.state.startDate}</Moment></h5>
        <h5>Datum odlaska: <Moment format="DD/MM/YYYY">{this.state.endDate}</Moment></h5>
             
        <h5>Odraslih osoba: {this.state.brOdraslih}</h5>
        <h5>Djece: {this.state.brDjece}</h5> <br/>
        <h3>Informacije o sobi</h3> 
        <h5>Naziv sobe : {this.state.naziv}</h5>  <br/>
        <h3>Pogodnosti koje su uključene u rezervaciju:</h3>
        <h5>{this.state.dorucak&&"Doručak"}</h5>
        <h5>{this.state.rucak&&"Ručak"}</h5>
        <h5>{this.state.vecera&&"Večera"}</h5>
        <h5>{this.state.spa&&"Spa"}</h5>
        <h5>{this.state.bazen&&"Bazen"}</h5><br/>
        <p>{!this.provjeriImaLiPogodnosti()&&"Niste izabrali niti jednu od posebnih pogodnosti."}</p><br/>
        <h4>Vaši lični podaci</h4>
        <h5>Ime: {this.state.ime}</h5>
        <h5>Prezime: {this.state.prezime}</h5>
        <h5>E-mail: {this.state.email}</h5>
        <h5>Broj telefona: {this.state.brojTel}</h5>
        <br/>
        <h2>Cijena: </h2> <h2 style={{fontWeight: "bold"}}>{this.state.cijena} €</h2>
        <p>   </p>
        <p>   </p>
        <p style={{color: "grey", fontWeight: "bold"}}>Ukoliko želite promijeniti/popraviti neku od stavki rezervacije vratite se na odgovarajući prethodni korak klikom na dugme "Povratak"!</p>
        
      
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
            <div className="btn-nastavak">
            <button className="btn-nastavak-povratak-style"  onClick={this.showModal.bind(this)}>Potvrdi rezervaciju</button>
            </div>
            <div className="modal">

            
              
            
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