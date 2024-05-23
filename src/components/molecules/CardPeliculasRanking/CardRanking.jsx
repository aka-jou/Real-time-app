import React from 'react';
import './Card.css';

function CardRanking(props) {
  const bg = {
    backgroundImage: `url(${props.img})`
  };

  return (
    <div className='divCardCompletePopular'>
      <div className='divCardPopular' style={bg}></div>
      <div className='divTitleCardPopular'>
        <p>{props.title}</p>
        <br />
        <p>calificacion: {props.calificacion}</p>
      </div>
    </div>
  );
}

export default CardRanking;