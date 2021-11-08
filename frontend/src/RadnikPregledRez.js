import { InfoCircleOutlined } from '@ant-design/icons'
import React, { Component } from 'react'
import moment from 'moment'
import NavbarRadnik from './components/NavbarRadnik'
import './components/pages/RadnikPregledRez.css'
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { GrEdit } from 'react-icons/gr';
import { BsFillTrashFill } from 'react-icons/bs'
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import Axios from "axios"
import items from "./data";
import { Route, withRouter } from "react-router-dom";
import Icon from '@ant-design/icons';

import { GrClose } from 'react-icons/gr'
import { BsDot } from 'react-icons/bs';
import { GrUserManager } from 'react-icons/gr'
import DetailsSvg from './icon/details.svg';
const today = moment().format('YYYY-MM-DD')
class RadnikPregledRez extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      ...props.location.state.info,
      rezervacije: props.location.state.stari_state ? props.location.state.stari_state.rezervacije : [],
      startDate: props.location.state.stari_state ? props.location.state.stari_state.startDate : new Date(),
      endDate: props.location.state.stari_state ? props.location.state.stari_state.endDate : new Date("2021-12-31"),
      mijanjanEndDate: props.location.state.stari_state ? props.location.state.stari_state.mijenjanEndDate : false,
      brSobe: props.location.state.stari_state ? props.location.state.stari_state.brSobe : "",
      ime: props.location.state.stari_state ? props.location.state.stari_state.ime : "",
      prezime: props.location.state.stari_state ? props.location.state.stari_state.prezime : "",
      brGostiju: props.location.state.stari_state ? props.location.state.stari_state.brGostiju : -1,
      modal: false,
      modal2: false,
      info: props.location.state.info,
      imena: props.location.state.stari_state ? props.location.state.stari_state.imena : [],
      prezimena: props.location.state.stari_state ? props.location.state.stari_state.prezimena : [],
      sobe: props.location.state.stari_state ? props.location.state.stari_state.sobe : [],
      itemi: this.formatData(items),
      brisanje_id: -1
    }
    this.Filtriraj();
    /*
    console.log("info u pregledu rez")
    console.log(this.state.info)
    //var itemi=this.formatData(items)
    if(props.location.state.stari_state) this.Filtriraj()
    else
    Axios.get("http://localhost:3001/pregledRezervacija").then((result, fields)=>{
      var rezerv=result.data;
      this.setState(state => ({
        ...state,
        rezervacije:[]
      }))
      console.log("lista rezervacija")
      console.log(result.data)
      rezerv.map((rez,i)=>{
        Axios.get("http://localhost:3001/korisnik?id="+rez.id_korisnik).then((result, fields)=>{
     //     console.log(result.data)
     console.log(rez.id_rezervacije+" " + rez.id_korisnik+" "+rez.id_soba-1 +" "+result.data[0].ime)
     if(rez.id_soba>=1 && rez.id_soba<=12){
     
     rez["ime"]=result.data[0].ime;
     rez["prezime"]=result.data[0].prezime;
     rez["soba"]=this.state.itemi[rez.id_soba-1].name;
     
     rez["email"]=result.data[0].email;
     rez["brojTel"]=result.data[0].br_tel;
     var niz=[...this.state.rezervacije, rez]
       niz.sort(function(a,b){
        return new Date(a.start_date) - new Date(b.start_date);
      });
       this.setState({rezervacije:niz}) 
    }})
     })
  });*/
    /*    this.setState(state => ({
         ...state,
        //rezerv[i]["ime"]=result.data[0].ime;
        //rezerv[i]["prezime"]=result.data[0].prezime;
         imena: [...this.state.imena, result.data[0].ime],
        prezimena: [...this.state.prezimena, result.data[0].prezime],
        sobe:[...this.state.sobe, this.state.itemi[rez.id_soba-1].name]
       }))*/



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



    this.handleChangeBrSobe = this.handleChangeBrSobe.bind(this);
    this.handleChangeBrGostiju = this.handleChangeBrGostiju.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showModal2 = this.showModal2.bind(this);

  }

  componentDidMount() {
    window.scrollTo(0, 0)
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
  obrisiRezervaciju = () => {
    console.log("id rezervacije " + this.state.brisanje_id)
    //console.log(this.state.rezervacije[id])
    /*this.state.rezervacije.map((r)=>{
      if(r.id_rezervacije==id)
        console.log(r)
    })*/
    if (this.state.brisanje_id != -1)
      Axios.delete("http://localhost:3001/obrisiRezervaciju?id=" + this.state.brisanje_id).then((result, fields) => {
        this.showModal2();

      })

  }
  ponistiFiltere = () => {
    this.setState({
      startDate: new Date(),
      endDate: new Date("2021-12-31"),
      brSobe: "",
      ime: "",
      prezime: "",
      brGostiju: -1,
    })
  }
  Filtriraj = () => {
    //var itemi=this.formatData(items)
    //console.log(itemi)
    console.log(this.state.mijenjanEndDate)
    Axios.get("http://localhost:3001/filtrirajPregledRezervacija?id_soba=" + this.state.brSobe + "&br_gostiju=" + this.state.brGostiju + "&ime=" + this.state.ime + "&prezime=" + this.state.prezime + "&start_date=" + moment(this.state.startDate).format('YYYY-MM-DD') + "&end_date=" + moment(this.state.endDate).format('YYYY-MM-DD') + "&mijenjanEndDate=" + this.state.mijanjanEndDate).then((result, fields) => {
      console.log(result.data)
      this.setState(state => ({
        ...state,
        rezervacije: [],
        imena: [],
        prezimena: [],
        sobe: []
      }))
      var rezerv = result.data;
      rezerv.map((rez, i) => {
        Axios.get("http://localhost:3001/korisnik?id=" + rez.id_korisnik).then((result, fields) => {
          console.log(result.data)
          if (rez.id_soba >= 1 && rez.id_soba <= 12 && rez.id_korisnik > 0) {
            console.log(rez.id_korisnik)
            rez["ime"] = result.data[0].ime;

            rez["prezime"] = result.data[0].prezime;
            rez["soba"] = this.state.itemi[rez.id_soba - 1].name + " - S" + rez.id_soba;
            rez["email"] = result.data[0].email;
            rez["brojTel"] = result.data[0].br_tel;
            var niz = [...this.state.rezervacije, rez]
            niz.sort(function (a, b) {
              // Turn your strings into dates, and then subtract them
              // to get a value that is either negative, positive, or zero.
              return new Date(a.start_date) - new Date(b.start_date);
            });
            this.setState({ rezervacije: niz })
          }

          //if(typeof this.state.itemi[rez.id_soba]!=='undefined')
          /* this.setState(state => ({
            ...state,
           
            imena: [...this.state.imena, result.data[0].ime],
           prezimena: [...this.state.prezimena, result.data[0].prezime],
               sobe:[...this.state.sobe, this.state.itemi[rez.id_soba-1].name]
          }))*/
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
    this.setState(state => ({ ...state, mijenjanEndDate: false }));
  }
  nadjiIme(id) {
    //let rez= await Axios.get("http://localhost:3001/korisnik?id="+id);
    return this.state.imena[id];
  }
  handleChangeBrSobe = (event) => {
    this.setState(state => ({ ...state, brSobe: event.target.value }));
  }
  handleChangeIme(event) {
    this.setState(state => ({ ...state, ime: event.target.value }));
  }
  handleChangePrezime(event) {
    this.setState(state => ({ ...state, prezime: event.target.value }));
  }
  handleChangeBrGostiju(event) {
    this.setState(state => ({ ...state, brGostiju: event.target.value }));
  }

  showModal = (id) => {
    this.setState(state => ({
      ...state,
      modal: true,
    }))

  }

  hideModal = () => {
    this.setState(state => ({
      ...state,
      modal: false,
      modal2: false
    }))
    //this.props.history.push('/radnik/pregled-rezervacija', {info:this.state.info, stari_state: this.state});
    this.Filtriraj();
  }
  showModal2 = () => {

    this.setState(state => ({
      ...state,
      modal2: true,
      brisanje_id: -1
    }))

  }


  provjeriJeLiPrazanNiz() {
    if (this.state.rezervacije.length != 0) return false;
    else return true;
  }

  render() {
    return (
      <>
        <NavbarRadnik props={this.state.info} />


        <div className="maincontainer">
          <h1 className="naslov">Pregled rezervacija</h1>




          <div className="filter">
            <h4 className="animation">Filteri</h4>

            <div className="filt-dio-1">
              <div className="rowe">
                <div className="column">
                  <p>Rezervacije u vremenskom opsegu:</p>
                </div>
                <div className="column-sp">
                  <p>Od:</p>
                  <DatePicker
                    selected={this.state.startDate}
                    selectsStart
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={date => this.setState(state => ({
                      ...state,
                      startDate: date,
                      endDate: moment(this.state.endDate).format('YYYY-MM-DD') <= moment(date).format('YYYY-MM-DD') ? moment(moment(new Date(date))).add(1, 'd')._d : this.state.endDate
                    }))}
                  />
                </div>

                <div className="column-sp">

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
                      mijanjanEndDate: true
                    }))}
                  />
                </div>
              </div>
            </div>
            <div class="rowe">
              <div class="column-sp">
                <p>Pretraži po klijentovim podacima:</p>
                <div className="rowe">
                  <input type="text" name="name" value={this.state.ime} onInput={this.handleChangeIme.bind(this)} style={{ width: "200px" }} placeholder="Ime klijenta" />
                  <p> </p>
                  <input type="text" name="name" value={this.state.prezime} onInput={this.handleChangePrezime.bind(this)} style={{ width: "200px" }} placeholder="Prezime klijenta" /></div>
              </div>

              <div class="column-sp">
                <p>Odaberite broj sobe:</p>
                <input type="number" id="brSobe" name="brSobe" value={this.state.brSobe} min="1" max="12" onInput={this.handleChangeBrSobe.bind(this)} style={{ width: "130px" }} placeholder="Broj sobe [1,12]"></input>
              </div>

              <div class="column-sp">
                <p>Odaberite broj gostiju:</p>
                <input type="number" id="brSobe" name="brSobe" value={this.state.brGostiju != -1 ? this.state.brGostiju : ""} min="1" max="6" onInput={this.handleChangeBrGostiju.bind(this)} style={{ width: "131px" }} placeholder="Broj gostiju [1,6]"></input>
              </div>

            </div>
            <div class="rowe">
              <div class="column">
                <button type="button" style={{ padding: "5px", width: "40%", height: "35px", color: "#17a2b8", background: "transparent", cursor: "pointer" }} class="btn" onClick={this.ponistiFiltere.bind(this)}><label style={{ cursor: "pointer" }}><GrClose className="iconn" /> Poništi filtere</label></button>
              </div>
            </div>
            <div class="rowe">
              <div class="column">
                <button type="button" class="btn btn-info btn-lg btn-block" onClick={this.Filtriraj.bind(this)}>Filtriraj</button>
              </div>
            </div>
            <p textAlign="center" style={{ marginBottom: "0px", fontSize: "12px" }}>*U listi se nalaze rezervacije čiji je datum dolaska veći ili jednak unesenom početnom datumu, a manji ili jednak krajnjem datumu u filteru!</p>
          </div>

          <div className="container-table">
            <h4 class="animation">Lista rezervacija</h4>

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

                {
                  this.state.rezervacije.map((result, i) => {

                    return (

                      <tr align="center" key={i}>
                        <td>  <td style={{ border: 'none' }}>{result.ime + " " + result.prezime}</td></td>
                        <td><td style={{ border: 'none' }} >{moment(result.start_date).format('DD.MM.YYYY.')}</td></td>
                        <td><td style={{ border: 'none' }} >{moment(result.end_Date).format('DD.MM.YYYY.')}</td></td>
                        <td><td style={{ border: 'none' }} >{result.soba}</td></td>
                        <td><td style={{ border: 'none' }} >{result.br_odraslih + result.br_djece}</td></td>
                        <td><td style={{ border: 'none' }} >{result.cijena}€</td></td>
                        <td>
                          <td style={{ border: 'none' }} >
                            <Link to={{
                              pathname: '/radnik/azuriraj-rezervaciju',
                              state: {
                                info: this.state.info,
                                rezervacija: this.state.rezervacije[i],
                                stari_state: this.state

                              },
                            }} >
                              <Button variant="link"><GrEdit size={20} /> </Button>
                            </Link>
                            <br /></td>
                          <td style={{ border: 'none' }} >
                            <Button variant="link" onClick={() => {//this.obrisiRezervaciju(i);
                              //console.log(result.id_rezervacije)
                              this.setState({ brisanje_id: result.id_rezervacije })
                              this.showModal()
                            }}><BsFillTrashFill size={20} /></Button>


                            <Modal
                              isOpen={this.state.modal}
                              onRequestClose={this.showModal.bind(this)}
                              contentLabel="My dialog"
                              className="mymodal"
                              overlayClassName="myoverlay"
                              closeTimeoutMS={200}
                            >
                              <div className="modal-1">
                                <h4 className="title-modal" >Brisanje rezervacije</h4>
                                <h5>Da li zaista želite obrisati izabranu rezervaciju?</h5>
                                <div className="dugmad">

                                  <Button variant="outline-secondary" size="lg" onClick={this.hideModal.bind(this)}>Ipak ne želim</Button>
                                  <Button variant="danger" size="lg" onClick={() => {
                                    this.obrisiRezervaciju();
                                  }}>Da</Button>
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
                                <Button variant="info" size="lg" onClick={this.hideModal.bind(this)}>Uredu</Button>
                              </div>
                            </Modal>
                          </td>
                        </td>
                        <td>
                          <td style={{ border: 'none' }} >
                            <Link to={{
                              pathname: '/radnik/info-rezervacija',
                              state: {
                                info: this.state.info,
                                rezervacija: this.state.rezervacije[i],
                                soba: this.state.rezervacije[i].soba,
                                stari_state: this.state
                              },
                            }} >
                              <Button variant="link"><InfoCircleOutlined /> </Button>
                            </Link>
                          </td>
                        </td>
                      </tr>

                    )

                  })}


              </tbody>
            </table>
            {this.provjeriJeLiPrazanNiz() && <h5 style={{ padding: "20px", color: "black", textAlign: "center", minWidth: "fit-content" }}>Nema rezervacija koje zadovoljavaju unesene kriterije.</h5>}

          </div>
          <br>
          </br>
          <br></br>
        </div>

      </>
    );
  }
}

export default withRouter(RadnikPregledRez)