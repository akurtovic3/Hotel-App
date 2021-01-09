import React, { useState } from 'react'

class ReservationData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ime : props.ime,
      prezime : props.prezime,
      checkin: props.checkin,
      checkout: props.checkout,
      br_odraslih: props.br_odraslih,
      br_djece: props.br_djece,
      

    };
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is .</h2>
      </div>
    );
  }
}

export default ReservationData;