import React, { Component } from 'react';
const opcije = [0, 1, 2, 3, 4, 5, 6]
export default class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueDjeca: props.pocetniDjeca ? props.pocetniDjeca : 0,
      valueOdrasli: props.pocetniOdrasli ? props.pocetniOdrasli : 1
    };


    this.handleChange = this.handleChange.bind(this);
    console.log(this.state)
    console.log(props)

  }

  handleChange(event) {
    if (this.props.id == "djeca")
      this.setState({ valueDjeca: event.target.value, valueOdrasli: this.state.valueOdrasli });
    else
      this.setState({ valueDjeca: this.state.valueDjeca, valueOdrasli: event.target.value });
  }



  render() {
    return (
      <form >
        <label>

          <select value={this.props.id === "djeca" ? this.state.valueDjeca : this.state.valueOdrasli} onChange={e => {
            if (this.props.id == "djeca") this.props.promijeniBrDjece(e.target.value)
            else this.props.promijeniBrOdraslih(e.target.value)
            this.handleChange(e)
          }
          }>
            {opcije.map((op) => {
              if (this.props.id === "djeca" && op <= 6 - this.state.valueOdrasli)
                return <option value={op}>{op}</option>
              else if (this.props.id !== "djeca" && op <= 6 - this.state.valueDjeca && op > 0)
                return <option value={op}>{op}</option>
            })

            }

          </select>
        </label>

      </form>
    );
  }
}