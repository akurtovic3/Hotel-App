import React from 'react';
import './SpecPonudeContainer.css';
import SpecPonuda from './SpecPonuda';
import AOS from 'aos';
import "aos/dist/aos.css";
import logo from '../images/logo.png';
import Axios from "axios"
import { useEffect, useState } from "react";

import moment from "moment"
function SpecPonudeContainer() {
  const [ponude, setPonude] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/specijalnePonude")
      .then(function (response) {
        var niz_p = response.data;
        var niz = []
        niz_p.map((pon) => {
          if (moment(pon.endDatePonude).format('YYYY-MM-DD') > moment().format('YYYY-MM-DD'))
            niz = [...niz, pon]
        })
        const rows = niz.reduce(function (rows, key, index) {
          return (index % 2 == 0 ? rows.push([key])
            : rows[rows.length - 1].push(key)) && rows;
        }, []);
        setPonude(rows)
        console.log(rows)
      })
      .catch(error => {
        console.log(error);
      })
  }, [])
  AOS.init({
    // initialise with other settings
    duration: 2000
  });
  const runCallback = (cb) => {
    return cb();
  };
  var rows = [];
  return (
    <div className='cards' >
      <img src={logo} alt="website logo" class="center-image" width="60px" height="60px" />
      <h2 className='cards-container-naslov'>Pronađite savršenu ponudu za vaš sljedeći odmor</h2>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          {
            /*runCallback(() => {
              var niz, size;
                const row = [];
              
              for (var i = 0; i < size; i=i+2) {
                if(i==size-1) row.push(<ul className='cards__items' data-aos="fade-in">
                  <SpecPonuda props={niz[i]} key={niz[i].id}/>
                  </ul>);
                else row.push(<ul className='cards__items' data-aos="fade-in">
                <SpecPonuda props={niz[i]} key={niz[i].id}/>
                <SpecPonuda props={niz[i+1]} key={niz[i+1].id}/>
                </ul>);*/
            ponude.map(items => (
              <ul className='cards__items' data-aos="fade-in">
                {items.map(item => (<SpecPonuda props={item} key={item.id} />))}
              </ul>
            ))
          }


          {/* <ul className='cards__items' data-aos="fade-in">
            <SpecPonuda
              src='images/student-popust.jpg'
              text1='Popust za studente'
              text2='Provedite nezaboravne trenutke sa svojim prijateljima na moru!'
              label='15% popusta'
              path='/ponude/popust-student-odmor'
            />
            <SpecPonuda
              src='images/porodica-popust.jpg'
              text1='Porodični vikend odmor'
              text2 = 'Da li planirate vikend odmor za Vašu porodicu? Ovo je savršena prilika za Vas!'
              label='20% popusta'
              path='/ponude/popust-porodicni-vikend'
            />
      </ul>*/}


        </div>
      </div>
    </div>
  );
}

export default SpecPonudeContainer;