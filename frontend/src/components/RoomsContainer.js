import React from "react";
import { withRoomConsumer } from "../context";
import Loading from "./Loading";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";

function RoomContainer({ context, props, idovi, brGostiju }) {
  const { loading, sortedRooms, rooms } = context;
  if (loading) {

    return <Loading />;
  }
  console.log(props)

  return (
    <>
      <RoomsFilter props={props} rooms={rooms} />
      <RoomsList props={props} rooms={sortedRooms} idovi={idovi} brGostiju={brGostiju} />
    </>
  );
}

export default withRoomConsumer(RoomContainer);

// import React from "react";
// import { RoomConsumer } from "../context";
// import Loading from "./Loading";
// import RoomsFilter from "./RoomsFilter";
// import RoomsList from "./RoomsList";
// export default function RoomContainer() {
//   return (
//     <RoomConsumer>
//       {value => {
//         const { loading, setRoom, sortedRooms,rooms } = value;
//         if (loading) {
//           return <Loading />;
//         }
//         return (
//           <>
//             <RoomsFilter rooms={rooms} />
//             <RoomsList rooms={sortedRooms} setRoom={setRoom} />
//           </>
//         );
//       }}
//     </RoomConsumer>
//   );
// }