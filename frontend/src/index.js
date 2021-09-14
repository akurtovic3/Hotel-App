import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { RoomProvider } from "./context";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop"

ReactDOM.render(
    
    <RoomProvider>
        <BrowserRouter>
        <App />
        </BrowserRouter>
    </RoomProvider>
    
, document.getElementById('root')

);