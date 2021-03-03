import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../../components/LoaderButton";
/*import { useAppContext } from "../libs/contextLib";*/
import { useFormFields } from "../../libs/hooksLib";
/*import { onError } from "../libs/errorLib";*/
import "./Registracija.css";
import { Link } from "react-router-dom";
import Navbar from '../Navbar';

export default function Registracija() {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
    username:"",
    ime:"",
    prezime:"",
    telefon:"",
    adresa:""
  });
  const history = useHistory();
  const [newUser, setNewUser] = useState(null);
  /*const { userHasAuthenticated } = useAppContext();*/
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.username.length > 0 &&
      fields.ime.length > 0 &&
      fields.prezime.length > 0 &&
      fields.telefon.length > 0 &&
      fields.adresa.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    setNewUser("test");

    setIsLoading(false);
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
  }


  function renderForm() {
    return (
      <>
      
      <Form onSubmit={handleSubmit}>
        <div className="row-reg">
            <div className="column-reg-1">
        <Form.Group controlId="ime" size="lg">
          <Form.Label>Ime</Form.Label>
          <Form.Control
            autoFocus
            type="ime"
            value={fields.ime}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="email" size="lg">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="telefon" size="lg">
          <Form.Label>Telefon</Form.Label>
          <Form.Control
            type="telefon"
            value={fields.telefon}
            onChange={handleFieldChange}
          />
        </Form.Group>
        
        </div>


        <div className="column-reg-2">
        <Form.Group controlId="prezime" size="lg">
          <Form.Label>Prezime</Form.Label>
          <Form.Control
            autoFocus
            type="prezime"
            value={fields.prezime}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="username" size="lg">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={fields.username}
            onChange={handleFieldChange}
          />
        </Form.Group>
        
        <Form.Group controlId="adresa" size="lg">
          <Form.Label>Adresa</Form.Label>
          <Form.Control
            type="adresa"
            value={fields.adresa}
            onChange={handleFieldChange}
          />
        </Form.Group>
        </div>
        
        </div>
        <Form.Group controlId="password" size="lg">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" size="lg">
          <Form.Label>Potvrdi password</Form.Label>
          <Form.Control
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </Form.Group>
        <Link to='/prijava'>
        <LoaderButton
          block
          size="lg"
          type="submit"
          variant="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Kreiraj korisnički račun
        </LoaderButton>
        </Link>
        
      </Form>
      </>
    );
  }

  return (
    <>
    <Navbar />
    <div className='registracija-container'>
    
    <div className="Signup">
    <h2>Registracija na stranicu hotela</h2>
        {renderForm() }
      
    </div>
    </div>
    </>
  );
}