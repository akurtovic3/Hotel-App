import React, {Component} from "react";
import RoomsContainer from "../../components/RoomsContainer";

import { Link, withRouter, useHistory, Route } from "react-router-dom";

import '../../components/pages/Rezervacija.css'
import Button from 'react-bootstrap/Button';

class Rooms extends Component{
  constructor(props) {
    super(props);
    this.state = {
      osnove:props.location.state,
      idSobe:-1,
      korak:2,
    };
    
    console.log(props);
  }
  postaviKorak(indx) {
    this.setState(state => ({
      ...state,
      korak:indx,
    }))
  }
  sljKorak(){ this.postaviKorak(this.state.korak + 1) }
  prethKorak(){ this.postaviKorak(this.state.korak > 0 ? this.state.korak -1 : this.state.korak)}
  
  render(){
  return (
    <>
      
          <div className="step-two-container">
            <RoomsContainer />
          </div>
          <div>

          <div className="btn-povratak">
            <Route render={({ history}) => (
              <Button variant="outlined" size="large" 
                style={this.props.location.state.prevStyle}
                onClick={() => { history.push('/rezervacija/0', { proslijedjeno:this.state, 
                  
                });
                this.prethKorak(); }}>
                Povratak
              </Button>
            )}
          />
            </div>
          <div className="btn-nastavak">
            <Route render={({ history}) => (
              <Button variant="outlined" size="large" 
                style={this.props.location.state.nextStyle}
                onClick={() => { history.push('/rezervacija/2', { proslijedjeno:this.state, 
                  
                });
                this.sljKorak(); }}>
                Nastavi rezervaciju
              </Button>
            )}
    />

    </div>
    </div>
    </>
  );
  }
};

export default withRouter(Rooms);