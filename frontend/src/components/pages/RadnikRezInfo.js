import React, { useState, Component } from 'react'

import Modal from 'react-modal';

import Alert from "reactstrap/lib/Alert";
import NavbarRadnik from '../NavbarRadnik';
import './RadnikRezInfo.css'
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

class RadnikRezInfo extends Component{
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
          stari_state:props.location.state.stari_state,
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
          soba:props.location.state.soba,
          modal:false,
          id_sobe: props.location.state.rezervacija.id_soba,
          info:props.location.state.info,
          rezervacija:props.location.state.rezervacija,
          mijenjanEndDate: false,
          prvi:true,
          id_korisnik:props.location.state.rezervacija.id_korisnik,
        opis_cijena:props.location.state.rezervacija.popust? "(SA URAČUNATIM POPUSTOM: "+props.location.state.rezervacija.popust.toString()+"%)" : ""
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
 
       
      }
      povratak = () => {
        this.props.history.push('/radnik/pregled-rezervacija', {info:this.state.info, stari_state:this.state.stari_state});
      }
      
  componentDidMount() {
    window.scrollTo(0, 0)
  }
    
      render() {
        return (
    <>
        <NavbarRadnik props={this.state.info}/>
        
        <div className="rez-info-container">


          <div className="forme-dodaj-rez">
          <h2 className="naslov-zauzetost">Forma za pregled rezervacije</h2>
          <div className="rowe">
            <div className="column">
            <div className="simbol"><FaCalendarDay size={35}/></div>
        <p style={{marginTop:"15px"}}><b>Datum dolaska:</b> {moment(this.state.startDate).format('DD.MM.YYYY.')}</p>
          
            </div>
            <div className="column">
              <div className="simbol"> <FaCalendarDay size={35}/> </div>
            
              <p style={{marginTop:"15px"}}><b>Datum odlaska:</b> {moment(this.state.endDate).format('DD.MM.YYYY.')}</p>
          
            </div>
            </div>
            <hr></hr>
          <div className="b-row">
          <div className="b-col-pola">
          <div className="simbol"><MdFace size={30}/></div>
            <p><b>Broj odraslih:</b> </p>
            <div className="pom1"><input type="number" id="brOdraslih" disabled={true} name="brOdraslih"  min="1" max="6" value={this.state.brOdraslih} style={{width: "50px", marginBottom:"15px"}} ></input></div>
          </div>
          <div className="b-col-pola">
          <div className="simbol"><MdChildCare size={30}/></div>
          <p><b>Broj djece:</b> </p>
          <div className="pom1"><input type="number" id="brDjece" name="brDjece" disabled={true} min="1" max="6" value={this.state.brDjece} style={{width: "50px", marginBottom:"15px"}} ></input></div>
          </div>
          </div>
          <hr></hr>
          <div className="rowe">
          <p style={{ textAlign:"center"}}><b>Soba: </b>{this.state.soba} - Soba {this.state.id_sobe}</p>
         {/* <div className="c-col-pola">
          <p>Broj rezerviranih soba:</p>
          <div className="pom1"><input type="number" id="brSoba" name="brSoba"  min="1" max="20" value={this.state.brSoba}  onChange={this.promijeniBrSoba.bind(this)} style={{width: "50px"}} ></input></div>
            </div>
          <div className="c-col-pola">*/}
         
           
            </div>
            <hr></hr>
           
            <div className="rowe">
        
          
        <div className="columnc">  <input key="dor" style={{minWidth: "5px", maxWidth: "13px"}} disabled={true}  type="checkbox" checked={this.state.dorucak} value="dorucak"  /> dorucak  </div>       
                    <div className="columnc">  <input key="ruc" style={{minWidth: "5px", maxWidth: "13px"}} disabled={true}  type="checkbox" checked={this.state.rucak} value="rucak"  /> rucak  </div> 
                    <div className="columnc">  <input key="vec" style={{minWidth: "5px", maxWidth: "13px"}} disabled={true} type="checkbox" checked={this.state.vecera} value="vecera"  /> vecera </div> 
                    <div className="columnc">  <input key="spa" style={{minWidth: "5px", maxWidth: "13px"}} disabled={true}  type="checkbox" checked={this.state.spa} value="spa"  /> spa  </div> 
                    <div className="columnc">  <input key="baz" style={{minWidth: "5px", maxWidth: "13px"}} disabled={true}  type="checkbox" checked={this.state.bazen} value="bazen"  /> bazen </div>                  
                                  
                     
                      
                    
                     
          
            
            
            
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
          <div className="rowe">
          <div className="column">
          <div className="simbol"><FaUserEdit size={20}/></div>
            <p style={{marginTop:"15px"}}><b>Ime:</b> {this.state.ime}</p>
          </div>
          <div className="column">
          <div className="simbol"><FaUserEdit size={20}/></div>
        <p style={{marginTop:"15px"}}><b>Prezime:</b> {this.state.prezime}</p>
        
          </div>
          </div>
            
         <div className="rowe">
            <div className="column">
            <div className="simbol"><MdEmail size={20}/></div>
            <p style={{marginTop:"15px"}}><b>E-mail:</b> {this.state.email}</p>
            
            </div>
            <div className="column">
            <FaMobileAlt size={20}/>
            <p style={{marginTop:"15px"}}><b>Broj telefona:</b> {this.state.brojTel} </p>
           
            </div>
          </div> 
          <hr></hr>

          <div className="rowe">
              <div className="column">
              <div className="simbol"><CgNotes/></div>
             <p style={{paddingTop: "15px"}}><b>Specijalni zahtjevi:</b>  </p>
             </div>
          </div>
          <div className="rowe">
              <div className="columne">
              <p> {this.state.specZahtj?this.state.specZahtj : "nema specijalnih zahtjeva"} </p>
             </div>
          </div>
          <hr></hr>
          <div className="rowe">
          <div className="column">
        <h4 style={{fontWeight:"bold"}}>Cijena: {this.state.cijena} € </h4>
          </div> </div>
          <div className="rowe">
          <div className="columne">
        <h5 >{this.state.opis_cijena}</h5>
          </div> </div>
          <div className="dno">
            <button type="button" class="btn btn-info btn-lg btn-block" onClick={() =>{ 
              this.povratak();
              }}>Povratak</button>
          </div>
        </div>
        
        <br></br>  
        <br></br>  
        </div>
        
    </>
        );
      }
    }

export default withRouter(RadnikRezInfo);