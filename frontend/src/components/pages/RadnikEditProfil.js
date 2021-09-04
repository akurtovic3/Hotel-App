import React from 'react'
import NavbarRadnik from '../NavbarRadnik'
import Moment from "moment"
import './RadnikEditProfil.css'
import jane from '../../images/jane-doe.jpg';
import john from '../../images/john-doe.png';
import { Link, withRouter } from 'react-router-dom';
import Axios from "axios"

import Alert from "reactstrap/lib/Alert";
class RadnikMojProfil extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ...props.location.state.info,
      info:props.location.state.info,
      photoMale: john,
      photoFemale: jane,
      error:false
    }
    this.provjeriUnos();
    this.promijeniIme = this.promijeniIme.bind(this);
    this.promijeniPrezime = this.promijeniPrezime.bind(this);
    this.promijeniUsername = this.promijeniUsername.bind(this);
    this.promijeniAdresu = this.promijeniAdresu.bind(this);
    this.promijeniGrad = this.promijeniGrad.bind(this);
    this.promijeniDrzavu = this.promijeniDrzavu.bind(this);
    this.promijeniBrTel = this.promijeniBrTel.bind(this);
    this.promijeniEmail = this.promijeniEmail.bind(this);
    console.log("edit")
    console.log(this.state);
    
  }
  upisiIzmjeneUBazu=()=>{
    Axios.put("http://localhost:3001/updateRadnik", 
    {
      id:this.state.id,
      ime: this.state.ime,
      prezime: this.state.prezime,
      mail:this.state.mail,
      tel:this.state.tel,
      username:this.state.username,
      adresa:this.state.adresa,
      grad:this.state.grad,
      drzava:this.state.drzava,
    }).then((result)=>{
      console.log("nakon updatea")
      Axios.get("http://localhost:3001/zaposlenik?id="+this.state.id).then(result=>{
    console.log(result);
    console.log(result.data); 
    this.props.history.push("/radnik-profil", {info:result.data[0]});
    });
      
    })
  }
  provjeriUnos=()=>{if(this.state.ime!="" && this.state.mail!="" && this.state.prezime!="" && this.state.tel!="" && this.state.username!="" && this.state.adresa!="") { this.setState(state => ({
    ...state,
    error:false
  })); return true;} else { this.setState(state => ({
    ...state,
    error:true
  })); return false;}}

  promijeniIme(e) {
    this.setState(state => ({
      ...state,
      ime: e.target.value,
    }))
  }
  promijeniPrezime(e) {
    this.setState(state => ({
      ...state,
      prezime: e.target.value,
    }))
  }
  promijeniUsername(e) {
    this.setState(state => ({
      ...state,
      username: e.target.value,
    }))
  }
  promijeniAdresu(e) {
    this.setState(state => ({
      ...state,
      adresa: e.target.value,
    }))
  }
  promijeniGrad(e) {
    this.setState(state => ({
      ...state,
      grad: e.target.value,
    }))
  }
  promijeniDrzavu(e) {
    this.setState(state => ({
      ...state,
      drzava: e.target.value,
    }))
  }
  promijeniBrTel(e) {
    this.setState(state => ({
      ...state,
      tel: e.target.value,
    }))
  }
  promijeniEmail(e) {
    this.setState(state => ({
      ...state,
      mail: e.target.value,
    }))
  }
  

  render () {
    return (
      <div className="profile-page-edit">
        <NavbarRadnik props={this.state.info}/>
        <div className="edit-profil-container">
        <h2 className="naslov-edit-profil">Forma za promjenu podataka na ličnom profilu</h2>

        <div className="odjeljak">
        <h3>Osnovne informacije</h3>
        <div className="a-row">
            <div className="a-col-pola">
            <div className="a-col-cetvrtina"><p>*Ime:</p></div>
            <div className="a-col-cetvrtina">
            <input    placeholder='Ime'
            value={this.state.ime} onChange={(e) => { this.promijeniIme(e); this.provjeriUnos()} }/> </div>
            </div>
            <div className="a-col-pola">
            <div className="a-col-cetvrtina"><p>*Prezime:</p></div>
            <div className="a-col-cetvrtina"><input    placeholder='Prezime'
            value={this.state.prezime} onChange={(e) => { this.promijeniPrezime(e); this.provjeriUnos()} }/> </div>
            </div>
        </div>

        
        <div className="a-row">
            <div className="a-col-pola">
            <div className="a-col-cetvrtina"><p>*Korisničko ime:</p></div>
            <div className="a-col-cetvrtina"><input    placeholder='Korisničko ime'
                value={this.state.username} onChange={(e) => { this.promijeniUsername(e); this.provjeriUnos()} }/> </div>
            </div>
            <div className="a-col-pola">
            <div className="a-col-cetvrtina"><p>ID zaposlenika:</p></div>
            <div className="a-col-cetvrtina"><input    placeholder='ID može promijeniti samo admin' size={30}
                disabled={true}/> </div>
         </div>
         </div>

         <div className="a-row">
            <div className="a-col-pola">
            <div className="a-col-cetvrtina"><p>Spol:</p></div>
            <div className="a-col-cetvrtina"><input    placeholder={this.state.spol ? "Ženski":"Muški"}
         disabled={true}/> </div>
         </div>
            <div className="a-col-pola">

         </div>
         </div>
         </div>
         <div className="odjeljak">
             
         <h3>Informacije o zaposlenju</h3>
         <div className="a-row">
            <div className="a-col-pola">
            <div className="a-col-cetvrtina"><p>Zaposlenje:</p></div>
            <div className="a-col-cetvrtina"><input    placeholder={this.state.zaposlenje}
         disabled={true}/> </div>
         </div>
            <div className="a-col-pola">

            <div className="a-col-cetvrtina"><p>Datum zapošljavanja:</p></div>
            <div className="a-col-cetvrtina"><input    placeholder={Moment(this.state.datum_zaposlj).format('DD.MM.YYYY.')}
         disabled={true}/> </div>
         </div>
         </div>
         </div>

         <div className="odjeljak">
         <h3>Kontakt podaci</h3>
         <div className="a-row">
            <div className="a-col-pola">
            <div className="a-col-cetvrtina"><p>*Adresa stanovanja:</p></div>
            <div className="a-col-cetvrtina"><input    placeholder='Adresa'
        value={this.state.adresa} onChange={(e) => { this.promijeniAdresu(e); this.provjeriUnos()} }/> </div>
        </div>
        <div className="a-col-pola">
        <div className="a-col-cetvrtina"><p>Grad:</p></div>
        <div className="a-col-cetvrtina"><input    placeholder='Grad'
        value={this.state.grad} onChange={(e) => { this.promijeniGrad(e); this.provjeriUnos()} }/> </div>
        </div>
         </div>

         <div className="a-row">
            <div className="a-col-pola">
            <div className="a-col-cetvrtina"><p>Država:</p></div>
            <div className="a-col-cetvrtina"><input    placeholder='Drzava'
        value={this.state.drzava} onChange={(e) => { this.promijeniDrzavu(e); this.provjeriUnos()} }/> </div>
        </div>
        <div className="a-col-pola">
        
        
        </div>
         </div>

         <div className="a-row">
            <div className="a-col-pola">
            <div className="a-col-cetvrtina"><p>*Broj telefona:</p></div>
            <div className="a-col-cetvrtina"><input    placeholder='Broj telefona'
        value={this.state.tel} onChange={(e) => { this.promijeniBrTel(e); this.provjeriUnos()} }/> </div>
        </div>
        <div className="a-col-pola">
        <div className="a-col-cetvrtina"><p>*E-mail:</p></div>
        <div className="a-col-cetvrtina"><input    placeholder='E-mail'
        value={this.state.mail} onChange={(e) => { this.promijeniEmail(e); this.provjeriUnos()} }/> </div>
        
        </div>
         </div>
        </div>
        <div className="odjeljak">
         <h3>Lični podaci</h3>
         <div className="a-row">
            <div className="a-col-pola">
            <div className="a-col-cetvrtina"><p>JMBG:</p></div>
            <div className="a-col-cetvrtina"><input    placeholder={this.state.jmbg}
         disabled={true}/> </div>
        </div>
        <div className="a-col-pola">
        <div className="a-col-cetvrtina"><p>Datum rođenja:</p></div>
        <div className="a-col-cetvrtina"><input    placeholder={Moment(this.state.dat_rodj).format('DD.MM.YYYY.')}
         disabled={true}/> </div>
        
        </div>
         </div>
         <div className="a-row">
            <div className="a-col-pola">
            <div className="a-col-cetvrtina"><p>Mjesto rođenja:</p></div>
            <div className="a-col-cetvrtina"><input    placeholder={this.state.mjesto_rodj}
         disabled={true}/> </div>
        </div>
        <div className="a-col-pola">
        <div className="a-col-cetvrtina"> <p>Država rođenja:</p> </div>
        <div className="a-col-cetvrtina"> <input    placeholder={this.state.drzava_rodj}
         disabled={true}/> </div>
        </div>
        
        </div>
         </div>
         <div>
          {this.state.error && <Alert color="danger" fade={false}>
            <p style={{color: "red", fontWeight: "bold", textAlign:"center"}}>Polja označena zvjezdicom ne smiju biti prazna!</p>
          </Alert>}
          </div>
         <div className="dno">
            <button type="button" class="btn btn-info btn-lg btn-block" onClick={this.upisiIzmjeneUBazu.bind(this)}>Sačuvaj izmijenjeno</button>
            
          </div>
         </div>

         
         
       
      </div>
    )
  }
}
export default withRouter(RadnikMojProfil);