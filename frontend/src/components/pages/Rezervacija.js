import React, { Component } from 'react';
import '../../App.css';

import 'react-calendar/dist/Calendar.css';

import MultiStep from '../../components/react-multistep'


import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import StepFour from './StepFour'

const steps = [
  { component: <StepOne /> },
  { component: <StepTwo /> },
  { component: <StepThree /> },
  { component: <StepFour /> }
]

const prevStyle = {'background': '#33c3f0', 'border-width': '2px'}
const nextStyle = {'background': '#33c3f0',  'border-width': '2px'}
export default class Rezervacija extends Component{

  render(){
    return (
      <div className="step-one">
        
      <h1 className='rezervacija'>Rezervacija</h1>;
      <MultiStep steps={steps} prevStyle={prevStyle} nextStyle={nextStyle}/>
      
      
      </div>
    );
  }
  

  
}