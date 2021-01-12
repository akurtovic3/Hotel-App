import React, { Component } from 'react';

export default class FlavorForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {valueDjeca: props.pocetniDjeca?props.pocetniDjeca: 0,
      valueOdrasli:props.pocetniOdrasli? props.pocetniOdrasli: 2};

  
      this.handleChange = this.handleChange.bind(this);
      console.log(this.state)
      console.log(props)
      
    }
  
    handleChange(event) {
      if(this.props.id=="djeca")
        this.setState({valueDjeca: event.target.value, valueOdrasli:this.state.valueOdrasli});
      else 
      this.setState({valueDjeca: this.state.valueDjeca, valueOdrasli:event.target.value});
    }
  
    
  
    render() {
      return (
        <form >
          <label>
            
            <select value={this.props.id==="djeca"? this.state.valueDjeca : this.state.valueOdrasli} onChange={e =>{if(this.props.id=="djeca") this.props.promijeniBrDjece(e.target.value)
                                                            else this.props.promijeniBrOdraslih(e.target.value)
                                                          this.handleChange(e) }
                                                            }>
              {this.props.id==="djeca"&&<option value="0">0</option>}
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </label>
         
        </form>
      );
    }
  }