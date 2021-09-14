import React, { Component } from 'react'

import Modal from 'react-modal';
import NavbarRadnik from '../NavbarRadnik';
import './RadnikDodajPonudu.css'
import moment from 'moment'
import 'react-bootstrap'
import DatePicker from "react-datepicker";
import { Button } from 'react-bootstrap';
import {MdEmail} from 'react-icons/md'
import Alert from "reactstrap/lib/Alert";
import {FaCalendarDay} from 'react-icons/fa';

import {CgNotes} from 'react-icons/cg'
import CurrencyInput from 'react-currency-input-field';
import Axios from "axios"
import {  Route, withRouter } from "react-router-dom";

class RadnikDodajPonudu extends Component{
    constructor(props) {
        super(props);
        this.state = {
          info:props.location.state.info,
          startDate: new Date(),
          endDate: moment(moment(new Date())).add(1, 'd')._d,
          counter: 0,
          brSoba: 0,
          ime: '',
          opisPonude: '',
          popust: 0,
          src:"",
          selectedFile: null,
          error:false,
          modal:false,
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
          ],

        };

        //this.provjeriUnos();
        this.promijeniBrSoba = this.promijeniBrSoba.bind(this);
        this.promijeniIme = this.promijeniIme.bind(this);
        this.promijeniOpisPonude = this.promijeniOpisPonude.bind(this);
        this.promijeniPopust = this.promijeniPopust.bind(this);
        
        
      }
    
      provjeriUnos=()=>{if(this.state.ime!="" && this.state.opisPonude!="" && this.state.popust!=0 && this.state.src!="" && this.state.counter==this.state.brSoba) { this.setState(state => ({
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
        if(this.state.error) this.provjeriUnos()
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
        this.setState(state=>({
          ...state,
          selectedFile: event.target.files[0],
          loaded: 0,
        }))
      }

      onClickHandler = () => {
        const data = new FormData() 
        data.append('file', this.state.selectedFile)
        Axios.post("http://localhost:3001/uploadSliku", data)
      .then(res => { // then print response status
        console.log(res)
        this.setState(state =>({...state, src:res.data}));
        if(this.state.error) this.provjeriUnos()
      })
    }
    hideModal = () => {
      this.setState(state => ({
        ...state,
        modal : false,
      }))
      
    }
    showModal2 = () => {
     
      this.setState(state => ({
        ...state,
        startDate: new Date(),
          endDate: new Date(),
          counter: 0,
          brSoba: 0,
          ime: '',
          opisPonude: '',
          popust: 0,
          src:"",
          selectedFile: null,
        modal: true,
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
        ],
      }))
    }
    promijeniPopust( maskedvalue){
      this.setState(state =>({...state, popust: maskedvalue}));
  }
    kreirajPonudu=()=>{
      if(this.provjeriUnos()){
      //  if(this.state.selectedFile!=null && this.state.src!=="")
      //  this.onClickHandler();
      var stringSobe="";
      var broji=0;
      this.state.listaSoba.map((soba)=>{
        if(soba.isChecked && broji<this.state.brSoba-1){ stringSobe=stringSobe+soba.id+","; broji=broji+1;}
        else if(soba.isChecked)  stringSobe=stringSobe+soba.id;
      })
      Axios.post("http://localhost:3001/kreirajSpecijalnuPonudu", 
          {
            
            idjeviSoba : stringSobe,
            startDatePonude : moment(this.state.startDate).format('YYYY-MM-DD'),
            endDatePonude : moment(this.state.endDate).format('YYYY-MM-DD'),
            text1 : this.state.ime,
            text2 : this.state.opisPonude,
            popust : this.state.popust,
            src:this.state.src
          }).then(()=>{
            //alert("successful insert!");
            this.showModal2();
          });
        }
    }
    
  componentDidMount() {
    window.scrollTo(0, 0)
  }
    
      render() {
        return (
    <>
        <NavbarRadnik props={this.state.info}/>
        
        <div className="dodaj-pon-container">

          <div className="forme-dodaj-rez">
              
          <h2 className="naslov-zauzetost">Forma za dodavanje specijalne ponude</h2>
          
          <div className="rowe">
    <div className="columne">
            <p style={{marginTop:"9px", marginRight:"3px"}}>*Naziv specijalne ponude:</p>
             <input  style={{marginBottom:"9px"}} size={20} placeholder='Naziv specijalne ponude'
            value={this.state.ime} onChange={(e) => { this.promijeniIme(e); if(this.state.error) this.provjeriUnos()} }/> </div>
          </div>
          
          

          <div className="rowe">
          <div className="columne">
          <div style={{marginBottom: "8px"}} className="simbol"><CgNotes size={30}/></div>
            <p style={{marginTop:"10px", marginRight:"3px"}}>*Opis specijalne ponude:</p>
            <input  style={{marginBottom:"5px",  minWidth:"fit-content"}}  type="text"  size={60} placeholder='Navedite opis specijalne ponude' 
            value={this.state.opisPonude} onChange={(e) => { this.promijeniOpisPonude(e); if(this.state.error) this.provjeriUnos()} } /> 
          </div></div>

          <div className="row">
            <div className="columne">
            <div className="simbol"><FaCalendarDay size={35}/></div>
          <p style={{marginTop:"29px"}}>*Ponuda važi od datuma:</p>
          <div className="pom">
            <DatePicker filterDate={d => {
              return new Date() <d;
                  }}
              selected={this.state.startDate}
              selectsStart
              startDate={this.state.startDate}
              endDate={this.state.endDate} 
              onChange={date => this.setState(state => ({
                startDate: date,
                endDate: this.state.endDate<=date ? moment(moment(new Date(date))).add(1, 'd')._d : this.state.endDate
              }))}
            />
            </div>
            </div>
            <div className="columne">
              <div style={{marginTop:"3px"}} className="simbol"> <FaCalendarDay size={35}/> </div>
            
              <p style={{marginTop:"29px"}}>*Ponuda važi do datuma:</p>
          <div className="pom">
          <DatePicker  filterDate={d => {
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
          <p style={{minWidth:"fit-content", maxWidth:"fit-content"}}>*Broj soba koje ulaze u ponudu:</p>
          <div className="pom1"><input type="number" id="brSoba" name="brSoba"  min="1" max="12" value={this.state.brSoba}  onChange={this.promijeniBrSoba.bind(this)} style={{width: "50px"}} ></input></div>
          </div>
          <div className="a-col-pola-sobe">
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
              
                <p style={{marginRight:"3px"}}> *Popust specijalne ponude:</p>
              <CurrencyInput  prefix="%" 
              defaultValue={this.state.popust}
               onValueChange={(e) => { this.promijeniPopust(e); if(this.state.error) this.provjeriUnos()} }/>
              

            </div>

            <div className="rowe">
                <p>*Odaberite sliku koja će se prikazivati uz specijalnu ponudu: </p>
                </div>
                <div className="rowe"> 
                <div className="columnc">
                <input type="file" id="files" name="file"  accept="image/png, image/jpeg, image/jpg" onChange={this.onChangeHandler}/></div>
                <div className="columnc"><Button  variant="info" onClick={this.onClickHandler}>Sačuvaj sliku za ovu ponudu</Button></div> 

            </div>
            <div>
          {this.state.error && <Alert color="danger" fade={false}>
            <p style={{color: "red", fontWeight: "bold", textAlign:"center"}}>Morate popuniti sva polja označena zvjezdicom!</p>
          </Alert>}
          </div>
          <div className="dno">
            <button type="button" onClick={this.kreirajPonudu.bind(this)} class="btn btn-info btn-lg btn-block">Dodaj specijalnu ponudu</button>
          </div>
         </div>
         
         <Modal
                    isOpen={this.state.modal}
                    onRequestClose={this.showModal2.bind(this)}
                    contentLabel="My dialog"
                    className="mymodal"
                     overlayClassName="myoverlay"
                    closeTimeoutMS={200}
                  >
                    

                      <h4>Specijalna ponuda uspješno dodana!</h4>
                      <div className="dugmad">
                      <Button variant="info" size="lg" onClick={this.hideModal.bind(this) }>Ok</Button>
                      </div>
                  </Modal>

          
          <p></p>
          <br></br>
        </div>
        
        
        
    </>
        );
      }
    }

export default withRouter(RadnikDodajPonudu);