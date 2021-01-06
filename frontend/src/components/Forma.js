import React, { Component } from 'react';

export default class FlavorForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: '1'};
  
      this.handleChange = this.handleChange.bind(this);
      
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    
  
    render() {
      return (
        <form >
          <label>
            
            <select value={this.state.value} onChange={this.handleChange}>
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