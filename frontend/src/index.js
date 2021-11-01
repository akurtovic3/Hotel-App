import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { RoomProvider } from "./context";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop"
import { Provider as AlertProvider } from 'react-alert'
const AlertTemplate = ({ style, options, message, close }) => (
    <div>

      <p textAlign="center">{message}</p>
      <button onClick={close}>X</button>
    </div>
  )
ReactDOM.render(
    <AlertProvider template={AlertTemplate}>
    <RoomProvider>
        <BrowserRouter>
        <App />
        </BrowserRouter>
    </RoomProvider>
    </AlertProvider> 
, document.getElementById('root')

);