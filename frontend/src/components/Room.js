import React from "react";
import { withRouter, Route } from "react-router-dom";
import defaultImg from "../images/room-1.jpeg";
import PropTypes from "prop-types";
import { memo } from "react";
import { ImUser } from 'react-icons/im'
import { TiTimes } from 'react-icons/ti'
import { IoIosBed, IoMdBed } from 'react-icons/io'
import Popup from 'reactjs-popup';
import '../components/PopUp.css';
import AOS from 'aos';
import "aos/dist/aos.css";
import '../components/pages/Rezervacija.css'
import 'react-slideshow-image/dist/styles.css'
import './Button.css';
import { Slide } from 'react-slideshow-image';
import { AiFillStar, AiOutlineStar, AiOutlineWifi } from 'react-icons/ai'
import { FaRulerCombined, FaSnowflake, FaShower, FaWater, FaGlassCheers } from 'react-icons/fa'
import { RiParkingBoxLine, RiSafeFill } from 'react-icons/ri'
import { CgScreen, CgTrees } from 'react-icons/cg'
import { MdKitchen } from 'react-icons/md'
import { FcCheckmark } from 'react-icons/fc'

const Room = memo(({ room, props }) => {
  const { id, name, slug, images, price, capacity, rates, size, pets, extras, pogled, tv, minibar, fridge } = room;
  const [main, ...defaultImages] = images;


  AOS.init({
    // initialise with other settings
    duration: 2000
  });

  // console.log(name);
  return (
    <article className="room">


      <div className="single-room-container" data-aos="fade-in">
        <div className='left-side'>
          <img src={images[0] || defaultImg} class="image" alt="single room" width="490px" />

          <div className="middle">
            <Popup trigger={<button type="button" class="btn btn-outline-light" >Saznajte više</button>}
              position="right center">
              <div>
                <h className="room-name">{name}</h>
                <p>
                  {(rates === 1) ? <> <AiFillStar /><AiOutlineStar /><AiOutlineStar /><AiOutlineStar /><AiOutlineStar /></>
                    : (rates === 2) ? <> <AiFillStar /><AiFillStar /><AiOutlineStar /><AiOutlineStar /><AiOutlineStar /></>
                      : (rates === 3) ? <> <AiFillStar /><AiFillStar /><AiFillStar /><AiOutlineStar /><AiOutlineStar /></>
                        : (rates === 4) ? <>  <AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiOutlineStar /> </>
                          : <>  <AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /> </>}
                </p>
                <section className="single-room">

                  <div className="single-room-images">
                    <div className="slide-container">
                      <Slide scale={0.4}>

                        {images.map((item, index) => (
                          <img key={index} src={item} alt={name} width="600px" />
                        ))}

                      </Slide>
                    </div>
                  </div>
                  <div className="single-room-info">
                    <div className="left">
                      <article className="info">
                        <h3>Osnovne informacije</h3>
                        <h4>Veličina : <FaRulerCombined /> {size} m² </h4>
                        <h4>
                          Kapacitet : {capacity} osoba/e
                        </h4>
                        <h4>Kućni ljubimci: {pets ? "Dozvoljeno" : "Nije dozvoljeno"}</h4>
                      </article>
                      <br />
                      <section className="room-extras">
                        <h3>Ostalo </h3>
                        <ul className="extras">
                          {extras.map((item, index) => (
                            <li key={index}> <FcCheckmark /> {item}</li>
                          ))}
                        </ul>
                      </section>
                    </div>
                    <div className="right">
                      <article className="desc">
                        <h3>Detalji</h3>
                        <p>
                          <AiOutlineWifi /> besplatan Wi-Fi <br />
                          <RiParkingBoxLine /> besplatan parking <br />
                          <FaSnowflake /> klima uređaj <br />
                          <FaShower /> vlastito kupatilo <br />
                          <RiSafeFill /> sef <br />
                          {(pogled === 1) ? <> <FaWater /> pogled na more</> : <> <CgTrees /> pogled na vrt  </>} <br />
                          {(tv === 1) ? <> <CgScreen /> LCD TV</> : <>   </>} <br />
                          {(minibar === 1) ? <> <FaGlassCheers /> minibar</> : <>   </>} <br />
                          {(fridge === 1) ? <> <MdKitchen /> mini firižider</> : <>   </>} <br />
                        </p>
                      </article>

                    </div>
                  </div>
                </section>
                <div className="single-room-info">
                  <div className="left"></div>
                  <div className="right">
                    <h className="cijena">Cijena bez <br /> dodatnih ponuda : <br /> {price} €</h>
                  </div>
                </div>

              </div>
            </Popup>

          </div>
          <div className="price-top">
            <h6>€{price}</h6>
          </div>
        </div>

        <div className="right-side">
          <h className="room-name">{name}</h>
          <p>

            {(capacity === 1) ? <ImUser />
              : (capacity === 2) ? <><ImUser /><ImUser /> </>
                : (capacity === 3) ? <> <ImUser /><ImUser /><ImUser /> </>
                  : (capacity === 4) ? <>  4<TiTimes /><ImUser /> </>
                    : (capacity === 5) ? <>  5<TiTimes /><ImUser /> </>
                      : <>  6<TiTimes /><ImUser /> </>}

            Kapacitet
          </p>
          <p>

            {(capacity === 1) ? <><IoMdBed /> 1 krevet za 1 osobu</>
              : (capacity === 2) ? <> <IoIosBed /> 1 veliki bračni krevet </>
                : (capacity === 3) ? <> <IoIosBed /> 1 veliki bračni krevet <br /> <IoMdBed /> 1 krevet za 1 osobu  </>
                  : (capacity === 4) ? <>  <IoIosBed /> 1 veliki bračni krevet <br /> <IoMdBed /> 2 kreveta za 1 osobu   </>
                    : (capacity === 5) ? <>  <IoIosBed /> 1 veliki bračni krevet  <br /> <IoMdBed /> 3 kreveta za 1 osobu </>
                      : <> <IoIosBed /> 2 velika bračna kreveta  <br /> <IoMdBed /> 2 kreveta za 1 osobu   </>}

          </p>
          <p>



            <Route render={({ history }) => (
              <button class="btn btn-outline-light"

                onClick={() => {
                  history.push('/rezervacija/2', {
                    info: { ...props, idSobe: id, naziv: name, cijena: price }
                  })
                }}
              >
                Rezerviši
              </button>
            )}
            />
          </p>
          <div className="link-sobe">
            BESPLATNO otkazivanje • Nema plaćanja unaprijed <br />


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
export default withRouter(Room);
