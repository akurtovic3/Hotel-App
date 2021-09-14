import React, { useState, Component } from 'react'

import Modal from 'react-modal';

import '../../components/HeroSection.css'
import NavbarRadnik from '../NavbarRadnik';
import './RadnikDodajRez.css'
import Scheduler from '../MjesecView'
import 'react-bootstrap'
import DatePicker from "react-datepicker";
import { Button } from 'react-bootstrap';
import {MdEmail} from 'react-icons/md'

import Alert from "reactstrap/lib/Alert";
import {FaCalendarDay, FaMobileAlt, FaUserEdit} from 'react-icons/fa';

import {MdChildCare,MdFace} from 'react-icons/md'
import {CgNotes} from 'react-icons/cg'
import Axios from "axios"
import {  Route, withRouter } from "react-router-dom";
import moment from 'moment'

const listaSoba0= [
  {id: 1, value: "Soba 1", isChecked: false, capacity:1, naziv: "Soba Superior sa pogledom na more", cijena:50, reserved: false},
  {id: 2, value: "Soba 2", isChecked: false, capacity:1, naziv: "Jednokrevetna soba Superior", cijena:70, reserved: false},
  {id: 3, value: "Soba 3", isChecked: false, capacity:2, naziv: "Standardna dvokrevetna soba", cijena:100, reserved: false},
  {id: 4, value: "Soba 4", isChecked: false, capacity:3, naziv: "Predsjednički apartman", cijena:300, reserved: false},
  {id: 5, value: "Soba 5", isChecked: false, capacity:4, naziv: "Apartman Deluxe",cijena:200, reserved: false},
  {id: 6, value: "Soba 6", isChecked: false, capacity:3, naziv: "Standardna trokrevetna soba",cijena:150, reserved: false},
  {id: 7, value: "Soba 7", isChecked: false, capacity:1, naziv: "Jednokrevetna Deluxe soba",cijena:120, reserved: false},
  {id: 8, value: "Soba 8", isChecked: false, capacity:2, naziv: "Dvokrevetna soba Deluxe",cijena:240, reserved: false},
  {id: 9, value: "Soba 9", isChecked: false, capacity:3, naziv: "Apartman Standard",cijena:250, reserved: false},
  {id: 10, value: "Soba 10", isChecked: false, capacity:4, naziv:"Apartman deluxe" ,cijena:300, reserved: false},
  {id: 11, value: "Soba 11", isChecked: false, capacity:5, naziv: "Predsjednički apartman s pogledom na more",cijena: 500, reserved: false},
  {id: 12, value: "Soba 12", isChecked: false, capacity:6, naziv: "Apartman za porodicu",cijena: 400, reserved: false},
]

class RadnikDodajRez extends Component{
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
          startDate: new Date(),
          endDate: moment(moment(new Date())).add(1, 'd')._d,
          brOdraslih: 1,
          brDjece: 0,
          counter: 0,
          brSoba: 1,
          ime: '',
          prezime:'',
          email:'',
          brojTel:'',
          specZahtj:'',
          dorucak:false,
          rucak:false,
          vecera:false,
          spa:false,
          bazen:false,
          cijena:0,
          modal:false,
          id_sobe: -1,
          info:props.location.state.info,
          error:false,
          kod:"",
          kod_unos:"",
          kod_uneseni:"",
          unesen_kod:false,
          tacan_kod:false,
          ispisi_error:false,
          cijena_bez_popusta:  0, 
          cijena_s_popustom: 0,
          prikazi_cijenu: false,
          izracunata_cijena:false,
          listaSoba: Object.assign([], listaSoba0),
          greska_cijena:false, 
          popust: 0,
          prikazi_cijenu_s_pop: false

        };
        //this.provjeriZauzetostSoba(this.state.startDate, this.state.endDate)
        //this.provjeriUnos();
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
      componentDidMount() {
        //this.provjeriZauzetostSoba();
      }
      provjeriZauzetostSoba=()=>{
        var items = Object.assign([], listaSoba0)
        items.map((soba)=>{
          soba.reserved=false;
        })
        console.log("pocetak")
        console.log(listaSoba0)
        console.log(items)
        Axios.get("http://localhost:3001/zauzeteSobe?start_date="+moment(this.state.startDate? this.state.startDate : new Date()).format('YYYY-MM-DD')+"&end_date="+moment(this.state.endDate ? this.state.endDate : new Date()).format('YYYY-MM-DD')).then((res, fields)=>{
            var rez=res.data;
            
            //console.log("zauzete")
            console.log(rez)
            console.log(rez.length)
            if(rez.length)
            rez.map((rezervacija)=> {
            // console.log(rezervacija.id_soba)
              // 2. Make a shallow copy of the item you want to mutate
              if(rezervacija.id_soba<13)
              items[rezervacija.id_soba-1].reserved = true;
              // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
              // 5. Set the state to our new copy
              
          })
          
        /*this.setState({
          listaSoba:[... items]
        });*/
        this.setState({listaSoba: Object.assign([], items)})
        /*
        listaSoba0.map((soba)=>{
          soba.reserved=false;
          soba.isChecked=false;
        })*/
        console.log("kraj")
        console.log(items)
       // this.forceUpdate()
        //return items;
          
        });
        
      }
      provjeriJeLiOznacenaSoba(){
        var jest=false;
        this.state.listaSoba.map((soba)=>{
          if(soba.isChecked) jest=true;
        })
        if(!jest) this.setState({greska_cijena:true})
        else this.setState({greska_cijena:false})
        return jest;
        
      }
      hideModal = () => {
        listaSoba0.map((soba)=>{
          soba.reserved=false;
          soba.isChecked=false;
        })
        this.setState(state => ({
          ...state,
          startDate: new Date(),
                endDate: moment(moment(new Date())).add(1, 'd')._d,
                brOdraslih: 1,
                brDjece: 0,
                counter: 0,
                brSoba: 1,
                ime: '',
                prezime:'',
                email:'',
                brojTel:'',
                kod_unos:"",
                specZahtj:'',
                dorucak:false,
                rucak:false,
                vecera:false,
                spa:false,
                bazen:false,
                modal:false,
                id_sobe: -1,
                info: this.state.info,
                error:false,
                kod:"",
                kod_unos:"",
                kod_uneseni:"",
                unesen_kod:false,
                tacan_kod:false,
                ispisi_error:false,
                cijena_bez_popusta:  0, 
                cijena_s_popustom: 0,
                prikazi_cijenu: false,
                izracunata_cijena:false,
                listaSoba: Object.assign([], listaSoba0),
                greska_cijena:false,
                popust:0,
                prikazi_cijenu_s_pop: false
        }));
        
      }
      showModal2 = () => {
        
        this.setState(state => ({
          ...state,
          modal: true
        }))
        
      }
      
  componentDidMount() {
    window.scrollTo(0, 0)
  }
      kreirajRezervaciju=()=>{
        console.log("krajnje stanje")

        console.log(this.state)
        if(this.provjeriUnos()){
        
        Axios.post("http://localhost:3001/kreirajNeregistrovanogKorisnika", 
          {
            ime: this.state.ime,
            prezime: this.state.prezime,
            email:this.state.email,
            br_tel:this.state.brojTel
          }).then((result)=>{
            this.setState(state => ({
              ...state,
              id_korisnik:result.data.id_korisnik,
              kod: ""+result.data.id_korisnik.toString()+moment(this.state.startDate).format('DDMMYYYY')+moment(this.state.endDate).format('DDMMYYYY')+Math.random().toString()
            }))
            this.izracunajCijenu();
        console.log(this.state.popust)
        console.log(this.state.cijena)
        if(this.state.unesen_kod)
        this.provjeriKod();
        if(this.state.popust) this.uracunajPopust();
            Axios.post("http://localhost:3001/kreirajRezervaciju", 
          {
            id_korisnik : result.data.id_korisnik,
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
            cijena : this.state.popust? this.state.cijena_s_popustom : this.state.cijena_bez_popusta,
            popust: this.state.popust,
            kod: this.state.kod_uneseni,
            specZahtj:this.state.specZahtj,
          }).then(()=>{
            Axios.post("http://localhost:3001/unesiKod", 
  {
    ime: this.state.ime,
    prezime: this.state.prezime,
    popust: 10,
    kod_tekst: this.state.kod

  }).then(()=>{
    Axios.post("http://localhost:3001/posaljiMail", 
    {
      to:this.state.email,
      subject: "Informacije o rezervaciji - Vila Nezirović",
      ime:this.state.ime,
      start_date:this.state.startDate,
      end_date:this.state.endDate,
      id_sobe:listaSoba0[this.state.id_sobe-1].naziv,
      kod: this.state.kod,
      specZahtj:this.state.specZahtj
  
    }).then(()=>{
      this.showModal2();
    
     
    //alert("successful insert!");
  });

 
    //alert("successful insert!");
  });
            //alert("successful insert!");
          });
        
            
  });
  //console.log(id_korisnik)
 
  //this.provjeriZauzetostSoba();
  //console.log("izaslo")
}

}
roundToTwo(num) {    
  return +(Math.round(num + "e+2")  + "e-2");
}
promijeniKod(e) {
  if(e.target.value!="")
  this.setState(state => ({
    ...state,
    kod_unos: e.target.value,
    unesen_kod:true}))
    else
    this.setState(state => ({
      ...state,
      kod_unos: e.target.value,
    unesen_kod:false}))

}
provjeriKod=()=>{
  Axios.get("http://localhost:3001/provjeraKodaZaPopust?kod="+this.state.kod_unos).then((result, fields)=>{
    if(!result.data.length){
      //console.log("proslo rezervaciju")
      Axios.get("http://localhost:3001/kodZaPopust?kod="+this.state.kod_unos).then((result, fields)=>{
        if(result.data.length){
          //console.log("proslo kod")
      this.setState(state => ({
      ...state,
      kod_uneseni:this.state.kod_unos,
      popust:result.data[0].popust,
      tacan_kod: true,
      ispisi_error:false,
      prikazi_cijenu_s_pop: true
    }))
    this.setState(state => ({
      ...state,
      cijena_s_popustom: this.uracunajPopust(),
    }))
        
        //console.log(this.state)
  }
  else{
    this.setState(state => ({
      ...state,
      tacan_kod: false,
      ispisi_error:true,
      cijena_s_popustom:this.state.cijena_bez_popusta,
      popust: 0,
      kod_uneseni:"",
      prikazi_cijenu_s_pop: false
    }))
  }
      })
    }
    else{
      this.setState(state => ({
        ...state,
        tacan_kod: false,
        ispisi_error:true,
        cijena_s_popustom:this.state.cijena_bez_popusta,
        popust: 0,
        kod_uneseni:""
      }))
    }
  });
    
}

uracunajPopust=()=>{
  var mnozi=(100-this.state.popust)/100.0
  this.setState({
    cijena_s_popustom:this.state.popust? this.roundToTwo(this.state.cijena_bez_popusta*mnozi) : this.roundToTwo(this.state.cijena_bez_popusta),
  })
  this.forceUpdate();
  return this.roundToTwo(this.state.cijena_s_popustom);
}
izracunajCijenu(){
  if(this.provjeriJeLiOznacenaSoba()){
  var cijena_sobe = listaSoba0[this.state.id_sobe-1].cijena;
  //console.log(cijena_sobe)
  //var br_dana=moment(this.state.startDate).diff(moment(this.state.endDate), 'days');

  var br_dana=moment(moment(this.state.startDate).format('YYYY-MM-DD'), 'YYYY-MM-DD').diff(moment(moment(this.state.endDate).format('YYYY-MM-DD'), 'YYYY-MM-DD'), 'days')
  br_dana=Math.abs(br_dana)
  //console.log(br_dana)
  var x=this.state.brDjece*0.5+this.state.brOdraslih;
  //console.log("x=")
  //console.log(x)
  var br_usluga=0;
  if(this.state.dorucak) br_usluga+=1;
  if(this.state.rucak) br_usluga+=1;
  if(this.state.vecera) br_usluga+=1;
  if(this.state.spa) br_usluga+=1;
  if(this.state.bazen) br_usluga+=1;
  var ukupno = br_dana*cijena_sobe+br_dana*x*3.0*br_usluga;
  
  this.setState(state => ({
    ...state,
    cijena_bez_popusta: this.roundToTwo(ukupno),
    izracunata_cijena:true
  }))
  this.uracunajPopust();
  return this.roundToTwo(ukupno);
}
}

      provjeriUnos=()=>{if(this.state.ime!="" && this.state.email!="" && this.state.prezime!="" && this.state.brojTel!="" && this.provjeriJeLiOznacenaSoba()) { this.setState(state => ({
        ...state,
        error:false
      })); return true;} else { this.setState(state => ({
        ...state,
        error:true
      })); return false;}}

      promijeniBrOdraslih=(broj) =>{
        this.setState(state => ({
        ...state,
        brOdraslih: broj.target.value
      }))
      if(this.state.prikazi_cijenu)
      this.setState({cijena_bez_popusta:0, cijena_s_popustom:0, prikazi_cijenu:false, prikazi_cijenu_s_pop: false})
    }
      promijeniBrDjece=(broj) =>{
        this.setState(state => ({
        ...state,
        brDjece: broj.target.value
      }))
      if(this.state.prikazi_cijenu)
      this.setState({cijena_bez_popusta:0, cijena_s_popustom:0, prikazi_cijenu:false, prikazi_cijenu_s_pop: false})
    }
      promijeniBrSoba=(broj) =>{this.setState(state => ({
        ...state,
        brSoba: broj.target.value
      }))}

      promijeniIme(e){
        this.setState(state => ({
          ...state,
          ime: e.target.value,
        }))
        if(this.state.error) this.provjeriUnos()
      }
      promijeniPrezime(e) {
        this.setState(state => ({
          ...state,
          prezime: e.target.value
        }))
        if(this.state.error) this.provjeriUnos()
      }
      promijeniEmail(e) {
        this.setState(state => ({
          ...state,
          email: e.target.value}))
          if(this.state.error) this.provjeriUnos()
      }
      promijeniBrojTel(e) {
        this.setState(state => ({
          ...state,
          brojTel: e.target.value}))
          if(this.state.error)  this.provjeriUnos()
      }
      promijeniSpecZahtj(e) {
        this.setState(state => ({
          ...state,
          specZahtj: e.target.value}))
      }
      promijeniDorucak(e) {
        this.setState(state => ({
          ...state,
          dorucak: e.target.checked}))
          if(this.state.prikazi_cijenu)
              this.setState({cijena_bez_popusta:0, cijena_s_popustom:0, prikazi_cijenu:false, prikazi_cijenu_s_pop: false})
      }
      promijeniRucak(e) {
        this.setState(state => ({
          ...state,
          rucak: e.target.checked}))
          if(this.state.prikazi_cijenu)
              this.setState({cijena_bez_popusta:0, cijena_s_popustom:0, prikazi_cijenu:false, prikazi_cijenu_s_pop: false})
      }
      promijeniVeceru(e) {
        this.setState(state => ({
          ...state,
          vecera: e.target.checked}))
          if(this.state.prikazi_cijenu)
              this.setState({cijena_bez_popusta:0, cijena_s_popustom:0, prikazi_cijenu:false, prikazi_cijenu_s_pop: false})
      }
      promijeniSpa(e) {
        this.setState(state => ({
          ...state,
          spa: e.target.checked}))
          if(this.state.prikazi_cijenu)
              this.setState({cijena_bez_popusta:0, cijena_s_popustom:0, prikazi_cijenu:false, prikazi_cijenu_s_pop: false})
      }
      promijeniBazen(e) {
        this.setState(state => ({
          ...state,
          bazen: e.target.checked}))
          if(this.state.prikazi_cijenu)
              this.setState({cijena_bez_popusta:0, cijena_s_popustom:0, prikazi_cijenu:false, prikazi_cijenu_s_pop: false})
      }
      handleCheckChieldElement = (event) => {
        let listaSoba = this.state.listaSoba
        let counter = 0;
        listaSoba.forEach(soba => {
           if (soba.value === event.target.value){
              soba.isChecked =  event.target.checked;
              counter=soba.id;
              //console.log("unesena soba "+counter)
           }
          else if(soba.value !== event.target.value)
              soba.isChecked=false
        })
       //counter = this.state.listaSoba.filter(soba => soba.isChecked===true).length;
       
        //console.log(this.state.brSoba)
        if(this.state.prikazi_cijenu)
              this.setState({cijena_bez_popusta:0, cijena_s_popustom:0, prikazi_cijenu:false, prikazi_cijenu_s_pop: false})
          this.setState(state => ({
          ...state,
          listaSoba: listaSoba, id_sobe: counter,
          greska_cijena: false
        }))
        //console.log("unesena soba "+this.state.id_sobe)
      }

      uncheckAll = (event) => {
        let listaSoba = this.state.listaSoba
        let counter = 0;
        listaSoba.forEach(soba => {
           
              soba.isChecked =  false
              
        })
       counter = this.state.listaSoba.filter(soba => soba.isChecked===true).length;
       
        //console.log(this.state.brSoba)
        
        this.setState(state => ({
          ...state,
          listaSoba: listaSoba, counter: counter
        }))
      }
      
    
    
      render() {
       // let { items } = this.state;
       /* const ispis = this.state.listaSoba.map((soba) => {
          if((parseInt(this.state.brDjece)+parseInt(this.state.brOdraslih))<=soba.capacity && !soba.reserved)
          return (
            <>
              
               <input key={soba.id} onClick={this.handleCheckChieldElement} type="checkbox" checked={soba.isChecked} value={soba.value}  /> {soba.value}                
                
          </>
          )
          else 
          return (
            <>
              <p>{this.state.brDjece} {this.state.brOdraslih} {soba.value} {soba.capacity} {parseInt(this.state.brDjece)+parseInt(this.state.brOdraslih)} {soba.reserved.toString()}</p>
                         
                
          </>
          )
          
        })*/
        return (
    <>
        <NavbarRadnik props={this.state.info}/>
        
        <div className="dodaj-rez-container">
        <h1 className="naslov">Dodaj rezervaciju</h1>
          <Scheduler/>

          <div className="forme-dodaj-rez">
          <h2 className="naslov-zauzetost">Forma za dodavanje rezervacije</h2>
          <div className="a-row">
            <div className="a-col-pola">
            <div className="simbol"><FaCalendarDay size={35}/></div>
          <p style={{marginTop:"18px"}}>Datum dolaska: </p>
          <div className="pom">
            <DatePicker filterDate={d => {
              return new Date() <d;
                  }}
              selected={this.state.startDate}
              selectsStart
              startDate={this.state.startDate}
              endDate={this.state.endDate} 
              onChange={date =>{ this.setState(state => ({
                ...state,
                startDate: date,
                endDate: this.state.endDate<=date ? moment(moment(new Date(date))).add(1, 'd')._d : this.state.endDate
                //listaSoba: this.provjeriZauzetostSoba(date, (this.state.endDate<date) ? date : this.state.endDate )
                //listaSoba: listaSoba0
              }))
              if(this.state.prikazi_cijenu)
              this.setState({cijena_bez_popusta:0, cijena_s_popustom:0, prikazi_cijenu:false, prikazi_cijenu_s_pop: false})
              //this.provjeriZauzetostSoba(date, (this.state.endDate<date) ? date : this.state.endDate )
              /*this.forceUpdate();*/
              /*
              this.setState({
                listaSoba:[...this.provjeriZauzetostSoba(date, (this.state.endDate<date) ? date : this.state.endDate )]
              });*/
              //this.provjeriZauzetostSoba(date, (this.state.endDate<date) ? date : this.state.endDate);
              }}
            />
            </div>
            </div>
            <div className="a-col-pola">
              <div className="simbol"> <FaCalendarDay size={35}/> </div>
            
              <p style={{marginTop:"18px"}}>Datum odlaska: </p>
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
                endDate: date,
              }));
              if(this.state.prikazi_cijenu)
              this.setState({cijena_bez_popusta:0, cijena_s_popustom:0, prikazi_cijenu:false, prikazi_cijenu_s_pop: false})
             /* this.setState(state => ({
                ...state,
                listaSoba:this.provjeriZauzetostSoba(this.state.startDate, date)
              }));
              this.forceUpdate()
              */
              //this.provjeriZauzetostSoba(this.state.startDate, date);
              //this.provjeriZauzetostSoba();
              }}
            />
            </div> 
            </div>
           
            </div>
            <div className="rowe">
          <button className="btn-nastavak-povratak-style" 
              /*  onClick={() => { this.setState({listaSoba: this.provjeriZauzetostSoba(this.state.startDate, this.state.endDate)})
                 /* this.setState(state => ({
                    ...state,
                    listaSoba:this.provjeriZauzetostSoba(this.state.startDate, this.state.endDate)
                  })); }}*/
                  onClick={this.provjeriZauzetostSoba}
                  >
                Provjeri raspoloživost soba
              </button>
          </div>
            <hr></hr>
          <div className="b-row">
          <div className="b-col-pola">
          <div className="simbol"><MdFace size={30}/></div>
            <p>Broj odraslih: </p>
            <div className="pom1"><input type="number" id="brOdraslih" name="brOdraslih"  min="1" max={6-parseInt(this.state.brDjece)} value={this.state.brOdraslih} onInput={this.promijeniBrOdraslih.bind(this)} style={{width: "50px"}} ></input></div>
          </div>
          <div className="b-col-pola">
          <div className="simbol"><MdChildCare size={30}/></div>
          <p>Broj djece: </p>
          <div className="pom1"><input type="number" id="brDjece" name="brDjece"  min="0" max={6-parseInt(this.state.brOdraslih)} value={this.state.brDjece}  onInput={this.promijeniBrDjece.bind(this)} style={{width: "50px"}} ></input></div>
          </div>
          </div>
          <hr></hr>
          <div className="c-row">
          
          <div className="c-col-pola-p">
          <p style={{ textAlign:"center"}}>Raspoložive sobe:</p>
          </div>
          
         {/* <div className="c-col-pola">
          <p>Broj rezerviranih soba:</p>
          <div className="pom1"><input type="number" id="brSoba" name="brSoba"  min="1" max="20" value={this.state.brSoba}  onChange={this.promijeniBrSoba.bind(this)} style={{width: "50px"}} ></input></div>
            </div>
          <div className="c-col-pola">*/}
          <div className="c-col-pola">
            <div className="c">
          
            { !this.state.listaSoba.length?<p>Sve sobe traženog kapaciteta su zauzete za uneseni period!</p> :
              this.state.listaSoba.map((soba) => {
                if((parseInt(this.state.brDjece)+parseInt(this.state.brOdraslih))<=soba.capacity && !soba.reserved)
                return (
                  <>
                    
                    <input key={soba.id} onClick={this.handleCheckChieldElement} type="checkbox" checked={soba.isChecked} value={soba.value}  /> {soba.value}             
                      
                </>
                )
                
              })
            }
        
            
        
            </div>
            </div>
            </div>
            <hr></hr>
        {/*     <div className="roww">
        
          
        <div className="columnn">  <input key="dor" style={{minWidth: "5px", maxWidth: "13px"}} onClick={this.promijeniDorucak} type="checkbox" checked={this.state.dorucak} value="dorucak"  /> doručak  </div>       
                    <div className="columnn">  <input key="ruc" style={{minWidth: "5px", maxWidth: "13px"}} onClick={this.promijeniRucak} type="checkbox" checked={this.state.rucak} value="rucak"  /> ručak  </div> 
                    <div className="columnn">  <input key="vec" style={{minWidth: "5px", maxWidth: "13px"}} onClick={this.promijeniVeceru} type="checkbox" checked={this.state.vecera} value="vecera"  /> večera </div> 
                    <div className="columnn">  <input key="spa" style={{minWidth: "5px", maxWidth: "13px"}} onClick={this.promijeniSpa} type="checkbox" checked={this.state.spa} value="spa"  /> spa  </div> 
                    <div className="columnn">  <input key="baz" style={{minWidth: "5px", maxWidth: "13px"}} onClick={this.promijeniBazen} type="checkbox" checked={this.state.bazen} value="bazen"  /> bazen </div>                  
                                  
                     
                      
                    
                     
          
            
            
            
          </div>*/}
           
            <div className="ponude">
        
          
                    <div className="pon" >  <input key="dor" onClick={this.promijeniDorucak} type="checkbox" checked={this.state.dorucak} value="dorucak"  /><label htmlFor="dorucak">Doručak</label>  </div>       
                    <div >  <input key="ruc" onClick={this.promijeniRucak} type="checkbox" checked={this.state.rucak} value="rucak"  /><label htmlFor="rucak"> Ručak</label>  </div> 
                    <div >  <input key="vec" onClick={this.promijeniVeceru} type="checkbox" checked={this.state.vecera} value="vecera"  /><label htmlFor="vecera"> Večera</label></div> 
                    <div>  <input key="spa" onClick={this.promijeniSpa} type="checkbox" checked={this.state.spa} value="spa"  /> <label htmlFor="spa"> Spa</label>  </div> 
                    <div >  <input key="baz" onClick={this.promijeniBazen} type="checkbox" checked={this.state.bazen} value="bazen"  /> <label htmlFor="bazen">Bazen</label> </div>                  
                                  
                     
                      
                    
                     
          
            
            
            
            </div>
        {/*  <div className="c-row">
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
            <p style={{marginTop:"18px", marginRight:"3px"}}>*Ime: </p>
             <input    placeholder='Ime'
            value={this.state.ime} onChange={(e) => { this.promijeniIme(e); } }/> 
          </div>
          <div className="column">
          <div className="simbol"><FaUserEdit size={20}/></div>
          <p style={{marginTop:"18px", marginRight:"3px"}}>*Prezime: </p>
         <input   placeholder='Prezime' 
            value={this.state.prezime} onChange={(e) => { this.promijeniPrezime(e); } } /> 
          </div>
          </div>
            
         <div className="rowe">
            <div className="column">
            <div className="simbol"><MdEmail size={20}/></div>
            <p style={{marginTop:"18px", marginRight:"3px"}}>*E-mail: </p>
            <input    placeholder='E-mail' 
              value={this.state.email} onChange={(e) => { this.promijeniEmail(e); } } /> 
             
            </div>
            <div className="column">
            <FaMobileAlt size={20}/>
            <p style={{marginTop:"18px", marginRight:"3px", textAlign:"center"}}>*Broj telefona:  </p>
            <input     placeholder='Broj telefona' 
              value={this.state.brojTel} onChange={(e) => { this.promijeniBrojTel(e); } } /> 
            </div>
          </div> 
          <hr></hr>

          <div className="spec">
            <CgNotes/> <p style={{paddingTop: "15px"}}>Specijalni zahtjevi:  </p>
            <input className="input-form2" type="text"  placeholder='Ukoliko klijent ima specijalne zahtjeve, napomene i slično, navedite ih ovdje.' 
            value={this.state.specZahtj} onChange={this.promijeniSpecZahtj} /> 
          </div>
          <hr></hr>
          <div className="rowe">
          <button className="btn-nastavak-povratak-style" 
                onClick={() => { this.izracunajCijenu(); this.setState({prikazi_cijenu:true})}}>
                Proračun cijene
              </button>
          </div>
          {this.state.greska_cijena && <Alert color="danger" fade={false}>
            <p style={{color: "red", fontWeight: "bold", textAlign:"center"}}>Morate označiti sobu!</p>
          </Alert>}
          {this.state.prikazi_cijenu && <div className="rowe"><h3>Cijena: <b>{this.state.cijena_bez_popusta} €</b></h3></div>}
          <div className="rowe" ><h5 className="napomena">Nakon završetka unosa korisnikovih želja ili izmjene podataka, proračunajte cijenu.</h5> </div>
<hr></hr>

          <div className="rowe" ><input  disabled={!this.state.izracunata_cijena} className='input-form' placeholder='Kod za proračun popusta' 
        value={this.state.kod_unos} onChange={(e) => { this.promijeniKod(e);} } />  </div>
         <div className="rowe" ><h5 className="napomena">Upišite kod prethodne rezervacije korisnika kako bi ostvario odgovarajući popust.</h5> </div>
        {this.state.ispisi_error && <Alert color="danger" fade={false}>
        {(!this.state.unesen_kod && !this.state.cijena_bez_popusta) ?  <p style={{color: "red", fontWeight: "bold", textAlign:"center"}}>Morate unijeti kod ako želite izvršiti proračun popusta!</p> : <p style={{color: "red", fontWeight: "bold",  textAlign:"center"}}>Kod nije ispravan, pokušajte ponovo!</p>}
          </Alert>}
          <div className="rowe" >   <button disabled={!this.state.izracunata_cijena} className="btn-nastavak-povratak-style" 
                onClick={() => { this.provjeriKod();}}>
                Uračunaj popust
              </button>
        <hr></hr>
        </div>
        
        {this.state.tacan_kod && this.state.prikazi_cijenu_s_pop && <div className="rowe"> <h3> Cijena s popustom od {this.state.popust}%: <b>{this.state.cijena_s_popustom} €</b></h3></div>}
         

          <div classname="rowe">
          {this.state.error && <Alert color="danger" fade={false}>
            <p style={{color: "red", fontWeight: "bold", textAlign:"center"}}>Morate popuniti sva polja označena zvjezdicom!</p>
          </Alert>}
          </div>
          <div className="dno">
            <button type="button" class="btn btn-info btn-lg btn-block" onClick={() =>{ 
              this.kreirajRezervaciju();
              }}>Dodaj rezervaciju</button>
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
                    

                      <h4 style={{color:"green"}}>Rezervacija uspješno izvršena!</h4>
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

export default withRouter(RadnikDodajRez);