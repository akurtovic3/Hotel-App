
import React, { Component } from 'react'
import moment from 'moment'

import NavbarRadnik from '../NavbarRadnik'
import './RadnikPregledRez.css'

import DatePicker from "react-datepicker";




const today = moment().format('YYYY-MM-DD')
class RadnikPregledSpecPon extends Component {
  constructor(props) {
    super(props);

    const specPon = [];
    

    for (let i = 0; i < 10; i++) {
        specPon.push({
            vaziOd: "04/03/2021",
            vaziDo: "10/03/2021",
            sobeNaPopustu: [1,2,3],
            nazivSpecPon: "Rani booking",
            popust: 20  

        });
    }

    this.state = { 
      startDate: new Date(),
      endDate: new Date(),
      brSobe: 1, //Za pretraživanje broja sobe koja je spada u spec ponudu
      specPon };

     
      this.handleChangeBrSobe = this.handleChangeBrSobe.bind(this);
      
}


handleChangeBrSobe(event) {
  this.setState({pocDate: this.state.pocDate , brSobe: event.target.value, rezervacija: this.state.rezervacija});

  
}

   

  render () {
    return (
      <>
      <NavbarRadnik/>
      <div className="maincontainer">
      
       
        <h1 className="naslov">Pregled specijalnih ponuda</h1>

        <div className="filter">
        <h4 className="animation">Filteri</h4>
       
        <div className="filt-dio-1">
        <div className="rowe">
          <p>Specijalne ponude u vremenskom opsegu:</p>
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
          <p>Pretražite po nazivu specijalne ponude</p>
          <input type="text" name="name" style={{width: "200px"}} placeholder="Naziv specijalne ponude"/>
            
          </div>
          
          <div class="column">
          <p>Pretražite da li je soba uključena u neku ponudu</p>
            <input type="number" id="brSobe" name="brSobe"  min="1" max="13"  onInput={this.handleChangeBrSobe.bind(this)} style={{width: "130px"}} placeholder="Broj sobe [1,13]"></input>
          </div>

          <div class="column">
             
          </div>

        </div>
            
        </div>
        
        <div className="container-table">
        <h4 className="animation">Lista</h4>
        
        <table class="table table-hover"  >
          <thead>
            <tr>
              <th>Naziv specijalne ponude</th>
              <th>Važi od</th>
              <th>Važi do</th>
              <th>Sobe u ponudi</th>
              <th>Veličina popusta [%]</th>
            </tr>
          </thead>
          <tbody>
          {this.state.specPon.map((result) => {
            return (
             
                 <tr>
                  <td>{result.nazivSpecPon}</td>
                  <td>{result.vaziOd}</td>
                  <td>{result.vaziDo}</td>
                  <td>{result.sobeNaPopustu.map((s) =>(<>{s}  </>))}</td>
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

export default RadnikPregledSpecPon