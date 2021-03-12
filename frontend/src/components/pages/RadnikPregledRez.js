
import React, { Component } from 'react'
import moment from 'moment'
import NavbarRadnik from '../NavbarRadnik'
import './RadnikPregledRez.css'
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import {GrEdit} from 'react-icons/gr';
import {BsFillTrashFill} from 'react-icons/bs'
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';


const today = moment().format('YYYY-MM-DD')
class RadnikPregledRez extends Component {
  constructor(props) {
    super(props);

    const rezervacija = [];
    

    for (let i = 0; i < 10; i++) {
        rezervacija.push({
            in: "2021-03-04",
            out: "2021-03-10",
            soba: 1,
            ime: "Emina Zahirovic",
            brGost: "2"

        });
    }

    this.state = { 
      startDate: new Date(),
      endDate: new Date(),
      brSobe: 1,
      brGostiju: 1,
      modal: false,
      modal2: false,
      rezervacija };

     
      this.handleChangeBrSobe = this.handleChangeBrSobe.bind(this);
      this.handleChangeBrGostiju = this.handleChangeBrGostiju.bind(this);
      this.showModal = this.showModal.bind(this);
      this.hideModal = this.hideModal.bind(this);
      this.showModal2 = this.showModal2.bind(this);
      
}


handleChangeBrSobe(event) {
  this.setState({pocDate: this.state.pocDate , brSobe: event.target.value, brGostiju:this.state.brGostiju, rezervacija: this.state.rezervacija});
}
handleChangeBrGostiju(event) {
  this.setState({pocDate: this.state.pocDate , brSobe: this.state.brSobe, brGostiju:event.target.value, rezervacija: this.state.rezervacija});
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


   

  render () {
    return (
      <>
      <NavbarRadnik/>
     
      <div className="maincontainer">
      
       
        <h1 className="naslov">Pregled rezervacija</h1>

        <div className="filter">
        <h4 className="animation">Filteri</h4>
      
        <div className="filt-dio-1">
        <div className="rowe">
          <p>Rezervacije u vremenskom opsegu:</p>
            <div className="column"> 
            <p>Od:</p>
            <DatePicker 
                selected={this.state.startDate}
                selectsStart
                startDate={this.state.startDate}
                endDate={this.state.endDate} 
                onChange={date => this.setState(state => ({
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
                  endDate: date
                }))}
              />
          </div>
          </div>
        </div>
        <div class="rowe">
          <div class="column">
          <p>Pretraži po imenu klijenta</p>
          <input type="text" name="name" style={{width: "200px"}} placeholder="Ime klijenta"/>
            
          </div>
          
          <div class="column">
          <p>Odaberite broj sobe</p>
            <input type="number" id="brSobe" name="brSobe"  min="1" max="13"  onInput={this.handleChangeBrSobe.bind(this)} style={{width: "130px"}} placeholder="Broj sobe [1,13]"></input>
          </div>

          <div class="column">
             <p>Odaberite broj gostiju</p>
            <input type="number" id="brSobe" name="brSobe"  min="1" max="6"  onInput={this.handleChangeBrGostiju.bind(this)} style={{width: "131px"}} placeholder="Broj gostiju [1,6]"></input>
          </div>

        </div>
            
        </div>
        
        <div className="container-table">
        <h4 class="animation">Lista</h4>
        
        <table class="table table-hover"  >
          <thead>
            <tr>
              <th>Ime</th>
              <th>Dolazak</th>
              <th>Odlazak</th>
              <th>Soba</th>
              <th>Broj gostiju</th>
              <th>Izmijeni</th>
              
            </tr>
          </thead>
          <tbody>
          {this.state.rezervacija.map((result) => {
            return (
             
                 <tr>
                  <td>{result.ime}</td>
                  <td>{result.in}</td>
                  <td>{result.out}</td>
                  <td>{result.soba}</td>
                  <td>{result.brGost}</td>
                  <td>
                  <Link to='/radnik/azuriraj-rezervaciju' >
                    <Button variant="link"><GrEdit size={20}/> </Button>
                    </Link>
                  <br/>
                  <br/>
                  <Button variant="link" onClick={this.showModal.bind(this)}><BsFillTrashFill size={20}/></Button>
                  
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
                      <Button variant="danger" size="lg" onClick={this.showModal2.bind(this)}>Da</Button>
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

export default RadnikPregledRez