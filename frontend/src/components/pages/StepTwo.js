import React, {Component} from "react";
import RoomsContainer from "../../components/RoomsContainer";

import { Link, withRouter, useHistory, Route } from "react-router-dom";
import {FcCheckmark} from 'react-icons/fc'
import '../../components/pages/Rezervacija.css'


class Rooms extends Component{
  constructor(props) {
    super(props);
    this.state = {
      osnove:props.location.state,
      idSobe:-1,
      korak:2,
    };
    
    console.log(props);
  }
  postaviKorak(indx) {
    this.setState(state => ({
      ...state,
      korak:indx,
    }))
  }
  sljKorak(){ this.postaviKorak(this.state.korak + 1) }
  prethKorak(){ this.postaviKorak(this.state.korak > 0 ? this.state.korak -1 : this.state.korak)}
  
  render(){
  return (
    <> 
    <div className="header-step-2"> 
        <div className='multi-step-btns'>
        <button className="multi-step-btn-style-1" style={this.state.korak===1 ? {background:'#1E90FF'} : {background: 'silver'}}> <FcCheckmark/></button>
        <button className="linija" style={this.state.korak===1 ? {background:'#1E90FF'} : {background: 'silver'}}></button>
        <button className="linija" style={this.state.korak===2 ? {background:'#1E90FF'} : {background: 'silver'}}></button>
        <button className="multi-step-btn-style-2" style={this.state.korak===2 ? {background:'#1E90FF'} : {background: 'silver'}}>2</button>
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
      </div>    
          <div className="step-two-container">
            <RoomsContainer />
          </div>
          <div>

          <div className="btn-povratak">
            <Route render={({ history}) => (
              <button className="btn-nastavak-povratak-style" 
                onClick={() => { history.push('/rezervacija/0', { proslijedjeno:this.state, 
                  
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
                onClick={() => { history.push('/rezervacija/2', { proslijedjeno:this.state, 
                  
                });
                this.sljKorak(); }}>
                Nastavi rezervaciju
              </button>
            )}
    />

    </div>
    </div>
    </>
  );
  }
};

export default withRouter(Rooms);