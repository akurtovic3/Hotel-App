import React, { useState, Component } from 'react'

import NavbarRadnik from '../NavbarRadnik';
import './RadnikDodajRez.css'
import Scheduler from '../MjesecView'
import 'react-bootstrap'
import DatePicker from "react-datepicker";
import { Button } from 'react-bootstrap';
import {MdEmail} from 'react-icons/md'

import {FaCalendarDay, FaMobileAlt, FaUserEdit} from 'react-icons/fa';

import {MdChildCare,MdFace} from 'react-icons/md'
import {CgNotes} from 'react-icons/cg'


class RadnikDodajRez extends Component{
    constructor(props) {
        super(props);
        this.state = {
          startDate: new Date(),
          endDate: new Date(),
          brOdraslih: 1,
          brDjece: 0,
          counter: 0,
          brSoba: 0,
          ime: '',
          prezime:'',
          email:'',
          brojTel:'',
          specZahtj:'',
          listaSoba: [
            {id: 1, value: "Soba 1", isChecked: false},
            {id: 2, value: "Soba 2", isChecked: false},
            {id: 3, value: "Soba 3", isChecked: false},
            {id: 4, value: "Soba 4", isChecked: false},
            {id: 5, value: "Soba 5", isChecked: false},
            {id: 6, value: "Soba 6", isChecked: false},
            {id: 7, value: "Soba 7", isChecked: false},
            {id: 8, value: "Soba 8", isChecked: false},
            {id: 9, value: "Soba 9", isChecked: false},
            {id: 10, value: "Soba 10", isChecked: false},
            {id: 11, value: "Soba 11", isChecked: false},
            {id: 12, value: "Soba 12", isChecked: false},
            {id: 13, value: "Soba 13", isChecked: false},
            {id: 14, value: "Soba 14", isChecked: false},
            {id: 15, value: "Soba 15", isChecked: false},
            {id: 16, value: "Soba 16", isChecked: false},
            {id: 17, value: "Soba 17", isChecked: false},
            {id: 18, value: "Soba 18", isChecked: false},
            {id: 19, value: "Soba 19", isChecked: false},
            {id: 20, value: "Soba 20", isChecked: false},
          ],

        };

        this.provjeriUnos();
        this.promijeniBrOdraslih = this.promijeniBrOdraslih.bind(this);
        this.promijeniBrDjece = this.promijeniBrDjece.bind(this);
        this.promijeniBrSoba = this.promijeniBrSoba.bind(this);
        this.promijeniIme = this.promijeniIme.bind(this);
        this.promijeniPrezime = this.promijeniPrezime.bind(this);
        this.promijeniEmail = this.promijeniEmail.bind(this);
        this.promijeniBrojTel = this.promijeniBrojTel.bind(this);
        this.promijeniSpecZahtj = this.promijeniSpecZahtj.bind(this);
        
      }
    
      provjeriUnos=()=>{if(this.state.ime!="" && this.state.email!="" && this.state.prezime!="" && this.state.brojTel!="") { this.setState(state => ({
        ...state,
        error:false
      })); return true;} else { this.setState(state => ({
        ...state,
        error:true
      })); return false;}}
      promijeniBrOdraslih=(broj) =>{this.setState(state => ({
        ...state,
        brOdraslih: broj.target.value
      }))}
      promijeniBrDjece=(broj) =>{this.setState(state => ({
        ...state,
        brDjece: broj.target.value
      }))}
      promijeniBrSoba=(broj) =>{this.setState(state => ({
        ...state,
        brSoba: broj.target.value
      }))}

      promijeniIme(e) {
        this.setState(state => ({
          ...state,
          ime: e.target.value,
        }))
      }
      promijeniPrezime(e) {
        this.setState(state => ({
          ...state,
          prezime: e.target.value
        }))
        this.provjeriUnos()
      }
      promijeniEmail(e) {
        this.setState(state => ({
          ...state,
          email: e.target.value}))
          this.provjeriUnos()
      }
      promijeniBrojTel(e) {
        this.setState(state => ({
          ...state,
          brojTel: e.target.value}))
          this.provjeriUnos()
      }
      promijeniSpecZahtj(e) {
        this.setState(state => ({
          ...state,
          specZahtj: e.target.value}))
          this.provjeriUnos()
      }

      handleCheckChieldElement = (event) => {
        let listaSoba = this.state.listaSoba
        let counter = 0;
        listaSoba.forEach(soba => {
           if (soba.value === event.target.value)
              soba.isChecked =  event.target.checked
              
        })
       counter = this.state.listaSoba.filter(soba => soba.isChecked===true).length;
       
        console.log(this.state.brSoba)
        
        this.setState(state => ({
          ...state,
          listaSoba: listaSoba, counter: counter
        }))
      }

      uncheckAll = (event) => {
        let listaSoba = this.state.listaSoba
        let counter = 0;
        listaSoba.forEach(soba => {
           
              soba.isChecked =  false
              
        })
       counter = this.state.listaSoba.filter(soba => soba.isChecked===true).length;
       
        console.log(this.state.brSoba)
        
        this.setState(state => ({
          ...state,
          listaSoba: listaSoba, counter: counter
        }))
      }
      
    
    
      render() {
        return (
    <>
        <NavbarRadnik/>
        
        <div className="dodaj-rez-container">
        <h1 className="naslov">Dodaj rezervaciju</h1>
          <Scheduler/>

          <div className="forme-dodaj-rez">
          <h2 className="naslov-zauzetost">Forma za rezervaciju</h2>
          <div className="a-row">
            <div className="a-col-pola">
            <div className="simbol"><FaCalendarDay size={35}/></div>
          <p>Datum dolaska:</p>
          <div className="pom">
            <DatePicker filterDate={d => {
              return new Date() <d;
                  }}
              selected={this.state.startDate}
              selectsStart
              startDate={this.state.startDate}
              endDate={this.state.endDate} 
              onChange={date => this.setState(state => ({
                startDate: date
              }))}
            />
            </div>
            </div>
            <div className="a-col-pola">
              <div className="simbol"> <FaCalendarDay size={35}/> </div>
            
              <p>Datum odlaska:</p>
          <div className="pom">
          <DatePicker filterDate={d => {
              return new Date() < this.state.startDate;
                  }}
              selected={this.state.endDate}
              selectsEnd
              startDate={this.state.startDate}
              endDate={this.state.startDate}
              minDate={this.state.startDate}
              onChange={date => this.setState(state => ({
                endDate: date
              }))}
            />
            </div> 
            </div>
            </div>
          <div className="b-row">
          <div className="b-col-pola">
          <div className="simbol"><MdFace size={30}/></div>
            <p>Broj odraslih:</p>
            <div className="pom1"><input type="number" id="brOdraslih" name="brOdraslih"  min="1" max="6" value={this.state.brOdraslih} onInput={this.promijeniBrOdraslih.bind(this)} style={{width: "50px"}} ></input></div>
          </div>
          <div className="b-col-pola">
          <div className="simbol"><MdChildCare size={30}/></div>
          <p>Broj djece:</p>
          <div className="pom1"><input type="number" id="brDjece" name="brDjece"  min="1" max="6" value={this.state.brDjece}  onInput={this.promijeniBrDjece.bind(this)} style={{width: "50px"}} ></input></div>
          </div>
          </div>
          <div className="c-row">
          <div className="c-col-pola">
          <p>Broj rezerviranih soba:</p>
          <div className="pom1"><input type="number" id="brSoba" name="brSoba"  min="1" max="20" value={this.state.brSoba}  onChange={this.promijeniBrSoba.bind(this)} style={{width: "50px"}} ></input></div>
          </div>
          <div className="c-col-pola">
          <div className="c">
            {
              this.state.listaSoba.map((soba) => {
                return (
                  <>
                    
                     <input key={soba.id} onClick={this.handleCheckChieldElement} type="checkbox" checked={soba.isChecked} value={soba.value}  
                     disabled={this.state.counter+1>this.state.brSoba ? true : false} 
                     
                     /> {soba.value}                
                      
                </>
                )
                
              })
            }
          
            </div>
            
            </div>
            
            </div>
            <div className="c-row">
              <div className="c-col-pola-pom">
              
              </div>
              <div className="c-col-pola-pom">
                
              <Button  variant="outline-info" onClick={this.uncheckAll}>
                Poništi odabir sobe/a
              </Button>
              
              </div>
            </div>

          <div className="d-row">
          <div className="d-col-pola">
          <div className="simbol"><FaUserEdit size={20}/></div>
            <p>Ime:</p>
             <input    placeholder='Ime'
            value={this.state.ime} onChange={(e) => { this.promijeniIme(e); this.provjeriUnos()} }/> 
          </div>
          <div className="d-col-pola">
          <div className="simbol"><FaUserEdit size={20}/></div>
          <p>Prezime:</p>
         <input   placeholder='Prezime' 
            value={this.state.prezime} onChange={(e) => { this.promijeniPrezime(e); this.provjeriUnos()} } /> 
          </div>
          </div>
            
         <div className="d-row">
            <div className="d-col-pola">
            <div className="simbol"><MdEmail size={20}/></div>
            <p>E-mail:</p>
            <input    placeholder='E-mail' 
              value={this.state.email} onChange={(e) => { this.promijeniEmail(e); this.provjeriUnos()} } /> 
             
            </div>
            <div className="d-col-pola">
            <FaMobileAlt size={20}/>
            <p>Broj telefona:</p>
            <input     placeholder='Broj telefona' 
              value={this.state.brojTel} onChange={(e) => { this.promijeniBrojTel(e); this.provjeriUnos()} } /> 
            </div>
          </div> 
          <div className="speci">
            <CgNotes/>
            <p>Specijalni zahtjevi:</p>
            <input className="input-form2" type="text"  placeholder='Ukoliko klijent ima specijalne zahtjeve, napomene i slično, navedite ih ovdje.' 
            value={this.state.specZahtj} onChange={this.promijeniSpecZahtj} /> 
          </div>
          <div className="dno">
            <button type="button" class="btn btn-info btn-lg btn-block">Dodaj rezervaciju</button>
          </div>
         </div>
         
         

          
        </div>
        
        
        
    </>
        );
      }
    }

export default RadnikDodajRez;