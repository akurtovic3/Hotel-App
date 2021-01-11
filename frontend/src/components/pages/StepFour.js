import React, { useState } from 'react'
import {FcCheckmark} from 'react-icons/fc'
import { withRouter, Route} from 'react-router-dom';
class StepFour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      osnove:props.location.state.osnove.osnove,
      infoSoba:props.location.state.infoSoba,
      infoKorisnik:props.location.state.infoKorisnik,
      ime : props.ime,
      prezime : props.prezime,
      checkin: props.checkin,
      checkout: props.checkout,
      br_odraslih: props.br_odraslih,
      br_djece: props.br_djece,
      

    };
    console.log(props)
  }

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
      
        <h1>Informacije o boravku</h1> 
        <p>Odraslih osoba: {this.state.osnove.brOdraslih}</p>
        <p>Djece: {this.state.osnove.brDjece}</p>
        <h1>Informacije o sobi</h1> 
        <p>Naziv sobe : {this.state.infoSoba.naziv}</p>  
        <p>Pogodnosti koje su uključene u rezervaciju:</p>
        <p>{this.state.infoSoba.dorucak&&"Doručak"}</p>
        <p>{this.state.infoSoba.rucak&&"Ručak"}</p>
        <p>Vaši lični podaci</p>
        <p>Pregled rezervacije</p>
        
      
            </div>
            <div className="btn-povratak">
            <Route render={({ history}) => (
              <button className="btn-nastavak-povratak-style" 
                onClick={() => { history.push('/rezervacija/2', { proslijedjeno:this.state, 
                  
                });
                this.prethKorak(); }}>
                Povratak
              </button>
            )}
          />
            </div>
      </div>
    );
  }
}

export default withRouter(StepFour);