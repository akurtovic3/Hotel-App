import React,{useState} from 'react';
import '../App.css';
import './Button.css';
import { Link, Route, useHistory, withRouter } from 'react-router-dom';
import './HeroSection.css';
import Datum from './Datum'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from './Button';

import moment from 'moment'


class HeroSection extends React.Component{
  //const [startDate, setStartDate] = useState(new Date());
  //const [endDate, setEndDate] = useState(new Date());
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: moment(moment(new Date())).add(1, 'd')._d
    };
  }
  render() {
  return (
    <div className='hero-container'>
         <video src='/videos/video-1.mp4' autoPlay loop muted />
         <div className="date-container">
      <div > 
      
        <p >Datum dolaska:</p>
        <DatePicker filterDate={d => {
          return new Date() <d;
              }}
          selected={this.state.startDate}
          selectsStart
          startDate={this.state.startDate}
          endDate={this.state.endDate} // add the endDate to your startDate DatePicker now that it is defined
          onChange={date => this.setState(state => ({
            startDate: date,
            endDate: this.state.endDate<date? moment(moment(new Date(date))).add(1, 'd')._d : this.state.endDate
          }))}
        />
      </div>
      
      <div >
      
      <p>Datum odlaska:</p>
       <DatePicker filterDate={d => {
          return new Date() < this.state.startDate;
              }}
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
      <div >
      <Route render={({ history}) => (
    <button
    className={`btn btn--outline`}
    id="rezervisi-btn"
    style={{ backgroundColor:"#5F9EA0", opacity:"80%", border: "2px solid white", color:"white", fontWeight: "1px", marginTop:"19px", fontSize:"20px",textShadow:"-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000, 1px 1px 0 #000;"}}
      onClick={() => { history.push('/rezervacija/0', {
        ponuda:false,
        info:{startDate:this.state.startDate, endDate:this.state.endDate}
      }) }}
    >
      Rezerviši sada
    </button>
  )} />
  {/*}
      <Link to={{
            pathname: `/rezervacija`,
            state: {}
          }} className='btn-mobile'>
        <button
          className={`btn btn--outline btn--medium`}
        >
          Rezerviši sada
        </button>
        </Link>*/}
      
      </div>
      
      </div>
      
    </div>
    
  );
            }
}

export default withRouter(HeroSection);