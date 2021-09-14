import React, { useState, Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./components/pages/Prijava.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import Navbar from './components/Navbar';
import Axios from "axios"
import Alert from "reactstrap/lib/Alert";
import {  Route, withRouter } from "react-router-dom";

class Prijava extends Component {
  constructor(props) {
    super(props);
    this.state = {
    ...props.location.state,
    userName:"",
    password:"",
    error:false
    };
    
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
      this.setState(state => ({
        ...state,
        error:false
      }));
      console.log(result.data)
      console.log(result.data[0])
      this.props.history.push("/radnik-profil", {info:result.data[0]});
    }
  });
    
  }
  render() {
  return (
    <>
    <Navbar />
    <div className="prijava-container">
    
    <div className="Login">
    <h1>Prijava za osoblje</h1>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={this.state.userName}
            onChange={(e) => this.setState(state => ({
              ...state,
              userName:e.target.value
            }))}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={this.state.password}
            onChange={(e) => this.setState(state => ({
              ...state,
              password:e.target.value
            }))}
          />
        </Form.Group>
        {this.state.error && <Alert color="danger" fade={false}>
            <p style={{color: "red", fontWeight: "bold"}}>Uneseni podaci nisu ispravni!</p>
          </Alert>}
        <Button block size="lg" type="submit" variant="primary" disabled={!this.state.error && !this.validateForm}>
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