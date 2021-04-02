import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const CardSummary = ({cardId}) => {
  const card = useSelector(state => state.cards).find((card) => card._id === cardId);

  // <Link
  //     to={{ pathname: `/boards/${props.id}`, state: { boardId: props.id } }}
  //   >
  //     <span className="board-title">{props.title}</span>
  //   </Link>
  return (
    <Link 
      to={{ pathname: `/cards/${cardId}`, state: { cardId } }}
    >
      <div className="card-background">
        <div className="card ">
          <i className="edit-toggle edit-icon sm-icon"></i>
          <div className="card-info">
            {card.labels.map(label => {
              return <div key={cardId + label} className={`card-label ${label} colorblindable`}></div>
              })}
            <p>
              {card.title}
            </p>
          </div>
          <div className="card-icons">
            <i className="clock-icon sm-icon overdue-recent completed">
              {card.dueDate}
            </i>
            <i className="description-icon sm-icon"></i>
            <i className="comment-icon sm-icon"></i>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CardSummary;