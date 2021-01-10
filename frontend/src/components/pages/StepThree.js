

import {  Route } from "react-router-dom";
import {FcCheckmark} from 'react-icons/fc'
import React, { Component } from 'react'

export default class StepThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      osnove:props.location.state,
      ime: '',
      prezime: '',
      email: '',
      brojtel: '',
      specZahtj:'',
      korak:3,
    };
    this.promijeniIme = this.promijeniIme.bind(this);
    this.promijeniPrezime = this.promijeniPrezime.bind(this);
    this.promijeniEmail = this.promijeniEmail.bind(this);
    this.promijeniBrojTel = this.promijeniBrojTel.bind(this);
    this.promijeniSpecZahtj = this.promijeniSpecZahtj.bind(this);
    console.log(props);
  }
  

  promijeniIme(e) {
    this.setState({ime: e.target.ime});
  }
  promijeniPrezime(e) {
    this.setState({prezime: e.target.prezime});
  }
  promijeniEmail(e) {
    this.setState({email: e.target.email});
  }
  promijeniBrojTel(e) {
    this.setState({brojtel: e.target.brojtel});
  }
  promijeniSpecZahtj(e) {
    this.setState({specZahtj: e.target.specZahtj});
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
      
           <div className='multiStepContainer'>
             <div>
        <div className='multi-step-btns'>
        <button className="multi-step-btn-style-1" style={this.state.korak===1 ? {background:'#1E90FF'} : {background: 'silver'}}> <FcCheckmark/></button>
        <button className="linija" style={this.state.korak===1 ? {background:'#1E90FF'} : {background: 'silver'}}></button>
        <button className="linija" style={this.state.korak===2 ? {background:'#1E90FF'} : {background: 'silver'}}></button>
        <button className="multi-step-btn-style-2" style={this.state.korak===2 ? {background:'#1E90FF'} : {background: 'silver'}}><FcCheckmark/></button>
        <button className="linija" style={this.state.korak===2 ? {background:'#1E90FF'} : {background: 'silver'}}></button >
        <button className="linija" style={this.state.korak===3 ? {background:'#1E90FF'} : {background: 'silver'}}></button>
        <button className="multi-step-btn-style-3" style={this.state.korak===3 ? {background:'#1E90FF'} : {background: 'silver'}}>3</button>
        <button className="linija" style={this.state.korak===3 ? {background:'#1E90FF'} : {background: 'silver'}}></button>
        <button className="linija" style={this.state.korak===4 ? {background:'#1E90FF'} : {background: 'silver'}}></button>
        <button className="multi-step-btn-style-4" style={this.state.korak===4 ? {background:'#1E90FF'} : {background: 'silver'}}>4</button>
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
                      <input type="ime"  className='input-form' placeholder='*Ime'
                        ime={this.state.ime} onChange={this.promijeniIme} />
                  </div>
                  <div className='second-column-3'>
                      <input  type="prezime"  className='input-form' placeholder='*Prezime' 
                      prezime={this.state.prezime} onChange={this.promijeniPrezime} />
                  </div>
                </div>
                <div className='row-step-3'>
                  <div className='first-column-3'>
                    <input  type="email"  className='input-form' placeholder='*E-mail' 
                    email={this.state.email} onChange={this.promijeniEmail} /> 
                    <p className="napomena">Ovo je e-mail na koji ćemo vam poslati informacije o rezervaciji.</p>
                  </div>
                  <div className='second-column-3'>
                    <input  type="brojtel"  className='input-form' placeholder='*Broj telefona' 
                    brojtel={this.state.brojtel} onChange={this.promijeniBrojTel} />  
                    
                  </div>
                </div>

                <div className='row'>
                  <div className='six columns'>
                    <label className="title">Specijalni zahtjevi:</label>
                    <input type="specZahtj"className='input-form2' placeholder='Ukoliko imate specijalne zahtjeve, napomene i slično, navedite ih ovdje.' 
                    specZahtj={this.state.specZahtj} onChange={this.promijeniSpecZahtj} /> 
                  </div>
                </div>
                
              </div>
              <div className="btn-povratak">
                      <Route render={({ history}) => (
                        <button className="btn-nastavak-povratak-style"
                          onClick={() => { history.push('/rezervacija/1', { proslijedjeno:this.state, 
                            
                          });
                          this.prethKorak(); }}>
                          Povratak
                        </button>
                      )}
                    />
              </div>
              <div className="btn-nastavak">
                      <Route render={({ history}) => (
                        <button className="btn-nastavak-povratak-style"
                          onClick={() => { history.push('/rezervacija/3', { proslijedjeno:this.state, 
                            
                          });
                          this.sljKorak(); }}>
                          Nastavi rezervaciju
                        </button>
                      )}
              />

              </div>
              </div>

              
      </div>
    )
  }
}


