import React, { useState, Component } from "react";
import Form from "react-bootstrap/Form";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import Button from "react-bootstrap/Button";
import "./components/pages/Prijava.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import Navbar from './components/Navbar';
import Axios from "axios"
import Alert from "reactstrap/lib/Alert";
import {  Route, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Eye = <FontAwesomeIcon className="icon" icon={faEye} />;

const EyeSlash = <FontAwesomeIcon className="icon" icon ={faEyeSlash}/>;
class Prijava extends Component {
  constructor(props) {
    super(props);
    this.state = {
    ...props.location.state,
    userName:"",
    password:"",
    error:false,
    type: 'password', 
    show: false
    };
    
  }
  showHide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
        type: this.state.type === 'text' ? 'password' : 'text',
        show: this.state.show ? false : true
    });
}
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  validateForm() {
    return this.state.userName.length > 0 && this.state.password.length > 0;
  }

  handleSubmit = event =>{
    event.preventDefault();
    console.log(this.state.userName)
    console.log(this.state.password)
    Axios.get("http://localhost:3001/login?username="+this.state.userName+"&password="+this.state.password).then(result=>{
    console.log(result);
    console.log(result.data);  
    if(!result.data.length) this.setState(state => ({
      ...state,
      error:true
    }));
    else {
      if(result.data[0].pristup){
      this.setState(state => ({
        ...state,
        error:false
      }));
      console.log(result.data)
      console.log(result.data[0])
      this.props.history.push('/radnik/pregled-rezervacija', {info:result.data[0]});
    }
    else{
      this.setState(state => ({
        ...state,
        error:true
      }));
    }
    }
  });
    
  }
  render() {
  return (
    <>
    <Navbar />
    <div className="prijava-container">
    
    <div className="Login">
    <h1 >Prijava za osoblje</h1>
    <br></br>
    <br></br>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={this.state.userName}
            onChange={(e) => this.setState(state => ({
              ...state,
              userName:e.target.value,
              error: false
            }))}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <InputGroup>
          <Form.Control
            type={this.state.type}
            value={this.state.password}
            onChange={(e) => this.setState(state => ({
              ...state,
              password:e.target.value,
              error:false
            }))}
            aria-describedby="basic-addon2"
          />
   
    <InputGroupText  id="basic-addon2">{this.state.show ? <i onClick={this.showHide}>{Eye}</i>:<i onClick={this.showHide}>{EyeSlash}</i>}</InputGroupText>
    
    </InputGroup>
         
          </Form.Group>
<br></br>
<br></br>
        {this.state.error && <Alert color="danger" fade={false}>
            <p style={{color: "red", fontWeight: "bold"}}>Uneseni podaci nisu ispravni!</p>
          </Alert>}
    
        <Button block size="lg" type="submit" variant="primary" style={{marginLeft:"10px"}} disabled={!this.state.error && !this.validateForm}>
          Prijava
        </Button>
      </Form>
      <div className="reg-div">
    
      </div>
      

    </div>
    </div>
    </>
  );
  }
}
export default withRouter(Prijava);