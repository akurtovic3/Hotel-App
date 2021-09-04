import React, { useState, Component } from 'react'

import Modal from 'react-modal';

import Alert from "reactstrap/lib/Alert";
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
import Axios from "axios"
import {  Route, withRouter } from "react-router-dom";
import moment from 'moment'

class RadnikAzurirajRez extends Component{
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
          startDate: new Date(props.location.state.rezervacija.start_date),
          endDate: new Date(props.location.state.rezervacija.end_Date),
          pocetniDatum: new Date(props.location.state.rezervacija.start_date),
          krajnjiDatum: new Date(props.location.state.rezervacija.end_Date),
          pocetnaSoba:props.location.state.rezervacija.id_soba,
          brOdraslih: props.location.state.rezervacija.br_odraslih,
          brDjece: props.location.state.rezervacija.br_djece,
          counter: 0,
          brSoba: 1,
          ime: '',
          prezime:'',
          email:'',
          brojTel:'',
          error:false,
          specZahtj:props.location.state.rezervacija.specijalni_zahtjevi,
          dorucak:props.location.state.rezervacija.dorucak,
          rucak:props.location.state.rezervacija.rucak,
          vecera:props.location.state.rezervacija.vecera,
          spa:props.location.state.rezervacija.spa,
          bazen:props.location.state.rezervacija.bazen,
          cijena:props.location.state.rezervacija.cijena,
          modal:false,
          id_sobe: props.location.state.rezervacija.id_soba,
          info:props.location.state.info,
          rezervacija:props.location.state.rezervacija,
          mijenjanEndDate: false,
          prvi:true,
          id_korisnik:props.location.state.rezervacija.id_korisnik,
          listaSoba: [
            {id: 1, value: "Soba 1", isChecked: false, capacity:1, reserved: false},
            {id: 2, value: "Soba 2", isChecked: false, capacity:1, reserved: false},
            {id: 3, value: "Soba 3", isChecked: false, capacity:2, reserved: false},
            {id: 4, value: "Soba 4", isChecked: false, capacity:3, reserved: false},
            {id: 5, value: "Soba 5", isChecked: false, capacity:4, reserved: false},
            {id: 6, value: "Soba 6", isChecked: false, capacity:3, reserved: false},
            {id: 7, value: "Soba 7", isChecked: false, capacity:1, reserved: false},
            {id: 8, value: "Soba 8", isChecked: false, capacity:2, reserved: false},
            {id: 9, value: "Soba 9", isChecked: false, capacity:3, reserved: false},
            {id: 10, value: "Soba 10", isChecked: false, capacity:4, reserved: false},
            {id: 11, value: "Soba 11", isChecked: false, capacity:5, reserved: false},
            {id: 12, value: "Soba 12", isChecked: false, capacity:6, reserved: false},
          ],
          listaSoba0: [
            {id: 1, value: "Soba 1", isChecked: false, capacity:1, reserved: false},
            {id: 2, value: "Soba 2", isChecked: false, capacity:1, reserved: false},
            {id: 3, value: "Soba 3", isChecked: false, capacity:2, reserved: false},
            {id: 4, value: "Soba 4", isChecked: false, capacity:3, reserved: false},
            {id: 5, value: "Soba 5", isChecked: false, capacity:4, reserved: false},
            {id: 6, value: "Soba 6", isChecked: false, capacity:3, reserved: false},
            {id: 7, value: "Soba 7", isChecked: false, capacity:1, reserved: false},
            {id: 8, value: "Soba 8", isChecked: false, capacity:2, reserved: false},
            {id: 9, value: "Soba 9", isChecked: false, capacity:3, reserved: false},
            {id: 10, value: "Soba 10", isChecked: false, capacity:4, reserved: false},
            {id: 11, value: "Soba 11", isChecked: false, capacity:5, reserved: false},
            {id: 12, value: "Soba 12", isChecked: false, capacity:6, reserved: false},
          ],

        };
        Axios.get("http://localhost:3001/korisnik?id="+this.state.id_korisnik).then((result, fields)=>{
 //     console.log(result.data)
 
 this.setState(state => ({
  ...state,
 //rezerv[i]["ime"]=result.data[0].ime;
 //rezerv[i]["prezime"]=result.data[0].prezime;
  ime:result.data[0].ime,
  prezime:result.data[0].prezime,
  email: result.data[0].email,
  brojTel: result.data[0].br_tel
}))

  })
  this.provjeriZauzetostSoba();
  /*let lista=this.state.listaSoba;
        this.state.listaSoba.map((soba, i)=>{
          if(soba.id===this.state.id_sobe) 
            lista[i].isChecked=true;
        })
        this.setState(state => ({
          ...state,
         //rezerv[i]["ime"]=result.data[0].ime;
         //rezerv[i]["prezime"]=result.data[0].prezime;
          listaSoba:lista
        }))*/
        this.provjeriUnos();
        this.promijeniBrOdraslih = this.promijeniBrOdraslih.bind(this);
        this.promijeniBrDjece = this.promijeniBrDjece.bind(this);
        this.promijeniBrSoba = this.promijeniBrSoba.bind(this);
        this.promijeniIme = this.promijeniIme.bind(this);
        this.promijeniPrezime = this.promijeniPrezime.bind(this);
        this.promijeniEmail = this.promijeniEmail.bind(this);
        this.promijeniBrojTel = this.promijeniBrojTel.bind(this);
        this.promijeniSpecZahtj = this.promijeniSpecZahtj.bind(this);
        this.promijeniBazen=this.promijeniBazen.bind(this);
        this.promijeniSpa=this.promijeniSpa.bind(this);
        this.promijeniDorucak=this.promijeniDorucak.bind(this);
        this.promijeniRucak=this.promijeniRucak.bind(this);
        this.promijeniVeceru=this.promijeniVeceru.bind(this);
        
        this.hideModal=this.hideModal.bind(this);
        this.showModal2=this.showModal2.bind(this);
      }
      provjeriZauzetostSoba=()=>{
       

        Axios.get("http://localhost:3001/zauzeteSobe?start_date="+moment(this.state.startDate).format('YYYY-MM-DD')+"&end_date="+moment(this.state.endDate).format('YYYY-MM-DD')+"&mijenjanEndDate="+this.state.mijenjanEndDate).then((res, fields)=>{
            var rez=res.data;
            let items = [...this.state.listaSoba0];
            console.log("zauzete")
            console.log(rez)
            rez.map((rezervacija)=> {
             console.log(rezervacija.id_soba)
             if(rezervacija.id_soba==12){
               console.log(this.state.pocetnaSoba)
               console.log(moment(this.state.startDate).format('YYYY-MM-DD')===moment(this.state.pocetniDatum).format('YYYY-MM-DD'))
               console.log(moment(this.state.endDate).format('YYYY-MM-DD')===moment(this.state.krajnjiDatum).format('YYYY-MM-DD'))
             }
              // 2. Make a shallow copy of the item you want to mutate
              if(rezervacija.id_soba===this.state.pocetnaSoba && moment(this.state.startDate).format('YYYY-MM-DD')===moment(this.state.pocetniDatum).format('YYYY-MM-DD') && moment(this.state.endDate).format('YYYY-MM-DD')===moment(this.state.krajnjiDatum).format('YYYY-MM-DD')){
                items[rezervacija.id_soba-1].reserved = false;
                if(this.state.prvi){ items[rezervacija.id_soba-1].isChecked = true; 
                  this.setState(state => ({
                    ...state,
                    prvi:false
                  }));
                }
                console.log("uspjesno")
              }
              else if (rezervacija.id_soba<13)
              items[rezervacija.id_soba-1].reserved = true;
              // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
              // 5. Set the state to our new copy
              
          })
         
            this.setState(state => ({
            ...state,
            listaSoba:items
          }));
        });
      }
      hideModal = () => {
        this.setState(state => ({
          ...state,
          modal : false,
        }))
        this.props.history.push('/radnik/pregled-rezervacija', {info:this.state.info});
      }
      showModal2 = () => {
        
        this.setState(state => ({
          ...state,
          modal: true
        }))
        
      }
      azurirajRezervaciju=()=>{
        if(this.provjeriUnos()){
        Axios.put("http://localhost:3001/azurirajNeregistrovanogKorisnika", 
          {
            id: this.state.id_korisnik,
            ime: this.state.ime,
            prezime: this.state.prezime,
            email:this.state.email,
            br_tel:this.state.brojTel
          }).then((result)=>{

            Axios.put("http://localhost:3001/azurirajRezervaciju", 
          {
            id:this.state.rezervacija.id_rezervacije,
            id_korisnik : this.state.rezervacija.id_korisnik,
            id_soba : this.state.id_sobe,
            start_date : this.state.startDate,
            end_date : this.state.endDate,
            br_djece : this.state.brDjece,
            br_odraslih : this.state.brOdraslih,
            dorucak : this.state.dorucak,
            rucak : this.state.rucak,
            vecera : this.state.vecera,
            spa : this.state.spa,
            bazen : this.state.bazen,
            cijena : this.state.cijena
          }).then(()=>{
            this.showModal2();
            
            //alert("successful insert!");
          });
            
  });
  //console.log(id_korisnik)
  
  
  console.log("izaslo")}
}
provjeriJeLiOznacenaSoba(){
  var jest=false;
  this.state.listaSoba.map((soba)=>{
    if(soba.isChecked) jest=true;
  })
  return jest;
  
}
      provjeriUnos=()=>{if(this.state.ime!="" && this.state.email!="" && this.state.prezime!="" && this.state.brojTel!="" && this.provjeriJeLiOznacenaSoba()) { this.setState(state => ({
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

      promijeniIme(e){
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
      promijeniDorucak(e) {
        this.setState(state => ({
          ...state,
          dorucak: e.target.checked}))
          this.provjeriUnos()
      }
      promijeniRucak(e) {
        this.setState(state => ({
          ...state,
          rucak: e.target.checked}))
          this.provjeriUnos()
      }
      promijeniVeceru(e) {
        this.setState(state => ({
          ...state,
          vecera: e.target.checked}))
          this.provjeriUnos()
      }
      promijeniSpa(e) {
        this.setState(state => ({
          ...state,
          spa: e.target.checked}))
          this.provjeriUnos()
      }
      promijeniBazen(e) {
        this.setState(state => ({
          ...state,
          bazen: e.target.checked}))
          this.provjeriUnos()
      }
      handleCheckChieldElement = (event) => {
        let listaSoba = this.state.listaSoba
        let counter = 0;
        listaSoba.forEach(soba => {
           if (soba.value === event.target.value){
              soba.isChecked =  event.target.checked;
              counter=soba.id;
              console.log("unesena soba "+counter)
           }
          else if(soba.value !== event.target.value)
              soba.isChecked=false
        })
       //counter = this.state.listaSoba.filter(soba => soba.isChecked===true).length;
       
        console.log(this.state.brSoba)
        
        this.setState(state => ({
          ...state,
          listaSoba: listaSoba, id_sobe: counter
        }))
        console.log("unesena soba "+this.state.id_sobe)
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
        <NavbarRadnik props={this.state.info}/>
        
        <div className="dodaj-rez-container">


          <div className="forme-dodaj-rez">
          <h2 className="naslov-zauzetost">Forma za ažuriranje rezervacije</h2>
          <div className="a-row">
            <div className="a-col-pola">
            <div className="simbol"><FaCalendarDay size={35}/></div>
          <p>Datum dolaska: </p>
          <div className="pom">
            <DatePicker filterDate={d => {
              return new Date() <d;
                  }}
              selected={this.state.startDate}
              selectsStart
              startDate={this.state.startDate}
              endDate={this.state.endDate} 
              onChange={date => this.setState(state => ({
                ...state,
                startDate: date
              }))}
            />
            </div>
            </div>
            <div className="a-col-pola">
              <div className="simbol"> <FaCalendarDay size={35}/> </div>
            
              <p>Datum odlaska: </p>
          <div className="pom">
          <DatePicker filterDate={d => {
              return new Date() < this.state.startDate;
                  }}
              selected={this.state.endDate}
              selectsEnd
              startDate={this.state.startDate}
              endDate={this.state.startDate}
              minDate={this.state.startDate}
              onChange={date =>{ this.setState(state => ({
                ...state,
                endDate: date
              }));
              this.provjeriZauzetostSoba();
              }}
            />
            </div> 
            </div>
            </div>
            <hr></hr>
          <div className="b-row">
          <div className="b-col-pola">
          <div className="simbol"><MdFace size={30}/></div>
            <p>Broj odraslih: </p>
            <div className="pom1"><input type="number" id="brOdraslih" name="brOdraslih"  min="1" max="6" value={this.state.brOdraslih} onInput={this.promijeniBrOdraslih.bind(this)} style={{width: "50px"}} ></input></div>
          </div>
          <div className="b-col-pola">
          <div className="simbol"><MdChildCare size={30}/></div>
          <p>Broj djece: </p>
          <div className="pom1"><input type="number" id="brDjece" name="brDjece"  min="1" max="6" value={this.state.brDjece}  onInput={this.promijeniBrDjece.bind(this)} style={{width: "50px"}} ></input></div>
          </div>
          </div>
          <hr></hr>
          <div className="c-row">
          <p style={{ textAlign:"center"}}>*Izaberite sobu:</p>
         {/* <div className="c-col-pola">
          <p>Broj rezerviranih soba:</p>
          <div className="pom1"><input type="number" id="brSoba" name="brSoba"  min="1" max="20" value={this.state.brSoba}  onChange={this.promijeniBrSoba.bind(this)} style={{width: "50px"}} ></input></div>
            </div>
          <div className="c-col-pola">*/}
          <div className="c">
            {
              this.state.listaSoba.map((soba) => {
                if(this.state.brDjece+this.state.brOdraslih<=soba.capacity && !soba.reserved)
                return (
                  <>
                    
                     <input key={soba.id} onClick={this.handleCheckChieldElement} type="checkbox" checked={soba.isChecked} value={soba.value}  /> {soba.value}                
                      
                </>
                )
                
              })
            }
          
            
            
            </div>
           
            </div>
            <hr></hr>
           
            <div className="rowe">
        
          
                    <div className="column">  <input key="dor" onClick={this.promijeniDorucak} type="checkbox" checked={this.state.dorucak} value="dorucak"  /> dorucak  </div>       
                    <div className="column">  <input key="ruc" onClick={this.promijeniRucak} type="checkbox" checked={this.state.rucak} value="rucak"  /> rucak  </div> 
                    <div className="column">  <input key="vec" onClick={this.promijeniVeceru} type="checkbox" checked={this.state.vecera} value="vecera"  /> vecera </div> 
                    <div className="column">  <input key="spa" onClick={this.promijeniSpa} type="checkbox" checked={this.state.spa} value="spa"  /> spa  </div> 
                    <div className="column">  <input key="baz" onClick={this.promijeniBazen} type="checkbox" checked={this.state.bazen} value="bazen"  /> bazen </div>                  
                                  
                     
                      
                    
                     
          
            
            
            
            </div>
          {/* <div className="c-row">
              <div className="c-col-pola-pom">
              
              </div>
              <div className="c-col-pola-pom">
                
              <Button  variant="outline-info" onClick={this.uncheckAll}>
                Poništi odabir sobe/a
              </Button>
              
              </div>
          </div>*/}
<hr></hr>
          <div className="d-row">
          <div className="d-col-pola">
          <div className="simbol"><FaUserEdit size={20}/></div>
            <p>*Ime: </p>
             <input    placeholder='Ime'style={{marginLeft:"5px"}}
            value={this.state.ime} onChange={(e) => { this.promijeniIme(e); this.provjeriUnos()} }/> 
          </div>
          <div className="d-col-pola">
          <div className="simbol"><FaUserEdit size={20}/></div>
          <p>*Prezime: </p>
         <input   placeholder='Prezime' style={{marginLeft:"5px"}}
            value={this.state.prezime} onChange={(e) => { this.promijeniPrezime(e); this.provjeriUnos()} } /> 
          </div>
          </div>
            
         <div className="d-row">
            <div className="d-col-pola">
            <div className="simbol"><MdEmail size={20}/></div>
            <p>*E-mail: </p>
            <input    placeholder='E-mail' style={{marginLeft:"5px"}}
              value={this.state.email} onChange={(e) => { this.promijeniEmail(e); this.provjeriUnos()} } /> 
             
            </div>
            <div className="d-col-pola">
            <FaMobileAlt size={20}/>
            <p>*Broj telefona:  </p>
            <input     placeholder='Broj telefona' style={{marginLeft:"3px"}}
              value={this.state.brojTel} onChange={(e) => { this.promijeniBrojTel(e); this.provjeriUnos()} } /> 
            </div>
          </div> 
          <hr></hr>

          <div className="spec">
            <CgNotes/> <p style={{paddingTop: "15px"}}>Specijalni zahtjevi:  </p>
            <input className="input-form2" type="text"  placeholder='Ukoliko klijent ima specijalne zahtjeve, napomene i slično, navedite ih ovdje.' 
            value={this.state.specZahtj} onChange={this.promijeniSpecZahtj} /> 
          </div>
          <div>
          {this.state.error && <Alert color="danger" fade={false}>
            <p style={{color: "red", fontWeight: "bold", textAlign:"center"}}>Polja označena zvjezdicom ne smiju biti prazna!</p>
          </Alert>}
          </div>
          <div className="dno">
            <button type="button" class="btn btn-info btn-lg btn-block" onClick={() =>{ 
              this.azurirajRezervaciju();
              }}>Ažuriraj rezervaciju</button>
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
                    

                      <h4>Rezervacija uspjesno ažurirana!</h4>
                      <div className="dugmad">
                      <Button variant="info" size="lg" onClick={this.hideModal.bind(this) }>Ok</Button>
                      </div>
                  </Modal>
                  

          
        </div>
        <div>   </div>
        <p> </p>
        <p>  </p>
        <p> </p>
        <p>  </p>
    </>
        );
      }
    }

export default withRouter(RadnikAzurirajRez);