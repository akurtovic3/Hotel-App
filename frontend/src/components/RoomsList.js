import React, { useState } from "react";
import Room from "./Room";

const RoomsList = ({ rooms, props, idovi, brGostiju}) => {
  const [postoji, setPostoji]=useState(false);
  const [imaSoba, setImaSoba] = useState(0);
  console.log(props)
  console.log(idovi)
  console.log(rooms)
  console.log(props);
  return (
    <section className="roomslist">
      <div className="roomslist-center">
        {rooms.map(item => { 
          var raspolozivo=false; /////ovdje treba falseeeeee
          var count=0
          idovi.map(id=>{
            if(id==item.id){ raspolozivo=true; count=count+1;
            }
          })
          if(raspolozivo  && item.capacity>=brGostiju){
            if(!postoji) setPostoji(true);
            
           return <Room props={props} key={item.id} room={item} />;}
        })}
      </div>
      <div>
      {!postoji&&<h5 style={{padding:"20px", color:"black", textAlign:"center"}}>Nema raspoloživih soba za odabrani termin i uneseni broj gostiju.</h5>}
      </div>
    </section>
  );
};

export default RoomsList;