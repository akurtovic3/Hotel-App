import React, { useState } from 'react'
import FlavorForm from '../../components/Forma'
import Kalendar from '../../components/Kalendar'
import Datum2 from '../../components/Datum2'
import '../../components/pages/Rezervacija.css'

import 'react-bootstrap'
import { Fragment } from 'react'


export default () => {
  return (
    <Fragment>
    
    <div className="step-one-container">
        <div className="row-s1">
                <Datum2/>
        </div>
        
        <div className="pick">
        
            <div className="columnPick">
            <i class="fas fa-bed"></i>
                <p>Broj soba:</p>
                <FlavorForm/>
            </div>
            <div className="columnPick">
            <i class="far fa-user"></i>
                <p>Broj odraslih:</p>
                <FlavorForm/>
            </div>
            <div className="columnPick">
            <i class="fas fa-baby"></i>
                <p>Broj djece:</p>
                <FlavorForm/>
            </div>
            
        </div>
    </div>
    </Fragment>
  )
}