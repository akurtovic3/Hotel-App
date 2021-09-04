
import React, { Component } from 'react'
import moment from 'moment'

import NavbarRadnik from '../NavbarRadnik'
import './RadnikPregledRez.css'

import DatePicker from "react-datepicker";

import Axios from "axios"
import {  Route, withRouter } from "react-router-dom";


const today = moment().format('YYYY-MM-DD')
class RadnikPregledSpecPon extends Component {
  constructor(props) {
    super(props);

    


    this.state = { 
      startDate: new Date(),
      endDate: new Date(),
      text1:"",
      mijenjanEndDate: false,
      info:props.location.state.info,
      brSobe: "", //Za pretraživanje broja sobe koja je spada u spec ponudu
      specPon: [] };

      var specPon = [];
      Axios.get("http://localhost:3001/pregledSpecijalnihPonuda").then((result, fields)=>{
        specPon=result.data;
        console.log(specPon)
        specPon.map((ponuda)=>{
          ponuda["sobeNaPopustu"]=ponuda.idoviSoba.split(',');
        })
        this.setState(state => ({
          ...state,
          specPon:specPon
        }))
      })
      this.handleChangeBrSobe = this.handleChangeBrSobe.bind(this);
      this.handleChangeText1 = this.handleChangeText1.bind(this);
      console.log(this.state.specPon)
}
Filtriraj=()=>{
  Axios.get("http://localhost:3001/filtrirajSpecijalnePonude?text1="+this.state.text1+"&start_date="+moment(this.state.startDate).format('YYYY-MM-DD')+"&end_date="+moment(this.state.endDate).format('YYYY-MM-DD')+"&mijenjanEndDate="+this.state.mijenjanEndDate).then((result, fields)=>{
    //     console.log(result.data)
    var rez=[];
    var sobe=[];
    var vrati=false;
    console.log(this.state.brSobe)
      result.data.map((spec)=>{
      sobe=spec.idoviSoba.split(',');
      console.log(sobe)
      sobe.map((s)=>{
        if(s===this.state.brSobe && this.state.brSobe!=="")
          vrati=true;
      })
      if(vrati) rez=[...rez, spec]
      vrati=false
    })
    
    console.log(rez)
    this.setState(state => ({
     ...state,
     specPon:rez
   }))
  })
}

handleChangeBrSobe(event) {
  this.setState(state =>({...state, brSobe: event.target.value}));

  
}
handleChangeText1(event) {
  this.setState(state => ({...state, text1: event.target.value}));
}
  provjeriJeLiPrazanNiz(){
    if(this.state.specPon.length!=0) return false;
    else return true;
  } 

  render () {
    return (
      <>
      <NavbarRadnik props={this.state.info}/>
      <div className="maincontainer">
      
       
        <h1 className="naslov">Pregled specijalnih ponuda</h1>

        <div className="filter">
        <h4 className="animation">Filteri</h4>
       
        <div className="filt-dio-1">
        <div className="rowe">
          <p style={{marginTop:"19px"}}>Specijalne ponude u vremenskom opsegu:</p>
            <div className="column"> 
            <p style={{marginTop:"19px", marginRight:"4px"}}>Od: </p>
            <DatePicker 
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
        
          <div className="column">
            <p style={{marginTop:"19px", marginRight:"4px"}}>Do:</p>
            <DatePicker 
                selected={this.state.endDate}
                selectsEnd
                startDate={this.state.startDate}
                endDate={this.state.startDate}
                minDate={this.state.startDate}
                onChange={date => this.setState(state => ({
                  ...state,
                  endDate: date,
                  
                  mijenjanEndDate:true
                }))}
              />
          </div>
          </div>
        </div>
        
        <div class="rowe-sp">
          <div class="column-sp">
          <p>Pretražite po nazivu specijalne ponude</p>
          <input type="text" name="name" style={{width: "200px"}} onInput={this.handleChangeText1.bind(this)}  placeholder="Naziv specijalne ponude"/>
            
          </div>
          
          <div class="column-sp">
          <p>Pretražite da li je soba uključena u neku ponudu</p>
            <input type="text" id="brSobe" name="brSobe"    onInput={this.handleChangeBrSobe.bind(this)} style={{width: "130px"}} placeholder="Broj sobe [1,12]"></input>
          </div>


        </div>
           <div class="rowe">
        <div class="column"> 
        <button type="button" style={{marginTop: "20px", marginBottom: "20px"}} class="btn btn-info btn-lg btn-block" onClick={this.Filtriraj.bind(this)}>Filtriraj</button>
        </div>
        </div> 
        </div>
        
        <div className="container-table">
        <h4 className="animation">Lista</h4>
        
        <table class="table table-hover"  >
          <thead>
            <tr align="center">
              <th>Naziv specijalne ponude</th>
              <th>Važi od</th>
              <th>Važi do</th>
              <th>Sobe u ponudi</th>
              <th>Veličina popusta [%]</th>
            </tr>
          </thead>
          <tbody>
          { this.provjeriJeLiPrazanNiz() && <h5 style={{padding:"20px", color:"black", textAlign:"center"}}>Nema specijalnih ponuda koje zadovoljavaju unesene kriterije.</h5>}
          {this.state.specPon.map((result) => {
            return (
             
                 <tr align="center">
                  <td>{result.text1}</td>
                  <td>{moment(result.startDatePonude).format('DD.MM.YYYY.')}</td>
                  <td>{moment(result.endDatePonude).format('DD.MM.YYYY.')}</td>
                  <td>{result.idoviSoba}  </td>
                  <td>{result.popust}</td>
                </tr>
             
            )
          })}
           
            
          </tbody>
        </table>
      
       
      </div>
      
      </div>
        
      </>
    );
  }
}

export default withRouter(RadnikPregledSpecPon)