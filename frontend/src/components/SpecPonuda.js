import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function CardItem(props) {
  console.log(props);
  return (
    <>
      <li className='cards__item'>
        <div className='cards__item__link'>
        
          <figure className='cards__item__pic-wrap' data-category={props.props.label}>
            <img
              className='cards__item__img'
              alt='Travel Image'
              src={props.props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <h4 className='cards__item__naslov'>{props.props.text1}</h4>
            <h5 className='cards__item__text'>{props.props.text2}</h5>
            <div className='button-float'>
            <Link  to={{
                    pathname: '/rezervacija/0',
                    state: {
                        ponuda:true,
                        popust:props.props.popust,
                        period_poc: props.props.startDatePonude,
                        period_kraj:props.props.endDatePonude,
                        idoviSobaPonude:props.props.idoviSoba
                        
                    },}}>
            <button type="button" class="btn btn-outline-light" >Iskoristi popust</button>
            </Link>
            </div>
          </div>
        
        </div>
      </li>
    </>
  );
}

export default CardItem;