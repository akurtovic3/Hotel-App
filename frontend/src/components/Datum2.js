import React, { useState, Component } from 'react';
import { alert } from 'react-alert'
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Datum2 extends React.Component {
  // Declare a new state variable, which we'll call "coun
  constructor(props) {
    super(props);
    var poc = new Date();
    if (props.ponuda && moment(props.period_poc).format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD'))
      poc = new Date(props.period_poc)
    this.state = {
      startDate: props.ponuda ? (new Date(props.period_poc) > new Date(props.startDate) ? new Date(props.period_poc) : new Date(props.startDate)) : new Date(props.startDate),
      endDate: props.ponuda ? (new Date(props.period_poc) > new Date(props.startDate) ? moment(moment(new Date(props.period_poc))).add(1, 'd')._d : moment(moment(new Date(props.startDate))).add(1, 'd')._d) : moment(props.startDate).format('YYYY-MM-DD') === moment(props.endDate).format('YYYY-MM-DD') ? moment(moment(new Date(props.startDate))).add(1, 'd')._d : props.endDate,
      period_poc: props.ponuda ? poc : new Date(),
      period_kraj: props.ponuda ? new Date(props.period_kraj) : new Date(),
      ponuda: props ? props.ponuda : false

    };
    props.handle2(this.state.endDate, this.state.startDate)
    console.log(props)
    console.log(this.state)
  }
  render() {

    return (
      <div className="date-container-2">
        <div className="first-column-2">
          <i class="far fa-calendar-alt"></i>
          <p>Datum dolaska:</p>

          {this.state.ponuda && <DatePicker
            format="dd-MM-yyyy"
            selected={this.state.startDate}
            selectsStart
            startDate={this.state.startDate}
            minDate={this.state.period_poc}
            maxDate={this.state.period_kraj}
            endDate={this.state.endDate} // add the endDate to your startDate DatePicker now that it is defined
            onChange={date => {
              var izmjena = moment(this.state.endDate).format('YYYY-MM-DD') <= moment(date).format('YYYY-MM-DD') ? true : false;
              this.setState(state => ({
                ...state,
                startDate: (moment(date).format('YYYY-MM-DD') >= moment(this.state.period_poc).format('YYYY-MM-DD')) ? date : this.state.period_poc,
                endDate: (moment(date).format('YYYY-MM-DD') >= moment(this.state.period_poc).format('YYYY-MM-DD')) ? moment(this.state.endDate).format('YYYY-MM-DD') <= moment(date).format('YYYY-MM-DD') ? moment(moment(new Date(date))).add(1, 'd')._d : this.state.endDate : moment(moment(new Date(this.state.period_poc))).add(1, 'd')._d,
              }));
              console.log("your value 2 -->", (date >= this.state.period_poc) ? date : this.state.period_poc)
              this.props.handle1(this.state.startDate, this.state.endDate, izmjena);
            }}
          />}
          {!this.state.ponuda && <DatePicker
            format="dd-MM-yyyy"
            selected={this.state.startDate}
            selectsStart
            startDate={this.state.startDate}
            minDate={this.state.ponuda ? this.state.period_poc : new Date()}
            endDate={this.state.endDate} // add the endDate to your startDate DatePicker now that it is defined
            onChange={date => {
              var izmjena = moment(this.state.endDate).format('YYYY-MM-DD') <= moment(date).format('YYYY-MM-DD') ? true : false;
              this.setState(state => ({
                ...state,
                startDate: date,
                endDate: moment(this.state.endDate).format('YYYY-MM-DD') <= moment(date).format('YYYY-MM-DD') ? moment(moment(new Date(date))).add(1, 'd')._d : this.state.endDate
              }));
              this.props.handle1(this.state.startDate, this.state.endDate, izmjena);
            }}
          />}
        </div>

        <div className="second-column-2">
          <i class="far fa-calendar-alt"></i>
          <p>Datum odlaska:</p>
          {this.state.ponuda && <DatePicker filterDate={d => {
            return new Date() < this.state.startDate;
          }}
            format="dd-MM-yyyy"
            selected={this.state.endDate}
            selectsEnd
            startDate={this.state.startDate}
            endDate={this.state.startDate}
            minDate={this.state.startDate}
            maxDate={this.state.period_kraj}
            onChange={date => {
              this.setState(state => ({
                endDate: moment(date).format('YYYY-MM-DD') === moment(this.state.startDate).format('YYYY-MM-DD') ? moment(moment(new Date(date))).add(1, 'd')._d : date,
              }));
              this.props.handle2(date, this.state.startDate);
              console.log("-----------------------------------")
              console.log(this.state.endDate)
              console.log(this.state.startDate)
            }}
          />}
          {!this.state.ponuda && <DatePicker filterDate={d => {
            return new Date() < this.state.startDate;
          }}
            format="dd-MM-yyyy"
            selected={this.state.endDate}
            selectsEnd
            startDate={this.state.startDate}
            endDate={this.state.startDate}
            minDate={this.state.startDate}
            onChange={date => {

              this.setState(state => ({
                endDate: moment(date).format('YYYY-MM-DD') === moment(this.state.startDate).format('YYYY-MM-DD') ? moment(moment(new Date(date))).add(1, 'd')._d : date,
              }));
              this.props.handle2(date, this.state.startDate);
            }}
          />}
        </div>
      </div>
    );

  }

}

export default Datum2;