import React, { useState, Component } from 'react'
import FlavorForm from '../../components/Forma'
import Datum2 from '../../components/Datum2'
import { useAlert, positions, Provider as AlertProvider } from 'react-alert'
import moment from 'moment'
import '../../components/pages/Rezervacija.css'
import Navbar from '../Navbar';
import { Switch, Route, Link ,Router, useHistory, withRouter} from 'react-router-dom';
import Alert from 'react-popup-alert'
import Modal from 'react-modal';
import swal from 'sweetalert';
import { Button } from 'react-bootstrap';
import 'react-bootstrap'
import { Fragment } from 'react'
const opcije=[0,1,2,3,4,5,6]
const opcije2=[0,1,2,3,4,5,6]

const prevStyle = {'background': '#33c3f0', 'border-width': '2px'}
const nextStyle = {'background': '#33c3f0',  'border-width': '2px'}
class StepOne extends Component{
    constructor(props) {
        super(props);
        try{
          this.state = {
            ...props.location.state.info,
            startDate: props.location.state.info ? new Date(props.location.state.info.startDate)  : new Date(),
            endDate: props.location.state.info ? new Date(props.location.state.info.endDate)  : moment(moment(new Date())).add(1, 'd')._d,
            brOdraslih: props.location.state.info.brOdraslih ? props.location.state.info.brOdraslih  : 1,
            brDjece:props.location.state.info.brDjece ? props.location.state.info.brDjece  : 0,
            korak:1,
            ponuda:props.location.state.ponuda,
            popust:props.location.state.ponuda ? props.location.state.popust : 0,
            period_poc: props.location.state.ponuda ? new Date(props.location.state.period_poc) : new Date(),
            period_kraj: props.location.state.ponuda ? new Date(props.location.state.period_kraj) : new Date(),
            idoviSobaPonude:props.location.state.ponuda ? props.location.state.idoviSobaPonude : [],
            error:false, 
            prva_izmjena:true,
            modal:false,
          };
        }
        catch{
          this.state = {
            startDate: new Date(),
            endDate: moment(moment(new Date())).add(1, 'd')._d,
            brOdraslih:  1,
            brDjece: 0,
            korak:1,
            ponuda:props.location.state.ponuda,
            popust:props.location.state.ponuda ? props.location.state.popust : 0,
            period_poc: props.location.state.ponuda ? new Date(props.location.state.period_poc) : new Date(),
            period_kraj: props.location.state.ponuda ? new Date(props.location.state.period_kraj) : new Date(),
            idoviSobaPonude:props.location.state.ponuda ? props.location.state.idoviSobaPonude : [],
            error:false,
            prva_izmjena:true,
            modal:false,
          };
        }
        console.log("prvi")
      console.log(this.state)
        console.log(props);
      }
      componentDidMount() {
        window.scrollTo(0, 0)
      }
      hideModal = () => {
        
        this.setState(state => ({
          ...state,
          modal: false
        }))
        
      }
      showModal2 = () => {
        
        this.setState(state => ({
          ...state,
          modal: true
        }))
        
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
    <>
    <Navbar />
    <div className="multiStepContainer-one">
      <div className='multi-step-btns'>
        <button className="multi-step-btn-style-1" style={this.state.korak===1 ? {background:'#1E90FF', paddingTop:"5px"} : {background: 'silver', paddingTop:"5px"}}> 1</button>
        <button className="linija" style={this.state.korak===1 ? {background:'#1E90FF', paddingTop:"5px"} : {background: 'silver', paddingTop:"5px"}}></button>
        <button className="linija" style={this.state.korak===2 ? {background:'#1E90FF', paddingTop:"5px"} : {background: 'silver', paddingTop:"5px"}}></button>
        <button className="multi-step-btn-style-2" style={this.state.korak===2 ? {background:'#1E90FF', paddingTop:"5px"} : {background: 'silver', paddingTop:"5px"}}>2</button>
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
    
    <div className="multistep-position">
    <Fragment>
    
    <div className="step-one-container">
        <div className="row-s1">
                <Datum2 
                
                handle1={(value1, value2, izmjena)=>{
                  if(izmjena && !this.state.prva_izmjena) swal("Datum odlaska je automatski postavljen na dan iza datuma dolaska!");
               console.log("your value -->",value1);
               this.setState(state => ({
                ...state,
                startDate:value1,
                endDate:value2,
                prva_izmjena: this.state.prva_izmjena? false:false
              }))
             }}  
             handle2={(value1, value2)=>{
                //console.log("your value -->",value);
                
                this.setState(state => ({
                    ...state,
                    endDate:value1,
                    startDate:value2
                  }))
              }}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              period_poc={this.state.period_poc} 
              period_kraj={this.state.period_kraj}
              ponuda={this.state.ponuda}/>
        </div>
        
        <div className="pick">
        
            <div className="columnPick">
            <i class="far fa-user"></i>
                <p>Broj odraslih:</p>
                <form >
          <label>
            
            <select value={this.state.brOdraslih} onChange={e =>{this.promijeniBrOdraslih(e.target.value) }
                                                            }>
              {opcije.map((op)=>{
                
                 if( op<=6-this.state.brDjece&& op>0)
                return <option value={op}>{op}</option>
              })
                
              }
              
            </select>
          </label>
         
        </form>
            </div>
            <div className="columnPick">
            <i class="fas fa-baby"></i>
                <p>Broj djece:</p>
                <form >
          <label>
            
            <select value={this.state.brDjece} onChange={e =>{this.promijeniBrDjece(e.target.value) }
                                                            }>
              {opcije2.map((op)=>{
                
                 if( op<=6-this.state.brOdraslih)
                return <option value={op}>{op}</option>
              })
                
              }
              
            </select>
          </label>
         
        </form>
            </div>
            
        </div>
        <p textAlign="center">*Maksimalni ukupni broj gostiju za jednu rezervaciju može biti 6.</p> 
        <p textAlign="center">*Datum dolaska i odlaska ne mogu biti na isti dan.</p> 
          <div className="row-step-3">
              <div className="first-column-3">
                      <Route render={({ history}) => (
                        <button className="btn-nastavak-povratak-style-L"
                          onClick={() => { history.push('/');}}>
                          Povratak
                        </button>
                      )}
                    />
              </div>
              <div className="second-column-3">
              <Route render={({ history}) => (
        <button  className="btn-nastavak-povratak-style-R"
          onClick={() => { history.push('/rezervacija/1', { info: this.state,
            ponuda: this.state.ponuda,
            popust: this.state.popust,
            period_poc: this.state.period_poc,
            period_kraj: this.state.period_kraj,
            idoviSobaPonude: this.state.idoviSobaPonude     
          }); }}>
          Nastavi rezervaciju
        </button>
      )}
    />

              </div>
              </div>
              <br></br>
    </div>
    
    </Fragment>
    </div></div> 
    </>
  )
            }
}
export default withRouter(StepOne);