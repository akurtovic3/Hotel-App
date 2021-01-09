import React from "react";
import { Link } from "react-router-dom";
import defaultImg from "../images/room-1.jpeg";
import PropTypes from "prop-types";
import { memo } from "react";
import {ImUser} from 'react-icons/im'
import {TiTimes} from 'react-icons/ti'
import {IoIosBed, IoMdBed} from 'react-icons/io'
import { Button2 } from './Button2';

import AOS from 'aos';
import "aos/dist/aos.css";

const Room = memo(({ room }) => {
  const { name, slug, images, price, capacity } = room;
  AOS.init({
    // initialise with other settings
    duration : 2000
  });

  // console.log(name);
  return (
    <article className="room">
    
      <div className="single-room-container" data-aos="fade-in">
        <div className='left-side'>
            <img src={images[0] || defaultImg} class="image"  alt="single room" width="490px" />
            
            <div className="middle">
            <Link to={`/rooms/${slug}`} className="btn-primary-room-link">
            <button type="button" class="btn btn-outline-secondary">Saznajte više</button>
              </Link>
              
            </div>
            <div className="price-top">
              <h6>€{price}</h6>
            </div> 
        </div>

        <div className="right-side">
          <h className="room-name">{name}</h>
          <p>
            
            {(capacity===1) ? <ImUser /> 
            : (capacity===2) ? <><ImUser /><ImUser /> </>
            : (capacity===3) ? <> <ImUser /><ImUser /><ImUser /> </>
            : (capacity===4) ? <>  4<TiTimes/><ImUser /> </>
            : (capacity===5) ? <>  5<TiTimes/><ImUser /> </>
            : <>  6<TiTimes/><ImUser/> </>  }
            
            Kapacitet
          </p>
          <p>
            
            {(capacity===1) ? <><IoMdBed /> 1 krevet za 1 osobu</>
            : (capacity===2) ? <> <IoIosBed/> 1 veliki bračni krevet </>
            : (capacity===3) ? <> <IoIosBed/> 1 veliki bračni krevet <br/> <IoMdBed /> 1 krevet za 1 osobu  </>
            : (capacity===4) ? <>  <IoIosBed/> 1 veliki bračni krevet <br/> <IoMdBed /> 2 kreveta za 1 osobu   </>
            : (capacity===5) ? <>  <IoIosBed/> 1 veliki bračni krevet  <br/> <IoMdBed /> 3 kreveta za 1 osobu </>
            : <> <IoIosBed/> 2 velika bračna kreveta  <br/> <IoMdBed /> 2 kreveta za 1 osobu   </>  }
            
          </p>
          <p>
          
          <Button2>
            Rezerviši
          </Button2>
          </p>
          <div className="link-sobe">
              BESPLATNO otkazivanje • Nema plaćanja unaprijed <br/>
              <Link to={`/rooms/${slug}`} className="btn-primary-room-link">
                Više informacija o sobi
              </Link>
          </div>   
        
        </div>
      </div>
      
    </article>
  );
});

Room.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired
  })
};
export default Room;
