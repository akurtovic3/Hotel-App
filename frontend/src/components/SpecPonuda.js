import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function CardItem(props) {
  return (
    <>
      <li className='cards__item'>
        <div className='cards__item__link'>
        
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt='Travel Image'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <h4 className='cards__item__naslov'>{props.text1}</h4>
            <h5 className='cards__item__text'>{props.text2}</h5>
            <div className='button-float'>
            <Link  to={props.path}>
            <button type="button" class="btn btn-outline-light" >Saznajte više</button>
            </Link>
            </div>
          </div>
        
        </div>
      </li>
    </>
  );
}

export default CardItem;