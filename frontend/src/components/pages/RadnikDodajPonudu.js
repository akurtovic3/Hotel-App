import React, { Component } from 'react'

import NavbarRadnik from '../NavbarRadnik';
import './RadnikDodajPonudu.css'

import 'react-bootstrap'
import DatePicker from "react-datepicker";
import { Button } from 'react-bootstrap';
import {MdEmail} from 'react-icons/md'

import {FaCalendarDay} from 'react-icons/fa';

import {CgNotes} from 'react-icons/cg'
import CurrencyInput from 'react-currency-input-field';


class RadnikDodajPonudu extends Component{
    constructor(props) {
        super(props);
        this.state = {
          startDate: new Date(),
          endDate: new Date(),
          counter: 0,
          brSoba: 0,
          ime: '',
          opisPonude: '',
          cijenaPonude: 0,
          selectedFile: null,
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
        this.promijeniBrSoba = this.promijeniBrSoba.bind(this);
        this.promijeniIme = this.promijeniIme.bind(this);
        this.promijeniOpisPonude = this.promijeniOpisPonude.bind(this);
        this.promijeniCijenuPonude = this.promijeniCijenuPonude.bind(this);
        
        
      }
    
      provjeriUnos=()=>{if(this.state.ime!="" && this.state.email!="" && this.state.prezime!="" && this.state.brojTel!="") { this.setState(state => ({
        ...state,
        error:false
      })); return true;} else { this.setState(state => ({
        ...state,
        error:true
      })); return false;}}
      
      
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

      promijeniOpisPonude(e) {
        this.setState(state => ({
          ...state,
          opisPonude: e.target.value}))
          
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
      onChangeHandler=event=>{
        this.setState({
          selectedFile: event.target.files[0],
          loaded: 0,
        })
      }

      onClickHandler = () => {
        const data = new FormData() 
        data.append('file', this.state.selectedFile)
    }
    
    promijeniCijenuPonude( maskedvalue){
      this.setState({cijenaPonude: maskedvalue});
  }
    
    
      render() {
        return (
    <>
        <NavbarRadnik/>
        
        <div className="dodaj-rez-container">
        <h1 className="naslov">Dodaj specijalnu ponudu</h1>

          <div className="forme-dodaj-rez">
              
          <h2 className="naslov-zauzetost">Forma za rezervaciju</h2>
          
          <div className="speci">
    
            <p>Naziv specijalne ponude:</p>
             <input   size={20} placeholder='Naziv specijalne ponude'
            value={this.state.ime} onChange={(e) => { this.promijeniIme(e); this.provjeriUnos()} }/> 
          </div>
          
          

          <div className="speci">
          <div className="simbol"><CgNotes size={30}/></div>
            <p>Opis specijalne ponude:</p>
            <input    type="text"  size={60} placeholder='Navedite opis specijalne ponude' 
            value={this.state.opisPonude} onChange={this.promijeniOpisPonude} /> 
          </div>

          <div className="a-row">
            <div className="a-col-pola">
            <div className="simbol"><FaCalendarDay size={35}/></div>
          <p>Ponuda važi od datuma:</p>
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
            
              <p>Ponuda važi do datuma:</p>
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
          
          <div className="a-row">
          <div className="a-col-pola">
          <p>Broj soba koje ulaze u ponudu:</p>
          <div className="pom1"><input type="number" id="brSoba" name="brSoba"  min="1" max="20" value={this.state.brSoba}  onChange={this.promijeniBrSoba.bind(this)} style={{width: "50px"}} ></input></div>
          </div>
          <div className="a-col-pola">
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

            <div className="cijena-dio">
              
                <p>Cijena specijalne ponude:</p>
              <CurrencyInput  prefix="€" 
              defaultValue={this.state.cijenaPonude}
               onValueChange={this.promijeniCijenuPonude}/>
              

            </div>

            <div className="upload-dio">
                <p>Odaberite sliku koja će se prikazivati uz specijalnu ponudu </p>
                <input type="file" name="file"  accept="image/png, image/jpeg" onChange={this.onChangeHandler}/>
            <Button  variant="info" onClick={this.onClickHandler}>Upload</Button> 

            </div>
      
          <div className="dno">
            <button type="button" class="btn btn-info btn-lg btn-block">Dodaj specijalnu ponudu</button>
          </div>
         </div>
         
         

          
        </div>
        
        
        
    </>
        );
      }
    }

export default RadnikDodajPonudu;