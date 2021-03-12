import React, {Component} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";
import { GrNext, GrBack } from 'react-icons/gr';
import {IoIosArrowBack,IoIosArrowForward} from 'react-icons/io'
import Button from 'react-bootstrap/Button';

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
                { name: "Soba 1", id: "R1"},
                { name: "Soba 2", id: "R2"},
                { name: "Soba 3", id: "R3"},
                { name: "Soba 4", id: "R4"},
                { name: "Soba 5", id: "R5"},
                { name: "Soba 6", id: "R6"},
                { name: "Soba 7", id: "R7"},
                { name: "Soba 8", id: "R8"},
                { name: "Soba 9", id: "R9"},
                { name: "Soba 10", id: "R10"},
                { name: "Soba 11", id: "R11"},
                { name: "Soba 12", id: "R12"},
                { name: "Soba 13", id: "R13"},
                { name: "Soba 14", id: "R14"},
                { name: "Soba 15", id: "R15"},
                { name: "Soba 16", id: "R16"},
                { name: "Soba 17", id: "R17"},
                { name: "Soba 18", id: "R18"},
                { name: "Soba 19", id: "R19"},
                { name: "Soba 20", id: "R20"},
            ],
            events: [
                {
                  id: 1,
                  text: "Amina Kurtović",
                  start: "2021-03-09",
                  end: "2021-03-20",
                  resource: "R1"
                },
                {
                    id: 2,
                    text: "Emina Zahirović",
                    start: "2021-04-09",
                    end: "2021-04-14",
                    resource: "R5"
                  },
                // ...
              ],
              timeRangeSelectedHandling: "Disabled",
                eventMoveHandling: "Disabled",
                eventResizeHandling: "Disabled",
                eventDeleteHandling: "Disabled",
                eventClickHandling: "Disabled",
                eventRightClickHandling: "Disabled"
        };
        this.promijeniMjesecNext = this.promijeniMjesecNext.bind(this);
        this.promijeniMjesecBack = this.promijeniMjesecBack.bind(this);
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

export default Scheduler;