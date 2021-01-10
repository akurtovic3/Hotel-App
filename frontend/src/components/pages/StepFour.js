import React, { useState } from 'react'
import {FcCheckmark} from 'react-icons/fc'
class ReservationData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ime : props.ime,
      prezime : props.prezime,
      checkin: props.checkin,
      checkout: props.checkout,
      br_odraslih: props.br_odraslih,
      br_djece: props.br_djece,
      

    };
  }

  render() {
    return (
      <div className="multiStepContainer">
         <div>
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
        <div className="podnaslovi">
        <p>Informacije o boravku</p>
        <p>Odabir sobe</p>   
        <p>Vaši lični podaci</p>
        <p>Pregled rezervacije</p>
        </div>
        <h1>Hello, world!</h1>
        <h2>It is .</h2>
      </div>
      </div>
    );
  }
}

export default ReservationData;