import React, { Component } from "react";
import defaultBcg from "../../images/room-1.jpeg";

import { Link } from "react-router-dom";
import { RoomContext } from "../../context";
import '../../components/Banner.js'
import '../../components/StyledHero.js'
import { Zoom, Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import './SingleRoom.css'

export default class SingleRoom extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg: defaultBcg
    };
  }
  static contextType = RoomContext;

  

  // componentDidMount() {
  //   console.log(this.props);
  // }
  render() {
    const { getRoom } = this.context;
    const room = getRoom(this.state.slug);

    if (!room) {
      return (
        <div className="error">
          <h3> no such room could be found...</h3>
          <Link to="/rezervacija/2" className="btn-primary">
            Povratak na sobe
          </Link>
        </div>
      );
    }
    const {
      name,
      description,
      capacity,
      size,
      price,
      extras,
      breakfast,
      pets,
      images
    } = room;
    const [main, ...defaultImages] = images;
    console.log(defaultImages);

    return (
      <>
      <div className='single-room-page-cont'>
        <img src={images[0] || defaultBcg} class="image-single"  alt="single room" width="490px" />
          
            <Link exact to="/rezervacija/1" className="btn-primary">
            <button type="button" class="btn btn-outline-secondary">Povratak na sobe</button>
            </Link>
          
        
          
        
        <section className="single-room">
          <div className="single-room-images">
          <div className="slide-container">
          <Slide scale={0.4}>
            {defaultImages.map((item, index) => (
              <img key={index} src={item} alt={name} />
            ))}
            </Slide>
          </div>
          </div>
          <div className="single-room-info">
            <article className="desc">
              <h3>details</h3>
              <p>{description}</p>
            </article>
            <article className="info">
              <h3>info</h3>
              <h6>price : ${price}</h6>
              <h6>size : {size} SQFT</h6>
              <h6>
                max capacity :
                {capacity > 1 ? `${capacity} people` : `${capacity} person`}
              </h6>
              <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
              <h6>{breakfast && "free breakfast included"}</h6>
            </article>
          </div>
        </section>
        <section className="room-extras">
          <h6>extras </h6>
          <ul className="extras">
            {extras.map((item, index) => (
              <li key={index}>- {item}</li>
            ))}
          </ul>
        </section>
        </div>
      </>
    );
  }
}