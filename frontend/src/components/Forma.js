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
            
            <select value={this.state.value} onChange={e =>{if(this.props.id=="djeca") this.props.promijeniBrDjece(e.target.value)
                                                            else if(this.props.id=="sobe") this.props.promijeniBrSoba(e.target.value)
                                                            else this.props.promijeniBrOdraslih(e.target.value)
                                                          this.handleChange(e) }
                                                            }>
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