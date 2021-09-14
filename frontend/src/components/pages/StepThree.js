

import {  Route, withRouter } from "react-router-dom";
import {FcCheckmark} from 'react-icons/fc'
import React, { Component } from 'react'
import Alert from "reactstrap/lib/Alert";
import Navbar from '../Navbar';
import '../../components/pages/Rezervacija.css'

class StepThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.location.state.info,
      ime: props.location.state.info.ime ? props.location.state.info.ime  : '',
      prezime: props.location.state.info.prezime ? props.location.state.info.prezime  : '',
      email: props.location.state.info.email ? props.location.state.info.email  : '',
      brojTel: props.location.state.info.brojTel ? props.location.state.info.brojTel  : '',
      specZahtj:props.location.state.info.specZahtj ? props.location.state.info.specZahtj  : '',
      korak:3,
      error: false,
      ponuda:props.location.state.info.ponuda,
      popust:props.location.state.info.ponuda ? props.location.state.info.popust : 0,
      period_poc: props.location.state.info.ponuda ? new Date(props.location.state.info.period_poc) : new Date(),
      period_kraj: props.location.state.info.ponuda ? new Date(props.location.state.info.period_kraj) : new Date(),
      idoviSobaPonude:props.location.state.info.ponuda ? props.location.state.info.idoviSobaPonude : []
    };
    //this.provjeriUnos();
    this.promijeniIme = this.promijeniIme.bind(this);
    this.promijeniPrezime = this.promijeniPrezime.bind(this);
    this.promijeniEmail = this.promijeniEmail.bind(this);
    this.promijeniBrojTel = this.promijeniBrojTel.bind(this);
    this.promijeniSpecZahtj = this.promijeniSpecZahtj.bind(this);
    console.log(props);
  }
  componentDidMount() {
    window.scrollTo(0, 0)
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
      ime: e.target.value,
    }))
  }
  promijeniPrezime(e) {
    this.setState(state => ({
      ...state,
      prezime: e.target.value
    }))
  }
  promijeniEmail(e) {
    this.setState(state => ({
      ...state,
      email: e.target.value}))
  }
  promijeniBrojTel(e) {
    this.setState(state => ({
      ...state,
      brojTel: e.target.value}))
  }
  promijeniSpecZahtj(e) {
    this.setState(state => ({
      ...state,
      specZahtj: e.target.value}))
  }
 
  postaviKorak(indx) {
    this.setState(state => ({
      ...state,
      korak:indx,
    }))
  }
  sljKorak(){ this.postaviKorak(this.state.korak + 1) }
  prethKorak(){ this.postaviKorak(this.state.korak > 0 ? this.state.korak -1 : this.state.korak)}

  

  render() {
    return (
      <>
      <Navbar/>
      
           <div className='multiStepContainer'>
             <div>
        <div className='multi-step-btns'>
        <button className="multi-step-btn-style-1" style={this.state.korak===1 ? {background:'#1E90FF', paddingTop:"2px"} : {background: 'silver', paddingTop:"2px"}}> <FcCheckmark/></button>
        <button className="linija" style={this.state.korak===1 ? {background:'#1E90FF', paddingTop:"5px"} : {background: 'silver', paddingTop:"5px"}}></button>
        <button className="linija" style={this.state.korak===2 ? {background:'#1E90FF', paddingTop:"5px"} : {background: 'silver', paddingTop:"5px"}}></button>
        <button className="multi-step-btn-style-2" style={this.state.korak===2 ? {background:'#1E90FF', paddingTop:"2px"} : {background: 'silver', paddingTop:"2px"}}><FcCheckmark/></button>
        <button className="linija" style={this.state.korak===2 ? {background:'#1E90FF', paddingTop:"5px"} : {background: 'silver', paddingTop:"5px"}}></button >
        <button className="linija" style={this.state.korak===3 ? {background:'#1E90FF', paddingTop:"5px"} : {background: 'silver', paddingTop:"5px"}}></button>
        <button className="multi-step-btn-style-3" style={this.state.korak===3 ? {background:'#1E90FF', paddingTop:"5px"} : {background: 'silver', paddingTop:"5px"}}>3</button>
        <button className="linija" style={this.state.korak===3 ? {background:'#1E90FF', paddingTop:"5px"} : {background: 'silver', paddingTop:"5px"}}></button>
        <button className="linija" style={this.state.korak===4 ? {background:'#1E90FF', paddingTop:"5px"} : {background: 'silver', paddingTop:"5px"}}></button>
        <button className="multi-step-btn-style-4" style={this.state.korak===4 ? {background:'#1E90FF', paddingTop:"5px"} : {background: 'silver', paddingTop:"5px"}}>4</button>
      </div>
      <div className="podnaslovi">
      <p>Informacije o boravku</p>
      <p>Odabir sobe</p>   
      <p>Vaši lični podaci</p>
      <p>Pregled rezervacije</p>
      </div>
              <div className="step-three-container">
                <p className="title">Informacije o gostu:</p>
                <div className='row-step-3'>
                  <div className='first-column-3'>
                      <input   className='input-form' placeholder='*Ime'
                        value={this.state.ime} onChange={(e) => { this.promijeniIme(e); if(this.state.error) this.provjeriUnos()} }/>
                  </div>
                  <div className='second-column-3'>
                      <input   className='input-form' placeholder='*Prezime' 
                      value={this.state.prezime} onChange={(e) => { this.promijeniPrezime(e); if(this.state.error)  this.provjeriUnos()} } />
                  </div>
                </div>
                <div className='row-step-3'>
                  <div className='first-column-3'>
                    <input    className='input-form' placeholder='*E-mail' 
                    value={this.state.email} onChange={(e) => { this.promijeniEmail(e); if(this.state.error)  this.provjeriUnos()} } /> 
                    <p className="napomena">Ovo je e-mail na koji ćemo vam poslati informacije o rezervaciji.</p>
                  </div>
                  <div className='second-column-3'>
                    <input    className='input-form' placeholder='*Broj telefona' 
                    value={this.state.brojTel} onChange={(e) => { this.promijeniBrojTel(e); if(this.state.error)  this.provjeriUnos()} } />  
                    
                  </div>
                </div>

                <div className='row'>
                  <div className='six columns'>
                    <label className="title">Specijalni zahtjevi:</label>
                    <input className='input-form2' placeholder='Ukoliko imate specijalne zahtjeve, napomene i slično, navedite ih ovdje.' 
                    value={this.state.specZahtj} onChange={this.promijeniSpecZahtj} /> 
                  </div>
                </div>
                {this.state.error && <Alert color="danger" fade={false}>
            <p style={{color: "red", fontWeight: "bold"}}>Morate popuniti sva polja označena zvjezdicom!</p>
          </Alert>}
          <br></br>
          <div className="row-step-3">
              <div className="first-column-3">
                      <Route render={({ history}) => (
                        <button className="btn-nastavak-povratak-style-L"
                          onClick={() => { history.push('/rezervacija/1', { info:this.state,
                            ponuda: this.state.ponuda,
                            popust: this.state.popust,
                            period_poc: this.state.period_poc,
                            period_kraj: this.state.period_kraj,
                            idoviSobaPonude: this.state.idoviSobaPonude}
                          );}}>
                          Povratak
                        </button>
                      )}
                    />
              </div>
              <div className="second-column-3">
                      <Route render={({ history}) => (
                        <button className="btn-nastavak-povratak-style-R"
                          onClick={() => { if(this.provjeriUnos()) {history.push('/rezervacija/3', { 
                            info:this.state,
                            ponuda: this.state.ponuda,
                            popust: this.state.popust,
                            period_poc: this.state.period_poc,
                            period_kraj: this.state.period_kraj,
                            idoviSobaPonude: this.state.idoviSobaPonude
                          }
                          ); } }}>
                          Nastavi rezervaciju
                        </button>
                      )}
              />

              </div>
              </div>
              </div>
              
              </div>

              
      </div>
      </>
    )
  }
}

export default withRouter(StepThree);
