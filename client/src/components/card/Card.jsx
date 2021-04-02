import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useInput } from "../../hooks/useInput";
import { fetchCard, updateCard } from "../../actions/CardActions";
import CardComment from "./CardComments";
import CardActivity from "./CardActivity";
import ModalButtons from "./ModalButtons";
import CardDescription from "./CardDescription";
import CardLabels from "./CardLabels";
import CardDueDate from "./CardDueDate";

const Card = ({cardId}) => {
  const dispatch = useDispatch();
  cardId = useParams().id;
  
  const card = useSelector(state => state.cards).find((card) => card._id === cardId);
  const list = useSelector(state => state.lists).find((list) => list._id === card.listId);
  
  let cardTitleInput = useInput(card?.title);

  useEffect(() => {
    if (card) return  card.title === cardTitleInput.value || cardTitleInput.setValue(card.title);

    dispatch(fetchCard(cardId))
  }, [dispatch, cardId, card]);

  const handleTitleChange = () => {
    const newCard = {
      card: {
        title: cardTitleInput.value
      }
    }
    dispatch(updateCard(cardId, newCard));

  };

  const handleEnterPress = (event) => {
    if (event.code === "Enter") {
      event.preventDefault();
      handleTitleChange(event);
      event.target.blur();
    }
  };

  return !card ? <></> : (
    <div id="modal-container">
      <div className="screen"></div>
      <div id="modal">
        <Link to={{ pathname: `/boards/${card.boardId}`, state: { boardId: card.boardId }}} >
          <i className="x-icon icon close-modal"></i>
        </Link>
        { card?.archived &&
          <div className="archived-banner">
            <i className="file-icon icon"></i>This card is archived.
          </div>
        }
        <header>
          <i className="card-icon icon .close-modal"></i>
          <textarea className="list-title" style={{ height: "45px" }} onKeyPress={handleEnterPress} defaultValue={cardTitleInput.value} {...cardTitleInput.bind} onBlur={handleTitleChange} />
          <p>
            in list <a className="link">{list?.title}</a>
            <i className="sub-icon sm-icon"></i>
          </p>
        </header>
        <section className="modal-main">
          <ul className="modal-outer-list">
            <li className="details-section">
              <ul className="modal-details-list">
                <CardLabels labels={card.labels}/>
                <CardDueDate dueDate={card.dueDate}/>
              </ul>
             <CardDescription cardId={card._id}/>
            </li>
            <CardComment cardId={cardId} />
            <CardActivity comments={card.comments} actions={card.actions}/>
          </ul>
        </section>
        <ModalButtons cardId={card._id} />
      </div>
    </div>
  );
};

export default Card;
