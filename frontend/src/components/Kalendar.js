import React, { Component } from 'react';
import Calendar from 'react-calendar';
import Datum from './Datum'

export default class Kalendar extends Component {
  state = {
    date: new Date(),
    
  }

  onChange = date => this.setState({ date })

  render() {
    return (
      <div>
          
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
          
        />
      </div>
      
    );
  }
}