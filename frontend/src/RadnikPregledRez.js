import { InfoCircleOutlined } from '@ant-design/icons'
import React, { Component } from 'react'
import moment from 'moment'
import NavbarRadnik from './components/NavbarRadnik'
import './components/pages/RadnikPregledRez.css'
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import {GrEdit} from 'react-icons/gr';
import {BsFillTrashFill} from 'react-icons/bs'
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import Axios from "axios"
import items from "./data";
import {  Route, withRouter } from "react-router-dom";
import Icon from '@ant-design/icons';
import DetailsSvg from './icon/details.svg'; 
const today = moment().format('YYYY-MM-DD')
class RadnikPregledRez extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      ...props.location.state.info,
      rezervacije:[],
      startDate: new Date(),
      endDate: new Date(),
      mijanjanEndDate:false,
      brSobe: "",
      ime: "",
      prezime: "",
      brGostiju: -1,
      modal: false,
      modal2: false,
      info:props.location.state.info,
      imena:[],
      prezimena:[],
      sobe:[],
    }
    console.log("info u pregledu rez")
    console.log(this.state.info)
    
    var itemi=this.formatData(items)
    Axios.get("http://localhost:3001/pregledRezervacija").then((result, fields)=>{
      var rezerv=result.data;
      this.setState(state => ({
        ...state,
        rezervacije:result.data
      }))
      console.log("lista rezervacija")
      console.log(result.data)
      rezerv.map((rez,i)=>{
        Axios.get("http://localhost:3001/korisnik?id="+rez.id_korisnik).then((result, fields)=>{
     //     console.log(result.data)
     if(rez.id_soba>=1 && rez.id_soba<=12)
     this.setState(state => ({
      ...state,
     //rezerv[i]["ime"]=result.data[0].ime;
     //rezerv[i]["prezime"]=result.data[0].prezime;
      imena: [...this.state.imena, result.data[0].ime],
     prezimena: [...this.state.prezimena, result.data[0].prezime],
     sobe:[...this.state.sobe, itemi[rez.id_soba-1].name]
    }))
    console.log(rez.id_rezervacije+" " + rez.id_korisnik+" "+result.data[0].ime)
      })
     
    /*  var itemi=this.formatData(items)
      itemi.map((soba)=>{
        if(rez.id_soba==soba.id){
          console.log(rez.id_soba)
          console.log(soba.id)
        this.setState(state => ({
          ...state,
          sobe: [...this.state.sobe, soba.name],
        }))
        console.log(this.state.sobe[i].id+ rez.id_soba + soba.name)
      }
      })
      console.log(this.state.sobe)*/
    })
  });
    

     
      this.handleChangeBrSobe = this.handleChangeBrSobe.bind(this);
      this.handleChangeBrGostiju = this.handleChangeBrGostiju.bind(this);
      this.showModal = this.showModal.bind(this);
      this.hideModal = this.hideModal.bind(this);
      this.showModal2 = this.showModal2.bind(this);
      
}

formatData(items) {
  let tempItems = items.map(item => {
    let id = item.sys.id;
    let images = item.fields.images.map(image => image.fields.file.url);

    let room = { ...item.fields, images, id };
    return room;
  });
  return tempItems;
}
obrisiRezervaciju=(id)=>{
  Axios.delete("http://localhost:3001/obrisiRezervaciju?id="+this.state.rezervacije[id].id_rezervacije).then((result, fields)=>{
})
this.Filtriraj();
}
Filtriraj=()=>{
  var itemi=this.formatData(items)
  console.log(this.state.mijenjanEndDate)
  Axios.get("http://localhost:3001/filtrirajPregledRezervacija?id_soba="+this.state.brSobe+"&br_gostiju="+this.state.brGostiju+"&ime="+this.state.ime+"&prezime="+this.state.prezime+"&start_date="+moment(this.state.startDate).format('YYYY-MM-DD')+"&end_date="+moment(this.state.endDate).format('YYYY-MM-DD')+"&mijenjanEndDate="+this.state.mijanjanEndDate).then((result, fields)=>{
    //     console.log(result.data)
    this.setState(state => ({
     ...state,
     rezervacije:result.data,
     imena:[],
     prezimena:[],
     sobe:[]
   }))
   var rezerv=result.data;
   rezerv.map((rez,i)=>{
    Axios.get("http://localhost:3001/korisnik?id="+rez.id_korisnik).then((result, fields)=>{
 //     console.log(result.data)
 
 this.setState(state => ({
  ...state,
 //rezerv[i]["ime"]=result.data[0].ime;
 //rezerv[i]["prezime"]=result.data[0].prezime;
  imena: [...this.state.imena, result.data[0].ime],
 prezimena: [...this.state.prezimena, result.data[0].prezime],
     sobe:[...this.state.sobe, itemi[rez.id_soba].name]
}))
console.log(rez.id_rezervacije+" " + rez.id_korisnik+" "+result.data[0].ime)
  })
 
 /* var itemi=this.formatData(items)
  itemi.map((soba)=>{
    if(rez.id_soba==soba.id){
      console.log(rez.id_soba)
      console.log(soba.id)
    this.setState(state => ({
      ...state,
      sobe: [...this.state.sobe, soba.name],
    }))
  }
  })*/
  })
})
this.setState(state => ({...state, mijenjanEndDate:false}));
}
nadjiIme(id){
  //let rez= await Axios.get("http://localhost:3001/korisnik?id="+id);
  return this.state.imena[id];
}
handleChangeBrSobe=(event) =>{
  this.setState(state => ({...state, brSobe: event.target.value}));
}
handleChangeIme(event) {
  this.setState(state => ({...state, ime: event.target.value}));
}
handleChangePrezime(event) {
  this.setState(state => ({...state, prezime: event.target.value}));
}
handleChangeBrGostiju(event) {
  this.setState(state => ({...state, brGostiju: event.target.value}));
}

showModal = () => {
  this.setState(state => ({
    ...state,
    modal : true,
  }))
  
}

hideModal = () => {
  this.setState(state => ({
    ...state,
    modal : false,
    modal2: false
  }))
  
}
showModal2 = () => {
  
  this.setState(state => ({
    ...state,
    modal2: true
  }))
  
}


provjeriJeLiPrazanNiz(){
  if(this.state.rezervacije.length!=0) return false;
  else return true;
} 

  render () {
    return (
      <>
      <NavbarRadnik props={this.state.info}/>
     
      <div className="maincontainer">
      
       
        <h1 className="naslov">Pregled rezervacija</h1>

        <div className="filter">
        <h4 className="animation">Filteri</h4>
      
        <div className="filt-dio-1">
        <div className="rowe">
        <div className="column"> 
          <p>Rezervacije u vremenskom opsegu:</p>
          </div>
            <div className="column"> 
            <p>Od:</p>
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
            <p>Do:</p>
            <DatePicker 
                selected={this.state.endDate}
                selectsEnd
                startDate={this.state.startDate}
                endDate={this.state.startDate}
                minDate={this.state.startDate}
                onChange={date => this.setState(state => ({
                  ...state,
                  endDate: date,
                  mijanjanEndDate:true
                }))}
              />
          </div>
          </div>
        </div>
        <div class="rowe">
          <div class="column">
          <p>Pretraži po klijentovim podacima</p>
          <input type="text" name="name" onInput={this.handleChangeIme.bind(this)} style={{width: "200px"}} placeholder="Ime klijenta"/>
          <p> </p> 
          <input type="text" name="name" onInput={this.handleChangePrezime.bind(this)} style={{width: "200px"}} placeholder="Prezime klijenta"/>
          </div>
          
          <div class="column">
          <p>Odaberite broj sobe</p>
            <input type="number" id="brSobe" name="brSobe"  min="1" max="12"  onInput={this.handleChangeBrSobe.bind(this)} style={{width: "130px"}} placeholder="Broj sobe [1,12]"></input>
          </div>

          <div class="column">
             <p>Odaberite broj gostiju</p>
            <input type="number" id="brSobe" name="brSobe"  min="1" max="6"  onInput={this.handleChangeBrGostiju.bind(this)} style={{width: "131px"}} placeholder="Broj gostiju [1,6]"></input>
          </div>

        </div>
        <div class="rowe">
        <div class="column"> 
        <button type="button" class="btn btn-info btn-lg btn-block" onClick={this.Filtriraj.bind(this)}>Filtriraj</button>
        </div>
        </div>
        </div>
        
        <div className="container-table">
        <h4 class="animation">Lista</h4>
        
        <table class="table table-hover"  >
          <thead>
            <tr align="center">
              <th>Ime</th>
              <th>Dolazak</th>
              <th>Odlazak</th>
              <th>Soba</th>
              <th>Broj gostiju</th>
              <th>Cijena</th>
              <th>Izmijeni</th>
              <th>Više informacija</th>
              
            </tr>
          </thead>
          <tbody>
          { this.provjeriJeLiPrazanNiz() && <h5 style={{padding:"20px", color:"black", textAlign:"center"}}>Nema specijalnih ponuda koje zadovoljavaju unesene kriterije.</h5>}
          {
          this.state.rezervacije.map((result, i) => {
            
            return (
             
                 <tr align="center" >
                <td>  <td style={{border:'none'}}>{this.state.imena[i] + " " + this.state.prezimena[i]}</td></td>
                  <td><td style={{border:'none'}} >{moment(result.start_date).format('DD.MM.YYYY.')}</td></td>
                  <td><td style={{border:'none'}} >{moment(result.end_Date).format('DD.MM.YYYY.')}</td></td>
                  <td><td style={{border:'none'}} >{this.state.sobe[i]}</td></td>
                  <td><td style={{border:'none'}} >{result.br_odraslih+result.br_djece}</td></td>
                  <td><td style={{border:'none'}} >{result.cijena}€</td></td>
                  <td>
                    <td style={{border:'none'}} >
                  <Link to={{
                    pathname: '/radnik/azuriraj-rezervaciju',
                    state: {
                        info:this.state.info,
                        rezervacija: this.state.rezervacije[i]
                    },}} >
                    <Button variant="link"><GrEdit size={20}/> </Button>
                    </Link>
                    <br/></td>
                    <td style={{border:'none'}} >
                  <Button variant="link" onClick={this.showModal.bind(this)}><BsFillTrashFill size={20}/></Button>
                  </td>
                    
                  <Modal
                    isOpen={this.state.modal}
                    onRequestClose={this.showModal.bind(this)}
                    contentLabel="My dialog"
                    className="mymodal"
                     overlayClassName="myoverlay"
                    closeTimeoutMS={200}
                  >
                    <div className="modal-1">
                    <h4 className="title-modal">Brisanje rezervacije</h4>
                      <h5>Da li zaista želite obrisati izabranu rezervaciju?</h5>
                      <div className="dugmad">
                      <Button variant="danger" size="lg" onClick={() => {this.obrisiRezervaciju(i); this.showModal2();}}>Da</Button>
                      <Button variant="outline-secondary"  size="lg" onClick={this.hideModal.bind(this)}>Cancel</Button>
                      </div>
                      </div>
                  </Modal>

                  <Modal
                    isOpen={this.state.modal2}
                    onRequestClose={this.showModal2.bind(this)}
                    contentLabel="My dialog"
                    className="mymodal"
                     overlayClassName="myoverlay"
                    closeTimeoutMS={200}
                  >
                    

                      <h4>Rezervacija pobrisana!</h4>
                      <div className="dugmad">
                      <Button variant="info" size="lg" onClick={this.hideModal.bind(this) }>Ok</Button>
                      </div>
                  </Modal>
                  </td>
                  <td>
                  <td style={{border:'none'}} >
                  <Link to={{
                    pathname: '/radnik/info-rezervacija',
                    state: {
                        info:this.state.info,
                        rezervacija: this.state.rezervacije[i],
                        soba:this.state.sobe[i]
                    },}} >
                    <Button variant="link"><InfoCircleOutlined/> </Button>
                    </Link>
                    </td>
                  </td>
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

export default withRouter(RadnikPregledRez)