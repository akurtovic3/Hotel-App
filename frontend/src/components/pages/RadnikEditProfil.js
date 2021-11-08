import React from 'react'
import NavbarRadnik from '../NavbarRadnik'
import Moment from "moment"
import './RadnikEditProfil.css'
import jane from '../../images/jane-doe.jpg';
import john from '../../images/john-doe.png';
import { Link, withRouter } from 'react-router-dom';
import Axios from "axios"
import Modal from 'react-modal';

import { Button } from 'react-bootstrap';
import Alert from "reactstrap/lib/Alert";
class RadnikMojProfil extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props.location.state.info,
      info: props.location.state.info,
      photoMale: john,
      photoFemale: jane,
      error: false,
      modal: false,
      podaci: props.location.state.info
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

    this.hideModal = this.hideModal.bind(this);
    this.showModal2 = this.showModal2.bind(this);
    console.log("edit")
    console.log(this.state);

  }
  upisiIzmjeneUBazu = () => {
    if (this.provjeriUnos()) {
      Axios.put("http://localhost:3001/updateRadnik",
        {
          id: this.state.id,
          ime: this.state.ime,
          prezime: this.state.prezime,
          mail: this.state.mail,
          tel: this.state.tel,
          username: this.state.username,
          adresa: this.state.adresa,
          grad: this.state.grad,
          drzava: this.state.drzava,
        }).then((result) => {
          console.log("nakon updatea")
          Axios.get("http://localhost:3001/zaposlenik?id=" + this.state.id).then(result => {
            console.log(result);
            console.log(result.data);
            this.setState({ podaci: result.data[0] })
            this.showModal2();
          });

        })
    }
  }
  provjeriUnos = () => {
    if (this.state.ime !== "" && this.state.mail !== "" && this.state.prezime !== "" && this.state.tel !== "" && this.state.username !== "" && this.state.adresa !== "") {
      this.setState(state => ({
        ...state,
        error: false
      })); return true;
    } else {
      this.setState(state => ({
        ...state,
        error: true
      })); return false;
    }
  }

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
  hideModal = () => {
    this.setState(state => ({
      ...state,
      modal: false,
    }))
    this.props.history.push("/radnik-profil", { info: this.state.podaci });
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }
  showModal2 = () => {

    this.setState(state => ({
      ...state,
      modal: true
    }))

  }

  render() {
    return (
      <div className="profile-page-edit">
        <NavbarRadnik props={this.state.info} />
        <div className="edit-profil-container">
          <h2 className="naslov-edit-profil">Forma za promjenu podataka na ličnom profilu</h2>

          <div className="odjeljak">
            <h3>Osnovne informacije</h3>
            <div className="a-row">
              <div className="a-col-pola">
                <p>*Ime: </p>
                <input placeholder='Ime'
                  value={this.state.ime} onChange={(e) => { this.promijeniIme(e); this.provjeriUnos() }} />
              </div>

              <div className="a-col-pola">
                <p>*Prezime:</p>
                <input placeholder='Prezime'
                  value={this.state.prezime} onChange={(e) => { this.promijeniPrezime(e); this.provjeriUnos() }} /> </div>

            </div>


            <div className="a-row">
              <div className="a-col-pola">
                <p>*Korisničko ime:</p><input placeholder='Korisničko ime'
                  value={this.state.username} style={{ marginLeft: "10px" }} onChange={(e) => { this.promijeniUsername(e); this.provjeriUnos() }} />
              </div>
              <div className="a-col-pola"><p>ID zaposlenika:</p><input placeholder={this.state.id} size={30}
                disabled={true} />
              </div>
            </div>
          </div>
          <div className="odjeljak">

            <h3>Informacije o zaposlenju</h3>
            <div className="a-row">
              <div className="a-col-pola">
                <p>Zaposlenje:</p> <input placeholder={this.state.zaposlenje} disabled={true} />
              </div>
              <div className="a-col-pola">
                <p>Datum zapošljavanja:</p> <input placeholder={Moment(this.state.datum_zaposlj).format('DD.MM.YYYY.')} disabled={true} />
              </div>
            </div>
          </div>

          <div className="odjeljak">
            <h3>Kontakt podaci</h3>
            <div className="a-row">
              <div className="a-col-pola"><p>*Adresa stanovanja:</p>
                <input placeholder='Adresa'
                  value={this.state.adresa} onChange={(e) => { this.promijeniAdresu(e); this.provjeriUnos() }} />
              </div>
              <div className="a-col-pola"><p>Grad:</p>
                <input placeholder='Grad'
                  value={this.state.grad} onChange={(e) => { this.promijeniGrad(e); this.provjeriUnos() }} /> </div>

            </div>

            <div className="a-row">
              <div className="a-col-pola">
                <p>Država:</p> <input placeholder='Drzava'
                  value={this.state.drzava} onChange={(e) => { this.promijeniDrzavu(e); this.provjeriUnos() }} />
              </div>
              <div className="a-col-pola">
                <p>*Broj telefona:</p><input placeholder='Broj telefona'
                  value={this.state.tel} onChange={(e) => { this.promijeniBrTel(e); this.provjeriUnos() }} />


              </div>
            </div>

            <div className="rowe">
              <div className="a-col-pola"> <p>*E-mail:</p><input placeholder='E-mail'
                value={this.state.mail} onChange={(e) => { this.promijeniEmail(e); this.provjeriUnos() }} />  </div>
            </div>

          </div>
          <div className="odjeljak-zadnji">
            <h3>Lični podaci</h3>
            <div className="a-row">
              <div className="a-col-pola"><p>JMBG:</p><input placeholder={this.state.jmbg}
                disabled={true} />
              </div>
              <div className="a-col-pola"><p>Datum rođenja:</p><input placeholder={Moment(this.state.dat_rodj).format('DD.MM.YYYY.')}
                disabled={true} />

              </div>
            </div>
            <div className="a-row">
              <div className="a-col-pola"><p>Mjesto rođenja:</p><input placeholder={this.state.mjesto_rodj}
                disabled={true} />
              </div>
              <div className="a-col-pola">
                <p>Država rođenja:</p>  <input placeholder={this.state.drzava_rodj}
                  disabled={true} />

              </div>

            </div>
          </div>
          <div>
            {this.state.error && <Alert color="danger" fade={false}>
              <p style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>Polja označena zvjezdicom ne smiju biti prazna!</p>
            </Alert>}
          </div>
          <div className="dno">
            <button type="button" class="btn btn-info btn-lg btn-block" onClick={this.upisiIzmjeneUBazu.bind(this)}>Sačuvaj izmijenjeno</button>

          </div>
          <Modal
            isOpen={this.state.modal}
            onRequestClose={this.showModal2.bind(this)}
            contentLabel="My dialog"
            className="mymodal"
            overlayClassName="myoverlay"
            closeTimeoutMS={200}
          >


            <h4>Uspješno ste ažurirali vaše podatke!</h4>
            <div className="dugmad">
              <Button variant="info" size="lg" onClick={this.hideModal.bind(this)}>Uredu</Button>
            </div>
          </Modal>
        </div>
        <br></br>
        <br></br>


      </div>

    )
  }
}
export default withRouter(RadnikMojProfil);