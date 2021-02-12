import React, { useState, Component } from 'react'
import FlavorForm from '../../components/Forma'
import Datum2 from '../../components/Datum2'
import Button from 'react-bootstrap/Button';
import '../../components/pages/Rezervacija.css'
import { Switch, Route, Link ,Router, useHistory, withRouter} from 'react-router-dom';


import 'react-bootstrap'
import { Fragment } from 'react'

const prevStyle = {'background': '#33c3f0', 'border-width': '2px'}
const nextStyle = {'background': '#33c3f0',  'border-width': '2px'}
class StepOne extends Component{
    constructor(props) {
        super(props);
        try{
          this.state = {
            ...props.location.state.info,
            startDate: props.location.state.info ? new Date(props.location.state.info.startDate)  : new Date(),
            endDate: props.location.state.info ? new Date(props.location.state.info.endDate)  : new Date(),
            brOdraslih: props.location.state.info.brOdraslih ? props.location.state.info.brOdraslih  : 1,
            brDjece:props.location.state.info.brDjece ? props.location.state.info.brDjece  : 0,
            korak:1,
          };
        }
        catch{
          this.state = {
            startDate: new Date(),
            endDate: new Date(),
            brOdraslih:  1,
            brDjece: 0,
            korak:1,
          };
        }
        
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
      promijeniBrOdraslih=(broj) =>{this.setState(state => ({
        ...state,
        brOdraslih:parseInt(broj)
      }))}
      promijeniBrDjece=(broj) =>{this.setState(state => ({
        ...state,
        brDjece:parseInt(broj)
      }))}
      promijeniBrSoba=(broj) =>{this.setState(state => ({
        ...state,
        brSoba:parseInt(broj)
      }))}
      povecajKorak=() =>{this.setState(state => ({
        ...state,
        korak:this.state.korak+1
      }))}
  render(){
  return (
    <div className="multiStepContainer">
      <div className='multi-step-btns'>
        <button className="multi-step-btn-style-1" style={this.state.korak===1 ? {background:'#1E90FF'} : {background: 'silver'}}> 1</button>
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
    
    <div className="multistep-position">
    <Fragment>
    
    <div className="step-one-container">
        <div className="row-s1">
                <Datum2 
                handle1={(value1)=>{
               //console.log("your value -->",value);
               this.setState(state => ({
                ...state,
                startDate:value1,
              }))
             }}  
             handle2={(value1)=>{
                //console.log("your value -->",value);
                this.setState(state => ({
                    ...state,
                    endDate:value1,
                  }))
              }}
              startDate={this.state.startDate}
              endDate={this.state.endDate} />
        </div>
        
        <div className="pick">
        
            <div className="columnPick">
            <i class="far fa-user"></i>
                <p>Broj odraslih:</p>
                <FlavorForm id="odrasli" pocetniOdrasli={this.state.brOdraslih}  promijeniBrOdraslih={this.promijeniBrOdraslih}/>
            </div>
            <div className="columnPick">
            <i class="fas fa-baby"></i>
                <p>Broj djece:</p>
                <FlavorForm id="djeca" pocetniDjeca={this.state.brDjece} promijeniBrDjece={this.promijeniBrDjece}/>
            </div>
            
        </div>
    </div>
    <div>
      
        
    <div className="btn-nastavak">
      <Route render={({ history}) => (
        <button  className="btn-nastavak-povratak-style"
          onClick={() => { history.push('/rezervacija/1', { info:{
            startDate:this.state.startDate,
            endDate:this.state.endDate,
            brOdraslih:this.state.brOdraslih,
            brDjece:this.state.brDjece      }      
          }); }}>
          Nastavi rezervaciju
        </button>
      )}
    />

    </div>
  </div>
    </Fragment>
    </div></div> 
  )
            }
}
export default withRouter(StepOne);