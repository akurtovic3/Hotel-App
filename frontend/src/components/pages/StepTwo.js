import React, {Component} from "react";
import RoomsContainer from "../../components/RoomsContainer";
import Axios from "axios"
import { Link, withRouter, useHistory, Route } from "react-router-dom";
import {FcCheckmark} from 'react-icons/fc'
import '../../components/pages/Rezervacija.css'
import Moment from "moment"
import Navbar from '../Navbar';

class Rooms extends Component{
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      ...props.location.state.info,
      startDate: props.location.state.info.startDate ? new Date(props.location.state.info.startDate)  : new Date(),
      endDate: props.location.state.info.endDate ? new Date(props.location.state.info.endDate)  : new Date(),
      brOdraslih: props.location.state.info.brOdraslih ? props.location.state.info.brOdraslih  : 1,
      brDjece:props.location.state.info.brDjece ? props.location.state.info.brDjece  : 0,
      idSobe:-1,
      korak:2,
      dorucak: props.location.state.info.dorucak? props.location.state.info.dorucak  : false,
      rucak: props.location.state.info.rucak? props.location.state.info.rucak  : false,
      vecera: props.location.state.info.vecera? props.location.state.info.vecera  : false,
      spa: props.location.state.info.spa? props.location.state.info.spa  : false,
      bazen: props.location.state.info.bazen? props.location.state.info.bazen  : false,
      idovi:[],
      ponuda:props.location.state.ponuda,
      popust:props.location.state.ponuda ? props.location.state.popust : 0,
      period_poc: props.location.state.ponuda ? new Date(props.location.state.period_poc) : new Date(),
      period_kraj: props.location.state.ponuda ? new Date(props.location.state.period_kraj) : new Date(),
      idoviSobaPonude:props.location.state.ponuda ? props.location.state.idoviSobaPonude : []
    };
    this.handleChangeDorucak = this.handleChangeDorucak.bind(this);
    this.handleChangeRucak = this.handleChangeRucak.bind(this);
    this.handleChangeVecera = this.handleChangeVecera.bind(this);
    this.handleChangeSpa = this.handleChangeSpa.bind(this);
    this.handleChangeBazen = this.handleChangeBazen.bind(this);
    console.log(props);
    var niz;
    var idoviNiz=[];
    var sveSobeUBazi;
    var idoviPonude=[]
    if(this.state.ponuda)
     idoviPonude= this.state.idoviSobaPonude.split(',');
    var sveSobe=[1,2,3,4,5,6,7,8,9,10,11,12];
    var count;
    var soba;
    Axios.get("http://localhost:3001/raspoloziveSobe?start_date="+Moment(this.state.startDate).format('YYYY-MM-DD hh:mm:ss')+"&end_date="+Moment(this.state.endDate).format('YYYY-MM-DD hh:mm:ss')).then((result, fields)=>{
  
    console.log(Moment(props.startDate).format('YYYY-MM-DD hh-mm-ss'));
    niz=result.data;
    //console.log("sobe raspolozive od starta do enda")
    //console.log(niz)
    var broji=0;
    sveSobe.map((id)=>{
      niz.forEach(item => {
        if(item.id_soba===id) broji=broji+1;
       
      });
      if(broji>0)  idoviNiz.push(id);
      broji=0;
    })
    
    console.log(niz)
    console.log("sobe raspolozive od starta do enda")
    console.log(idoviNiz)
  });
  Axios.get("http://localhost:3001/sveSobeUnutarBaze").then((result, fields)=>{
    //niz=new Array(result);
    //alert("successfully filtered rooms!");
    
      sveSobeUBazi=result.data;
      console.log("sve sobe u bazi")
      console.log(sveSobeUBazi)
    
      sveSobe.forEach(id => {
        count=0;
        sveSobeUBazi.forEach(item1 => {
          if(item1.id_soba==id) count=count+1;
        });
       
        if(count==0)
            idoviNiz.push(id)
        
        }); 
        var finalni_niz=[];
        if(this.state.ponuda){
          idoviPonude.map((id)=>{
            idoviNiz.forEach(item1 => {
            //  console.log(item1 + " "+ id + " " ); console.log(item1==id);
              if(item1==id) finalni_niz.push(item1);
            });
            
          });
          console.log("idovi sa onim kojih nema u bazi i filtrirano po ponudi")
          console.log(finalni_niz)
          this.setState(state => ({
            ...state,
            idovi:finalni_niz,
          }))
        }
        else{
          console.log("finalni idovi sa onim kojih nema u bazi ")
          console.log(idoviNiz)
          this.setState(state => ({
            ...state,
            idovi:idoviNiz,
          }))
        
        }
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
  promijeni=(broj)=>{this.setState(state => ({
    ...state,
    idSobe:broj,
  })) ; console.log(this.idSobee)}
  promijeniIdSobe=(broj) =>{this.setState(state => ({
    ...state,
    idSobe:broj
  }))
}
  render(){
  return (
    <> 
    <Navbar/>
    <div className="header-step-2"> 
        <div className='multi-step-btns'>
        <button className="multi-step-btn-style-1" style={this.state.korak===1 ? {background:'#1E90FF', paddingTop:"2px"} : {background: 'silver', paddingTop:"2px"}}> <FcCheckmark/></button>
        <button className="linija" style={this.state.korak===1 ? {background:'#1E90FF', paddingTop:"5px"} : {background: 'silver', paddingTop:"5px"}}></button>
        <button className="linija" style={this.state.korak===2 ? {background:'#1E90FF', paddingTop:"5px"} : {background: 'silver', paddingTop:"5px"}}></button>
        <button className="multi-step-btn-style-2" style={this.state.korak===2 ? {background:'#1E90FF', paddingTop:"5px"} : {background: 'silver', paddingTop:"5px"}}>2</button>
        <button className="linija" style={this.state.korak===2 ? {background:'#1E90FF', paddingTop:"5px"} : {background: 'silver', paddingTop:"5px"}}></button >
        <button className="linija" style={this.state.korak===3 ? {background:'#1E90FF', paddingTop:"5px"} : {background: 'silver', paddingTop:"5px"}}></button>
        <button className="multi-step-btn-style-3" style={this.state.korak===3 ? {background:'#1E90FF', paddingTop:"5px"} : {background: 'silver', paddingTop:"5px"}}>3</button>
        <button className="linija" style={this.state.korak===3 ? {background:'#1E90FF', paddingTop:"5px"} : {background: 'silver', paddingTop:"5px"}}></button>
        <button className="linija" style={this.state.korak===4 ? {background:'#1E90FF', paddingTop:"5px"} : {background: 'silver', paddingTop:"5px"}}></button>
        <button className="multi-step-btn-style-4" style={this.state.korak===4 ? {background:'#1E90FF', paddingTop:"5px"} : {background: 'silver', paddingTop:"5px"}}>4</button>
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
                history.push('/rezervacija/0', { info:this.state,
                  ponuda: this.state.ponuda,
                  popust: this.state.popust,
                  period_poc: this.state.period_poc,
                  period_kraj: this.state.period_kraj,
                  idoviSobaPonude: this.state.idoviSobaPonude
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