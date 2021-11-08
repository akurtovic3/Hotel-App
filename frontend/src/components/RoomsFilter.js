import React from "react";
import { useContext } from "react";
import { RoomContext } from "../context";

// get all unique values
const getUnique = (items, value) => {
  return [...new Set(items.map(item => item[value]))];
};

const RoomsFilter = ({ props, rooms }) => {
  // react hooks
  const context = useContext(RoomContext);
  const {
    handleChange,
    type,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets
  } = context;
  var capacity = props.brOdraslih + props.brDjece;
  // get unique types
  let types = getUnique(rooms, "type");
  // add all
  types = ["svi tipovi", ...types];
  // map to jsx
  types = types.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));
  // get unique capacity
  let people = getUnique(rooms, "capacity");
  people = people.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));

  return (
    <section className="filter-container">


      <form className="filter-form">
        {/* select type */}
        <div className="form-group">
          <label htmlFor="type">Soba / Apartman</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            className="form-control"
            value={type}
          >
            {types}
          </select>
        </div>
        {/* end of select type */}
        {/* guests  */}

        {/* end of guests */}
        {/* room price */}
        <div className="form-group">
          <label htmlFor="price">Cijena €{price}</label>
          <input
            type="range"
            name="price"
            min={minPrice}
            max={maxPrice}
            id="price"
            value={price}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {/* end of room price*/}
        {/* size 
        <div className="form-group">
          <label htmlFor="price">Veličina (m²) </label>
          <div className="size-inputs">
            <input
              type="number"
              name="minSize"
              value={minSize}
              onChange={handleChange}
              className="size-input"
            />
            <input
              type="number"
              name="maxSize"
              value={maxSize}
              onChange={handleChange}
              className="size-input"
            />
          </div>
        </div>*/}
        {/* end of select type */}
        {/* extras 
        <div className="form-group">
          
          <div className="single-extra">
            <input
              type="checkbox"
              name="pets"
              checked={pets}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">Kućni ljubimci</label>
          </div>
        </div>*/}
        {/* end of extras type */}
      </form>
    </section>
  );
};

export default RoomsFilter;