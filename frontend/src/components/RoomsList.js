import React, { useState, useEffect } from "react";
import Room from "./Room";
import Axios from "axios";
import Moment from 'moment';
const RoomsList = ({ rooms, props, idovi, brGostiju}) => {
  const [imaSoba, setImaSoba] = useState(0);
  console.log(props)
  console.log(idovi)
  if (rooms.length === 0) {
    return (
      <div className="empty-search">
        <h3>Nažalost nema soba koje zadovoljavaju date kriterije</h3>
      </div>
    );
  }
  console.log(rooms)
  console.log(props);
  return (
    <section className="roomslist">
      <div className="roomslist-center">
        {rooms.map(item => {
          var raspolozivo=false;
          idovi.map(id=>{
            if(id==item.id) raspolozivo=true;
          })
          if(raspolozivo && item.capacity>=brGostiju) return <Room props={props} key={item.id} room={item} />;
        })}
        
      </div>
    </section>
  );
};

export default RoomsList;