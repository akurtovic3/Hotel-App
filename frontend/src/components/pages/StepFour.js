import React, { useState } from 'react'

class ReservationData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ime : props.ime,
      prezime : props.prezime,
      

    };
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}