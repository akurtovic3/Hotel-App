import React from "react";
import RoomsContainer from "../../components/RoomsContainer";

import { Link } from "react-router-dom";


const Rooms = () => {
  return (
    <>
      
          <Link to="/" className="btn-primary">
            
          </Link>

          <div className="step-two-container">
            <RoomsContainer />
          </div>
          
          
    </>
  );
};

export default Rooms;