import React from "react";
import RoomsContainer from "../../components/RoomsContainer";

import { Link } from "react-router-dom";


const Rooms = () => {
  return (
    <>
      
          <Link to="/" className="btn-primary">
            return home
          </Link>
        
          <RoomsContainer />
    </>
  );
};

export default Rooms;