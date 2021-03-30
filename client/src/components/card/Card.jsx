import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useInput } from "../../hooks/useInput";
import { fetchCard } from "../../actions/CardActions";
import CardComment from "./CardComments";
import CardActivity from "./CardActivity";
import ModalButtons from "./ModalButtons";
const Card = ({cardId}) => {
  const dispatch = useDispatch();
  cardId = useParams().id;
  const card = useSelector(state => state.cards).find((card) => card._id === cardId);
  const list = useSelector(state => state.lists).find((list) => list._id === card.listId);
  let cardTitleInput = useInput(card?.title);
  useEffect(() => {
    if (card) cardTitleInput.setValue(card.title);

    dispatch(fetchCard(cardId))
  }, [dispatch, cardId, card]);

  const handleTitleChange = () => {

  };

  const handleEnterPress = (event) => {
    if (event.code === "Enter") {
      event.preventDefault();
      handleTitleChange(event);
    }
  };

  return !card ? <></> : (
    <div id="modal-container">
      <div className="screen"></div>
      <div id="modal">
        <Link to={{ pathname: `/boards/${card.boardId}`, state: { boardId: card.boardId }}} >
          <i className="x-icon icon close-modal"></i>
        </Link>
        <header>
          <i className="card-icon icon .close-modal"></i>
          <textarea className="list-title" style={{ height: "45px" }} onKeyPress={handleEnterPress} defaultValue={cardTitleInput.value} {...cardTitleInput.bind} />
          <p>
            in list <a className="link">{list?.title}</a>
            <i className="sub-icon sm-icon"></i>
          </p>
        </header>
        <section className="modal-main">
          <ul className="modal-outer-list">
            <li className="details-section">
              <ul className="modal-details-list">
                <li className="labels-section">
                  <h3>Labels</h3>
                  {
                    card.labels.map(color => 
                        <div key={color} className="member-container">
                          <div className={`${color} label colorblindable`}></div>
                        </div>
                      )
                  }
                  <div className="member-container">
                    <i className="plus-icon sm-icon"></i>
                  </div>
                </li>
                <li className="due-date-section">
                  <h3>Due Date</h3>
                  <div id="dueDateDisplay" className="overdue completed">
                    <input
                      id="dueDateCheckbox"
                      type="checkbox"
                      className="checkbox"
                      checked=""
                    />
                    Aug 4 at 10:42 AM <span>(past due)</span>
                  </div>
                </li>
              </ul>
              <form className="description">
                <p>Description</p>
                <span id="description-edit" className="link">
                  Edit
                </span>
                <p className="textarea-overlay">
                  {card.description}
                </p>
                <p id="description-edit-options" className="hidden">
                  You have unsaved edits on this field.{" "}
                  <span className="link">View edits</span> -{" "}
                  <span className="link">Discard</span>
                </p>
              </form>
            </li>
            <CardComment cardId={cardId} />
            <CardActivity />
          </ul>
        </section>
        <ModalButtons />
      </div>
    </div>
  );
};

export default Card;
