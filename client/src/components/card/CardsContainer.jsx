import React from 'react';
import CardSummary from './CardSummary';
import { useSelector } from 'react-redux';

const CardsContainer = ({ listId }) => {
  const cards = useSelector(state => state.cards).filter((card) => card.listId === listId);

  return (

    <div id="cards-container" data-id="list-1-cards">
      {cards.map(card => <CardSummary key={card._id} cardId={card._id} />)}
    </div>

  )
}

export default CardsContainer;