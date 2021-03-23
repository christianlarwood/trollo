import React from 'react';
import CardSummary from './CardSummary';

const CardsContainer = ({ data }) => {
  console.log(data);
  return (
    <div id="cards-container" data-id="list-1-cards">
      {/* <CardSummary key={data._id} data={data} />
      {data.map(card => <CardSummary key={card._id} data={card} />)}; */}
    </div>
  )
}

export default CardsContainer;