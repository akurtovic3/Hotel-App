import React, {Component} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";
import { GrNext, GrBack } from 'react-icons/gr';
import {IoIosArrowBack,IoIosArrowForward} from 'react-icons/io'
import Button from 'react-bootstrap/Button';
import Axios from "axios"
import moment from 'moment'
import {  Route, withRouter } from "react-router-dom";

class Scheduler extends Component {

    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date(),
            /*startDate: "2021-03-01",*/
            days: 31,
            scale: "Day",
            timeHeaders: [
                { groupBy: "Month"},
                { groupBy: "Day", format: "d"}
            ],
            resources: [
                { name: "Soba 1 - kap: 1, 50€", id: "R1"},
                { name: "Soba 2 - kap: 1, 70€", id: "R2"},
                { name: "Soba 3 - kap: 2, 100€", id: "R3"},
                { name: "Soba 4 - kap: 3, 300€", id: "R4"},
                { name: "Soba 5 - kap: 4, 200€", id: "R5"},
                { name: "Soba 6 - kap: 3, 150€", id: "R6"},
                { name: "Soba 7 - kap: 1, 120€", id: "R7"},
                { name: "Soba 8 - kap: 2, 240€", id: "R8"},
                { name: "Soba 9 - kap: 3, 250€", id: "R9"},
                { name: "Soba 10 - kap: 4, 300€", id: "R10"},
                { name: "Soba 11 - kap: 5, 500€", id: "R11"},
                { name: "Soba 12 - kap: 6, 400€", id: "R12"},
            ],
            rezervacije:[],
            events: [],
              timeRangeSelectedHandling: "Disabled",
                eventMoveHandling: "Disabled",
                eventResizeHandling: "Disabled",
                eventDeleteHandling: "Disabled",
                eventClickHandling: "Disabled",
                eventRightClickHandling: "Disabled"
        };
        this.ucitajRezervacije();
        this.promijeniMjesecNext = this.promijeniMjesecNext.bind(this);
        this.promijeniMjesecBack = this.promijeniMjesecBack.bind(this);
    }
    ucitajRezervacije=()=>{
      Axios.get("http://localhost:3001/rezervacije").then((result, fields)=>{
      var rezerv=result.data;
      this.setState(state => ({
        ...state,
        rezervacije:result.data,
        events:[]
      }))
      console.log("lista rezervacija u kalendaru")
      console.log(result.data)
      let eventi=[];
      rezerv.map((rez,i)=>{
        Axios.get("http://localhost:3001/korisnik?id="+rez.id_korisnik).then((result, fields)=>{
     //     console.log(result.data)
     
     this.setState(state => ({
      ...state,
    // rezerv[i]["ime"]=result.data[0].ime;
    // rezerv[i]["prezime"]=result.data[0].prezime;
      events: [...this.state.events, {id:i, text:result.data[0].ime+" "+result.data[0].prezime, start:moment(rez.start_date).format('YYYY-MM-DD'), end:moment(rez.end_Date).format('YYYY-MM-DD'), resource:"R"+rez.id_soba}]
    }))
    //console.log(rez.id_rezervacije+" " + rez.id_korisnik+" "+result.data[0].ime)
      })
    })
      
    })
    }
    promijeniMjesecNext() {
        var d = new Date(this.state.startDate)
        d.setMonth(d.getMonth() + 1);
        console.log(d)
        
        this.setState(state => ({
          ...state,
          startDate: d
        }))
        
      }

      promijeniMjesecBack() {
        var d = new Date(this.state.startDate)
        d.setMonth(d.getMonth() - 1);
        console.log(d)
        
        this.setState(state => ({
          ...state,
          startDate: d
        }))
        
      }

    render() {
        var {...config} = this.state;
        return (
            <>
                <div className="zauzetost-container">
                <h2 className="naslov-zauzetost">Pregled zauzetosti</h2>
                <Button variant="outline-secondary" onClick={this.promijeniMjesecBack}><IoIosArrowBack/></Button>
                <Button variant="outline-secondary" onClick={this.promijeniMjesecNext}><IoIosArrowForward/></Button>
                
                    <DayPilotScheduler
                        {...config}
                        
                        ref={component => { this.scheduler = component && component.control; }}
                        
                    />
                    
                    
                </div>
            </>
        );
    }
}

export default withRouter(Scheduler);