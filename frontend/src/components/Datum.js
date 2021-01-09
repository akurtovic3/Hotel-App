import React, { useState } from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from './Button';
//import './Datum.css';

function Datum() {
  // Declare a new state variable, which we'll call "count"
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  
  return (
      <div className="date-container">
      <div className="column"> 
      
        <p>Datum dolaska:</p>
        <DatePicker filterDate={d => {
          return new Date() <d;
              }}
          selected={startDate}
          selectsStart
          startDate={startDate}
          endDate={endDate} // add the endDate to your startDate DatePicker now that it is defined
          onChange={date => setStartDate(date)}
        />
      </div>
      
      <div className="column">
      
      <p>Datum odlaska:</p>
       <DatePicker filterDate={d => {
          return new Date() < startDate;
              }}
          selected={endDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          onChange={date => setEndDate(date)}
        />
      </div>
      <div className="column">
      <Button buttonStyle='btn--outline'>Rezerviši sada</Button>
      </div>
      
      </div>
    );
     
   
  
}

export default Datum;