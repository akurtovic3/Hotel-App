import React from "react";
import Room from "./Room";
const RoomsList = ({ rooms, props }) => {
  if (rooms.length === 0) {
    return (
      <div className="empty-search">
        <h3>Nažalost nema soba koje zadovoljavaju date kriterije</h3>
      </div>
    );
  }
  console.log(props);
  return (
    <section className="roomslist">
      <div className="roomslist-center">
        {rooms.map(item => {
          return <Room props={props} key={item.id} room={item} />;
        })}
      </div>
    </section>
  );
};

export default RoomsList;