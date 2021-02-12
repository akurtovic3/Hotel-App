import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Prijava.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

export default function Prijava() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return userName.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="prijava-container">
    
    <div className="Login">
    <h1>Prijava na stranicu hotela</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" variant="primary" disabled={!validateForm()}>
          Prijava
        </Button>
      </Form>
      <div className="reg-div">
      <p>Nemate račun?</p>
      <Link to='/registracija'>
        <Button block size="lg"  variant="outline-primary" >
            Registracija
        </Button>
      </Link>
      
      </div>
      

    </div>
    </div>
  );
}