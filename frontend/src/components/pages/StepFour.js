import React, { useState } from 'react'
import {FcCheckmark} from 'react-icons/fc'
import { withRouter, Route} from 'react-router-dom';
import '../../components/HeroSection.css'
import Moment from 'react-moment';
import moment from "moment"
import Popup from 'reactjs-popup';
import '../../components/PopUp2.css'
import Axios from "axios";
import Modal from 'react-modal';
import Navbar from '../Navbar';

import Alert from "reactstrap/lib/Alert";
const c_obroka=5;
const c_bazen=30;
const c_spa=50;


class StepFour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.location.state.info, 
      modal: false   ,
      idSoba:8, 
      id_korisnik:-1,
      korak:4,
      ponuda:props.location.state.ponuda,
      popust:props.location.state.ponuda ? props.location.state.popust : 0,
      period_poc: props.location.state.ponuda ? new Date(props.location.state.period_poc) : new Date(),
      period_kraj: props.location.state.ponuda ? new Date(props.location.state.period_kraj) : new Date(),
      idoviSobaPonude:props.location.state.ponuda ? props.location.state.idoviSobaPonude : [],
      kod:"",
      kod_unos:"",
      kod_uneseni:"",
      unesen_kod:false,
      tacan_kod:false,
      ispisi_error:false,
      cijena_bez_popusta:  this.roundToTwo(this.izracunajCijenuFiksno(props.location.state.info)), 
      cijena_s_popustom: props.location.state.ponuda? this.roundToTwo(this.uracunajPopustFiksno(props.location.state.info)) : 0
    };
    
    //this.izracunajCijenu();
    this.showModal = this.showModal.bind(this);
    console.log(this.state)
    
  }
  roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
  }
  componentDidMount() {
    window.scrollTo(0, 0)
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
  showModal = () => {
    this.setState(state => ({
      ...state,
      modal : !this.state.modal,
    }))
    this.submitRezervaciju();
  }
  uracunajPopustFiksno=(info)=>{
    var mnozi=(100-info.popust)/100.0
  if(info.popust!=0)
    return this.roundToTwo(this.izracunajCijenuFiksno(info)*mnozi);
    else return this.roundToTwo(this.izracunajCijenuFiksno(info))
  }
  uracunajPopust=()=>{
    var mnozi=(100-this.state.popust)/100.0
    this.setState({
      cijena_s_popustom:this.state.popust? this.roundToTwo(this.state.cijena_bez_popusta*mnozi) : this.roundToTwo(this.state.cijena_bez_popusta),
    })
    this.forceUpdate();
    return this.roundToTwo(this.state.cijena_s_popustom);
  }
  provjeriKod=()=>{
    Axios.get("http://localhost:3001/provjeraKodaZaPopust?kod="+this.state.kod_unos).then((result, fields)=>{
      if(!result.data.length){
        console.log("proslo rezervaciju")
        Axios.get("http://localhost:3001/kodZaPopust?kod="+this.state.kod_unos).then((result, fields)=>{
          if(result.data.length){
            console.log("proslo kod")
        this.setState(state => ({
        ...state,
        kod_uneseni:this.state.kod_unos,
        popust:result.data[0].popust,
        tacan_kod: true,
        ispisi_error:false,
      }))
      this.setState(state => ({
        ...state,
        cijena_s_popustom: this.uracunajPopust(),
      }))
          
          console.log(this.state)
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
submitRezervaciju=()=>{
  console.log("uslo")
  var start_date= moment(this.state.startDate).format('YYYY-MM-DD hh:mm:ss');
  var end_date=moment(this.state.endDate).format('YYYY-MM-DD hh:mm:ss');
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
      kod: ""+result.data.id_korisnik.toString()+moment(start_date).format('DDMMYYYY')+moment(end_date).format('DDMMYYYY')+Math.random().toString()
    }))
    Axios.post("http://localhost:3001/kreirajRezervaciju", 
  {
    id_korisnik : result.data.id_korisnik,
    id_soba : this.state.idSobe,
    start_date : start_date,
    end_date : end_date,
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
    specZahtj:this.state.specZahtj

  }).then(()=>{
    //alert("successful insert!");
    Axios.post("http://localhost:3001/unesiKod", 
  {
    ime: this.state.ime,
    prezime: this.state.prezime,
    popust: 10,
    kod_tekst: this.state.kod

  }).then(()=>{
    //alert("successful insert!");
  });
  Axios.post("http://localhost:3001/posaljiMail", 
  {
    to:this.state.email,
    subject: "Informacije o rezervaciji - Vila Nezirović",
    ime:this.state.ime,
    start_date:this.state.startDate,
    end_date:this.state.endDate,
    id_sobe:this.state.naziv,
    kod: this.state.kod,
    specZahtj:this.state.specZahtj

  }).then(()=>{
    //alert("successful insert!");
  });
  });
    
  });
  
  //console.log(id_korisnik)
  
  console.log("izaslo")
}
izracunajCijenuFiksno(info){
  var cijena_sobe = info.cijena;
  var cijena_za_smjestaj=0
  var cijena_za_pogodnosti = 0
  console.log(cijena_sobe)
  //var br_dana=moment(this.state.startDate).diff(moment(this.state.endDate), 'days');

  var br_dana=moment(moment(info.startDate).format('YYYY-MM-DD'), 'YYYY-MM-DD').diff(moment(moment(info.endDate).format('YYYY-MM-DD'), 'YYYY-MM-DD'), 'days')
  br_dana=Math.abs(br_dana)
  console.log(br_dana)
  var x=info.brDjece*0.5+info.brOdraslih;
  console.log("x=")
  console.log(x)
  var br_usluga=0;
  if(info.dorucak) br_usluga+=1;
  if(info.rucak) br_usluga+=1;
  if(info.vecera) br_usluga+=1;
  if(info.spa) br_usluga+=1;
  if(info.bazen) br_usluga+=1;
  cijena_za_smjestaj=br_dana*cijena_sobe;
  console.log(cijena_za_smjestaj )
  console.log(br_dana)
  console.log(x)
  console.log(cijena_sobe)
  cijena_za_pogodnosti=br_dana*x*3.0*br_usluga;
  console.log(cijena_za_pogodnosti )
  console.log(br_dana)
  console.log(x)
  console.log(br_usluga)
  var ukupno = cijena_za_smjestaj+cijena_za_pogodnosti;
  console.log(ukupno )
  console.log(cijena_za_smjestaj)
  //console.log(Math.abs(cijena_za_smjestaj))
  console.log(cijena_za_pogodnosti)
  //console.log(Math.abs(cijena_za_pogodnosti))
  /*this.setState(state => ({
    ...state,
    cijena_za_pogodnosti: cijena_za_pogodnosti,
  }))
  this.setState(state => ({
    ...state,
    
    cijena_za_smjestaj:cijena_za_smjestaj,
    
  }))*/
  this.setState(state => ({
    ...state,
    cijena_bez_popusta: this.roundToTwo(ukupno)
  }))
  return this.roundToTwo(ukupno);
}
izracunajCijenu(){
  var cijena_sobe = this.state.cijena;
  var cijena_za_smjestaj=0
  var cijena_za_pogodnosti = 0
  console.log(cijena_sobe)
  //var br_dana=moment(this.state.startDate).diff(moment(this.state.endDate), 'days');

  var br_dana=moment(moment(this.state.startDate).format('YYYY-MM-DD'), 'YYYY-MM-DD').diff(moment(moment(this.state.endDate).format('YYYY-MM-DD'), 'YYYY-MM-DD'), 'days')
  br_dana=Math.abs(br_dana)
  console.log(br_dana)
  var x=this.state.brDjece*0.5+this.state.brOdraslih;
  console.log("x=")
  console.log(x)
  var br_usluga=0;
  if(this.state.dorucak) br_usluga+=1;
  if(this.state.rucak) br_usluga+=1;
  if(this.state.vecera) br_usluga+=1;
  if(this.state.spa) br_usluga+=1;
  if(this.state.bazen) br_usluga+=1;
  cijena_za_smjestaj=br_dana*cijena_sobe;
  console.log(cijena_za_smjestaj )
  console.log(br_dana)
  console.log(x)
  console.log(cijena_sobe)
  cijena_za_pogodnosti=br_dana*x*3.0*br_usluga;
  console.log(cijena_za_pogodnosti )
  console.log(br_dana)
  console.log(x)
  console.log(br_usluga)
  var ukupno = cijena_za_smjestaj+cijena_za_pogodnosti;
  console.log(ukupno )
  console.log(cijena_za_smjestaj)
  //console.log(Math.abs(cijena_za_smjestaj))
  console.log(cijena_za_pogodnosti)
  //console.log(Math.abs(cijena_za_pogodnosti))
  this.setState(state => ({
    ...state,
    cijena_za_pogodnosti: cijena_za_pogodnosti,
  }))
  this.setState(state => ({
    ...state,
    
    cijena_za_smjestaj:cijena_za_smjestaj,
    
  }))
  this.setState(state => ({
    ...state,
    cijena_bez_popusta: this.roundToTwo(ukupno)
  }))
  if(this.state.ponuda) this.uracunajPopust();
  return this.roundToTwo(ukupno);
}
 
  provjeriImaLiPogodnosti=()=>{if(this.state.dorucak==true || this.state.rucak==true || this.state.vecera==true || this.state.spa==true || this.state.bazen==true) return true; else return false;}
  render() {
    return (
      <>
      <Navbar/>
      <div className="multiStepContainer-four">
         <div className="header-step-4"> 
        <div className='multi-step-btns'>
        <button className="multi-step-btn-style-1" style={this.state.korak===1 ? {background:'#1E90FF', paddingTop:"2px"} : {background: 'silver', paddingTop:"2px"}}> <FcCheckmark/></button>
        <button className="linija" style={this.state.korak===1 ? {background:'#1E90FF', paddingTop:"5px"} : {background: 'silver', paddingTop:"5px"}}></button>
        <button className="linija" style={this.state.korak===2 ? {background:'#1E90FF', paddingTop:"5px"} : {background: 'silver', paddingTop:"5px"}}></button>
        <button className="multi-step-btn-style-2" style={this.state.korak===2 ? {background:'#1E90FF', paddingTop:"2px"} : {background: 'silver', paddingTop:"2px"}}><FcCheckmark/></button>
        <button className="linija" style={this.state.korak===2 ? {background:'#1E90FF', paddingTop:"5px"} : {background: 'silver', paddingTop:"5px"}}></button >
        <button className="linija" style={this.state.korak===3 ? {background:'#1E90FF', paddingTop:"5px"} : {background: 'silver', paddingTop:"5px"}}></button>
        <button className="multi-step-btn-style-3" style={this.state.korak===3 ? {background:'#1E90FF', paddingTop:"2px"} : {background: 'silver', paddingTop:"2px"}}><FcCheckmark/></button>
        <button className="linija" style={this.state.korak===3 ? {background:'#1E90FF', paddingTop:"5px"} : {background: 'silver', paddingTop:"5px"}}></button>
        <button className="linija" style={this.state.korak===4 ? {background:'#1E90FF', paddingTop:"5px"} : {background: 'silver', paddingTop:"5px"}}></button>
        <button className="multi-step-btn-style-4" style={this.state.korak===4 ? {background:'#1E90FF', paddingTop:"5px"} : {background: 'silver', paddingTop:"5px"}}>4</button>
        </div>
        
      </div>
      <div className="step-four-container">
        <h2>PREGLED REZERVACIJE</h2> <br/>
        <h3>Informacije o boravku</h3> 
        <h5>Datum dolaska: <Moment format="DD/MM/YYYY">{this.state.startDate}</Moment></h5>
        <h5>Datum odlaska: <Moment format="DD/MM/YYYY">{this.state.endDate}</Moment></h5>
             
        <h5>Odraslih osoba: {this.state.brOdraslih}</h5>
        <h5>Djece: {this.state.brDjece}</h5> <br/>
        <hr color="gray"></hr>
        <h3>Informacije o sobi</h3> 
        <h5>Naziv sobe : {this.state.naziv}</h5>  <br/>
        <hr color="gray"></hr>
        <h3>Pogodnosti koje su uključene u rezervaciju</h3>
        <h6>Cijena svake od pogodnosti zasebno: </h6>
        <h6>odrasla osoba - 3€, dijete - 1.5 €</h6>
        {this.provjeriImaLiPogodnosti() && <div>
        <h5>{this.state.dorucak&&"Doručak"}</h5>
        <h5>{this.state.rucak&&"Ručak"}</h5>
        <h5>{this.state.vecera&&"Večera"}</h5>
        <h5>{this.state.spa&&"Spa"}</h5>
        <h5>{this.state.bazen&&"Bazen"}</h5></div>}
        <h5>{!this.provjeriImaLiPogodnosti()&&"Niste izabrali niti jednu od posebnih pogodnosti."}</h5><br/>
        <hr color="gray"></hr>
        <h3>Vaši lični podaci</h3>
        <h5>Ime: {this.state.ime}</h5>
        <h5>Prezime: {this.state.prezime}</h5>
        <h5>E-mail: {this.state.email}</h5>
        <h5>Broj telefona: {this.state.brojTel}</h5>
        <br/>
        <hr color="gray"></hr>
        {!this.state.ponuda && <div>
        <h3>Unos koda za proračun popusta: </h3><input    className='input-form' placeholder='Kod za proračun popusta' 
        value={this.state.kod_unos} onChange={(e) => { this.promijeniKod(e);} } /> 
         <h6>Ukoliko ste ranije vršili rezervaciju kod nas, unesite kod koji smo Vam poslali unutar konfirmacijskog email-a i ostvarite popust.</h6>
        {this.state.ispisi_error && <Alert color="danger" fade={false}>
            <p style={{color: "red", fontWeight: "bold"}}>Kod nije ispravan, pokušajte ponovo!</p>
          </Alert>}
        <button disabled={!this.state.unesen_kod} className="btn-nastavak-povratak-style" 
                onClick={() => { this.provjeriKod();}}>
                Uračunaj popust
              </button>
        <hr color="gray"></hr>
        </div>}
        
        {(this.state.ponuda || this.state.tacan_kod) && <div><h3>Cijena bez popusta: </h3> <h3 style={{fontWeight: "bold"}}>{this.state.cijena_bez_popusta} €</h3>
        <h2>Cijena s popustom od {this.state.popust}%: </h2> <h2>{this.state.cijena_s_popustom} €</h2></div>}
        {!this.state.popust && <div><h3>Cijena: </h3> <h3 style={{fontWeight: "bold"}}>{this.state.cijena_bez_popusta} €</h3></div>}  
        <p>   </p>
        <p>   </p>
        <p style={{color: "grey", fontWeight: "bold"}}>Ukoliko želite promijeniti/popraviti neku od stavki rezervacije vratite se na odgovarajući prethodni korak klikom na dugme "Povratak"!</p>
        
      
            
            <div className="row-step-3">
            <div className="first-column-3">
            <Route render={({ history}) => (
              <button className="btn-nastavak-povratak-style-L" 
                onClick={() => { history.push('/rezervacija/2', { info:this.state
                  
                });}}>
                Povratak
              </button>
            )}
          />
            </div> 
            <div className="second-column-3">
            <button className="btn-nastavak-povratak-style-R"  onClick={this.showModal.bind(this)}>Potvrdi rezervaciju</button>
            </div>
            </div>
            <div className="modal">

            
              
            
              <Modal
                isOpen={this.state.modal}
                onRequestClose={this.showModal.bind(this)}
                contentLabel="My dialog"
                className="mymodal"
              overlayClassName="myoverlay"
              closeTimeoutMS={500}
              >
                <div className="potvrda">Uspješno ste izvršili rezervaciju! </div>
                <h5>Informacije u vezi vaše rezervacije su Vam poslane na e-mail koji ste unijeli.</h5>
                  <h6>Vidimo se uskoro!</h6>
                <Route render={({ history}) => (
                    <button className="btn-nastavak-povratak-style" 
                      onClick={() => { history.push('/')}}>
                      Povratak na početnu stranicu
                    </button>
                  )}
                />
              </Modal>
              
           </div>
           {/*}
            <div className="btn-povratak">
            <div className="modal">
            <button type="button" class="btn-nastavak-povratak-style" onClick={this.submitRezervaciju}>Potvrdi rezervaciju</button>
            {/*<Popup modal className='popup' trigger={<button type="button" class="btn-nastavak-povratak-style" onClick={this.submitRezervaciju}>Potvrdi rezervaciju</button>}>
              Uspješno ste izvršili rezervaciju! <br/> 

              <Route render={({ history}) => (
                        <button className="btn-nastavak-povratak-style"
                          onClick={() => { history.push('/', { info:this.state}
                          ); } }
                          
                          >
                          Povratak na početnu stranicu
                        </button>
                      )}
              />
            </Popup>  
              */}
            </div>
           </div>
          </>
    );
  }
}

export default withRouter(StepFour);