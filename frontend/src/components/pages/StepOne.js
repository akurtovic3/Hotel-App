import React, { useState } from 'react'
import FlavorForm from '../../components/Forma'
import Kalendar from '../../components/Kalendar'
import '../../components/pages/StepOne.css'
import 'react-bootstrap'
export default () => {
  

  return (
    <div className="step-one-container">
        <div className="row">
            <p>Odaberite datum rezervacije:</p>
            <div className="col-sm-6">
                <p>
                <Kalendar/>
                </p>
            </div>
            <div className="col-sm-6">
                <p>
                <Kalendar/>
                </p>
            </div>
        </div>
        
        <div className="pick">
            <div className="columnPick">
                <p>Broj soba:</p>
                <FlavorForm/>
            </div>
            <div className="columnPick">
                <p>Broj osoba:</p>
                <FlavorForm/>
            </div>
            <div className="columnPick">
                <p>Broj djece:</p>
                <FlavorForm/>
            </div>
            
        </div>
       
       
    </div>
  )
}