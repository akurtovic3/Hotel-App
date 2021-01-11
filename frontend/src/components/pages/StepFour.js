import React, { useState } from 'react'
import {FcCheckmark} from 'react-icons/fc'
import { withRouter, Route} from 'react-router-dom';
import '../../components/HeroSection.css'
class StepFour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.location.state.info,    

    };
    console.log(this.state)
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
      
        <h1>Informacije o boravku</h1> 
        <h2>Odraslih osoba: {this.state.brOdraslih}</h2>
        <h2>Djece: {this.state.brDjece}</h2>
        <h1>Informacije o sobi</h1> 
        <h2>Naziv sobe : {this.state.naziv}</h2>  
        <h1>Pogodnosti koje su uključene u rezervaciju:</h1>
        <h2>{this.state.dorucak&&"Doručak"}</h2>
        <h2>{this.state.rucak&&"Ručak"}</h2>
        <h2>{this.state.vecera&&"Večera"}</h2>
        <h2>{this.state.spa&&"Spa"}</h2>
        <h2>{this.state.bazen&&"Bazen"}</h2>
        <p>{!this.provjeriImaLiPogodnosti()&&"Niste izabrali niti jednu od posebnih pogodnosti."}</p>
        <h1>Vaši lični podaci</h1>
        <h2>Ime: {this.state.ime}</h2>
        <h2>Prezime: {this.state.prezime}</h2>
        <h2>E-mail: {this.state.email}</h2>
        <h2>Broj telefona: {this.state.brojTel}</h2>
        <h2>Pregled rezervacije</h2>
        <h1>Cijena: </h1> <h1 style={{fontWeight: "bold"}}>{this.state.cijena} KM</h1>
        <p>   </p>
        <p>   </p>
        <p style={{color: "red", fontWeight: "bold"}}>Ukoliko želite promijeniti/popraviti neku od stavki rezervacije vratite se na odgovarajući prethodni korak klikom na dugme "Povratak"!</p>
        
      
            </div>
            
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
            <Route render={({ history}) => (
              <button className="btn-nastavak-povratak-style" 
                onClick={() => { history.push('/rezervacija/2', { info:this.state
                  
                });}}>
                Potvrdi Rezervaciju
              </button>
            )}
          /> </div>
            
      </div> 
    );
  }
}

export default withRouter(StepFour);