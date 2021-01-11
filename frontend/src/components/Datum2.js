import React, { useState, Component } from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Datum2 extends React.Component{
  // Declare a new state variable, which we'll call "coun
  constructor(props) {
    super(props);
    this.state = {
      startDate: props?new Date(props.startDate):new Date(),
      endDate: props?new Date(props.endDate):new Date()

    };
  }
  render() {
  
  return (
      <div className="date-container-2">
      <div className="first-column-2"> 
      <i class="far fa-calendar-alt"></i>
        <p>Datum dolaska:</p>
        <DatePicker filterDate={d => {
          return new Date() <d;
              }}
          selected={this.state.startDate}
          selectsStart
          startDate={this.state.startDate}
          endDate={this.state.endDate} // add the endDate to your startDate DatePicker now that it is defined
          onChange={date => {this.setState(state => ({
            startDate: date,
            endDate:date
          }));
          this.props.handle1(date);
          }}
        />
      </div>
      
      <div className="second-column-2">
      <i class="far fa-calendar-alt"></i>
      <p>Datum odlaska:</p>
       <DatePicker filterDate={d => {
          return new Date() < this.state.startDate;
              }}
          selected={this.state.endDate}
          selectsEnd
          startDate={this.state.startDate}
          endDate={this.state.startDate}
          minDate={this.state.startDate}
          onChange={date => {this.setState(state => ({
            endDate: date
          })); 
          this.props.handle2(date);
        }}
        />
      </div>
      </div>
    );
     
            }
  
}

export default Datum2;