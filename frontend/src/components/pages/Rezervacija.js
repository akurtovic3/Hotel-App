import React, { Component } from 'react';
import '../../App.css';
import './Rezervacija.css'
import { css, styled, setup } from 'goober'
import 'react-calendar/dist/Calendar.css';
import {Switch, Route, useHistory} from 'react-router-dom'
import MultiStep from '../../components/react-multistep'


import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import StepFour from './StepFour'
setup(React.createElement)
const steps = [
  { component: <StepOne /> },
  { component: <StepTwo /> },
  { component: <StepThree /> },
  { component: <StepFour /> }
]

const prevStyle = {'background': '#33c3f0', 'border-width': '2px'}
const nextStyle = {'background': '#33c3f0',  'border-width': '2px'}
export default class Rezervacija extends Component{
  constructor(props) {
    super(props);
    this.state = {
      startDate: props.location.state.startDate,
      endDate: props.location.state.endDate,
      brOdraslih: 1,
      brDjece:1,
      brSoba:1,
      idSoba: 1,
      ime:"",
      prezime:"",
      brTel:"",
      email:"",
      korak:0,
      className:"StepOne",
      proba: props.location.state.proba
    };
  }
  unesiPrviKorak(startDate, endDate, brOdraslih, brDjece, brSoba){
    this.setState(state => ({
      ...state,
      startDate: startDate,
      endDate: endDate,
      brOdraslih: brOdraslih,
      brDjece:brDjece,
      brSoba:brSoba,
    }))
  }
  postaviKorak(indx) {
    this.setState(state => ({
      ...state,
      korak:indx,
    }))
  }
  prviKorak(){
    
    <Route
                  exact path="/rezervacija/0"
                  render={(props) => (
                    <StepOne {...props} previous={this.prethKorak} proba="Emina" prevStyle={prevStyle} nextStyle={nextStyle}  next={this.sljKorak}  unesiPrviKorak={this.unesiPrviKorak}/>
                  )}
                />
                  }
  sljKorak(){ this.postaviKorak(this.state.korak + 1) }
  prethKorak(){ this.postaviKorak(this.state.korak > 0 ? this.state.korak -1 : this.state.korak)}
  render(){
    return (
      <>
      
          

          <div className="multiStepContainer">
            
          <div className='title-rezerv'>{this.state.proba}</div>
          <div className="multistep-position">
          <div className={this.state.className}>
          {this.prviKorak}
                    </div>)
           :
          <div>
            
           
          
              
          <Switch>
    
              {/*{steps[this.state.korak].component}
              <Route path="/rezervacija/0" >
                {props.steps[0].component}
        </Route>*/}
                {this.prviKorak}
                <Route
                  exact path="/rezervacija/0"
                  render={(props) => (
                    <StepOne {...props} previous={this.prethKorak} proba="Emina" startDate={this.state.startDate} prevStyle={prevStyle} nextStyle={nextStyle}  next={this.sljKorak}  unesiPrviKorak={this.unesiPrviKorak}/>
                  )}
                />
                <Route path="/rezervacija/1" >
                {steps[1].component}
                </Route>
                <Route path="/rezervacija/2" >
                {steps[2].component}
                </Route>
                <Route path="/rezervacija/3" >
                {steps[3].component}
                </Route>
      
      
      
              </Switch>
              </div>
              </div>
              </div>
      </>
    );
  }
  

  
}