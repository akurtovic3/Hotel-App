import React, {Component} from "react";
import RoomsContainer from "../../components/RoomsContainer";
import Axios from "axios"
import { Link, withRouter, useHistory, Route } from "react-router-dom";
import {FcCheckmark} from 'react-icons/fc'
import '../../components/pages/Rezervacija.css'
import Moment from "moment"
class Rooms extends Component{
  constructor(props) {
    super(props);
    this.state = {
      ...props.location.state.info,
      startDate: props.location.state.info.startDate ? new Date(props.location.state.info.startDate)  : new Date(),
      endDate: props.location.state.info.endDate ? new Date(props.location.state.info.endDate)  : new Date(),
      brOdraslih: props.location.state.info.brOdraslih ? props.location.state.info.brOdraslih  : 1,
      brDjece:props.location.state.info.brDjece ? props.location.state.info.brDjece  : 1,
      idSobe:-1,
      korak:2,
      dorucak: props.location.state.info.dorucak? props.location.state.info.dorucak  : false,
      rucak: props.location.state.info.rucak? props.location.state.info.rucak  : false,
      vecera: props.location.state.info.vecera? props.location.state.info.vecera  : false,
      spa: props.location.state.info.spa? props.location.state.info.spa  : false,
      bazen: props.location.state.info.bazen? props.location.state.info.bazen  : false,
      idovi:[]
    };
    this.handleChangeDorucak = this.handleChangeDorucak.bind(this);
    this.handleChangeRucak = this.handleChangeRucak.bind(this);
    this.handleChangeVecera = this.handleChangeVecera.bind(this);
    this.handleChangeSpa = this.handleChangeSpa.bind(this);
    this.handleChangeBazen = this.handleChangeBazen.bind(this);
    console.log(props);
    var niz;
    var idoviNiz=[];
    Axios.get("http://localhost:3001/raspoloziveSobe?start_date="+Moment(this.state.startDate).format('YYYY-MM-DD hh:mm:ss')+"&end_date="+Moment(this.state.endDate).format('YYYY-MM-DD hh:mm:ss')).then((result, fields)=>{
    //niz=new Array(result);
    //alert("successfully filtered rooms!");
    console.log(Moment(props.startDate).format('YYYY-MM-DD hh-mm-ss'));
    niz=result.data;
    console.log(niz)
    
    niz.forEach(item => {
      console.log(item)
      console.log(item.id_soba)
      idoviNiz.push(item.id_soba)
    });
    console.log(niz)
    console.log(idoviNiz)
    this.setState(state => ({
      ...state,
      idovi:idoviNiz,
    }))
  });
  console.log(this.state)
  }

  handleChangeDorucak(e) {
    this.setState(state => ({
      ...state,
      dorucak:!this.state.dorucak,
    }))
  }
  handleChangeRucak(e) {
    this.setState(state => ({
      ...state,
      rucak:!this.state.rucak,
    }))
  }
  handleChangeVecera(e) {
    this.setState(state => ({
      ...state,
      vecera:!this.state.vecera,
    }))
  }
  handleChangeSpa(e) {
    this.setState(state => ({
      ...state,
      spa:!this.state.spa,
    }))
  }
  handleChangeBazen(e) {
    this.setState(state => ({
      ...state,
      bazen:!this.state.bazen,
    }))
  }
  postaviKorak(indx) {
    this.setState(state => ({
      ...state,
      korak:indx,
    }))
  }
  sljKorak(){ this.postaviKorak(this.state.korak + 1); console.log(this.state.idSobe)}
  prethKorak(){ this.postaviKorak(this.state.korak > 0 ? this.state.korak -1 : this.state.korak)}
  promijeni=(broj)=>{this.idSobee=broj; console.log(broj); console.log(this.idSobee)}
  promijeniIdSobe=(broj) =>{this.setState(state => ({
    ...state,
    idSobe:broj
  }))
}
  render(){
  return (
    <> 
    <div className="header-step-2"> 
        <div className='multi-step-btns'>
        <button className="multi-step-btn-style-1" style={this.state.korak===1 ? {background:'#1E90FF'} : {background: 'silver'}}> <FcCheckmark/></button>
        <button className="linija" style={this.state.korak===1 ? {background:'#1E90FF'} : {background: 'silver'}}></button>
        <button className="linija" style={this.state.korak===2 ? {background:'#1E90FF'} : {background: 'silver'}}></button>
        <button className="multi-step-btn-style-2" style={this.state.korak===2 ? {background:'#1E90FF'} : {background: 'silver'}}>2</button>
        <button className="linija" style={this.state.korak===2 ? {background:'#1E90FF'} : {background: 'silver'}}></button >
        <button className="linija" style={this.state.korak===3 ? {background:'#1E90FF'} : {background: 'silver'}}></button>
        <button className="multi-step-btn-style-3" style={this.state.korak===3 ? {background:'#1E90FF'} : {background: 'silver'}}>3</button>
        <button className="linija" style={this.state.korak===3 ? {background:'#1E90FF'} : {background: 'silver'}}></button>
        <button className="linija" style={this.state.korak===4 ? {background:'#1E90FF'} : {background: 'silver'}}></button>
        <button className="multi-step-btn-style-4" style={this.state.korak===4 ? {background:'#1E90FF'} : {background: 'silver'}}>4</button>
        </div>
        <div className="podnaslovi">
        <p>Informacije o boravku</p>
        <p>Odabir sobe</p>   
        <p>Vaši lični podaci</p>
        <p>Pregled rezervacije</p>
        </div>
      </div>
      <div className="ponude-container">
      <div className="paragr">Izaberite dodatnu uslugu po želji:</div>
          <div className="ponude-select-group">
          
          <div className="selekcija-dorucka">
            <input
              type="checkbox"
              name="dorucak"
              defaultChecked={this.state.dorucak}
              onChange={this.handleChangeDorucak}
            />
            <label htmlFor="dorucak"> Doručak</label>
          </div>
          <div className="selekcija-rucka">
            <input
              type="checkbox"
              name="rucak"
              defaultChecked={this.state.rucak}
              onChange={this.handleChangeRucak}
            />
            <label htmlFor="rucak"> Ručak</label>
          </div>
          <div className="selekcija-vecera">
            <input
              type="checkbox"
              name="vecera"
              defaultChecked={this.state.vecera}
              onChange={this.handleChangeVecera}
            />
            <label htmlFor="vecera"> Večera</label>
          </div>
          <div className="selekcija-spa">
            <input
              type="checkbox"
              name="spa"
              defaultChecked={this.state.spa}
              onChange={this.handleChangeSpa}
            />
            <label htmlFor="spa"> Spa</label>
          </div>
          <div className="selekcija-bazen">
            <input
              type="checkbox"
              name="bazen"
              defaultChecked={this.state.bazen}
              onChange={this.handleChangeBazen}
            />
            <label htmlFor="bazen"> Bazen</label>
          </div>
          </div>
        </div>
          <div className="step-two-container">
            <RoomsContainer props={this.state} idovi={this.state.idovi} brGostiju={this.state.brDjece+this.state.brOdraslih}/>
          </div>
  <div>

          <div className="btn-povratak">
            <Route render={({ history}) => (
              <button className="btn-nastavak-povratak-style" 
                onClick={() =>{ //this.props.history.goBack
                history.push('/rezervacija/0', { info:this.state
                  
                });
               }}>
                Povratak
              </button>
            )}
          />
            </div>
          
    </div>
    </>
  );
  }
};

export default withRouter(Rooms);