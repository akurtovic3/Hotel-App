import React from 'react';

import AOS from 'aos';
import "aos/dist/aos.css";
import './components/pages/Rezervacija.css'
import 'react-slideshow-image/dist/styles.css'
import './components/Button.css';
import { Slide } from 'react-slideshow-image';
import room1 from "./images/details-1.jpeg";
import room2 from "./images/room-1.jpeg";
import room3 from "./images/room-1.jpg";
import room4 from "./images/details-4.jpeg";
import img1 from "./images/room-1.jpeg";
import img2 from "./components/img-2.jpg";
import img3 from "./images/room-3.jpeg";
import img4 from "./images/room-4.jpeg";
import img5 from "./images/room-5.jpeg";
import img6 from "./images/room-6.jpeg";
import img7 from "./images/room-7.jpeg";
import img8 from "./images/room-8.jpeg";
import img9 from "./images/room-9.jpeg";
import img10 from "./images/room-10.jpeg";
import img11 from "./images/room-11.jpeg";
import img12 from "./images/room-12.jpeg";
const images = [
  {
    fields: {
      file: {
        url: img2
      }
    }
  },
  {
    fields: {
      file: {
        url: img2
      }
    }
  },
  {
    fields: {
      file: {
        url: img2
      }
    }
  },
  {
    fields: {
      file: {
        url: img2
      }
    }
  }
]
function App() {
  return (
    <div className="slide-container">
      <Slide scale={0.4}>


        <img key="0" src={img8} height="400px" width="700px" />
        <img key="1" src={room3} height="400px" width="700px" />
        <img key="2" src={room4} height="400px" width="700px" />
        <img key="3" src={img3} height="400px" width="700px" />
        <img key="4" src={img4} height="400px" width="700px" />
        <img key="5" src={img5} height="400px" width="700px" />
        <img key="6" src={img6} height="400px" width="700px" />
        <img key="7" src={img7} height="400px" width="700px" />
      </Slide>
    </div>
  )
}
export default App;