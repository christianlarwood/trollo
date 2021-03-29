import React, { useState } from "react";
import CardsContainer from "../card/CardsContainer";
import { useSelector, useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import * as ListActions from "../../actions/ListActions";
import * as CardActions from "../../actions/CardActions";

const List = ({ listId }) => {
  const list = useSelector((state) => state.lists).find(
    (list) => list._id === listId
  );
  const [editing, setEditing] = useState(false);
  const titleInput = useInput(list.title);
  const newCardInput = useInput("");
  const [addCard, setAddCard] = useState(false);
  // const toggleEditing = (e) => {
  //   // console.log(editing);
  //   e.preventDefault()
  //   setEditing(!editing)
  // }

  const dispatch = useDispatch();

  const handleChange = (event) => {
    // event.preventDefault();
    // console.log(list.title, title)
    if (!list || list.title === titleInput.value) return setEditing(false);

    const newList = { ...list, title: titleInput.value };
    dispatch(
      ListActions.updateList(newList, () => {
        setEditing(false);
      })
    );
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      // event.preventDefault();
      // event.stopPropagation();
      handleChange(event);
    }
  };
  const renderTitle = () => {
    if (editing) {
      return (
        <input
          type="text"
          onBlur={handleChange}
          onKeyDown={handleEnter}
          placeholder="editListName..."
          {...titleInput.bind}
          autoFocus
        />
      );
    }
    return <p className="list-title">{list.title}</p>;
  };

  const toggleAddCard = () => {
    setAddCard(!addCard);
  };

  const handleAddCard = (event) => {
    const newCard = {
      listId,
      card: {
        listId,
        title: newCardInput.value,
        boardId: list.boardId,
      }
    };

    dispatch(CardActions.createCard(newCard, () => {
      setAddCard(!addCard);
      newCardInput.reset();
    }))
  }

  return (
    <div className={addCard ? "list-wrapper add-dropdown-active" : "list-wrapper"}>
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div onClick={() => setEditing(true)}>{renderTitle()}</div>
          <div className="add-dropdown add-top">
            <div className="card"></div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <CardsContainer listId={listId} />
          <div className={addCard ? "add-dropdown add-bottom active-card" : "add-dropdown add-bottom"}>
            <div className="card">
              <div className="card-info"></div>
              <textarea name="add-card" value={newCardInput.value} {...newCardInput.bind} ></textarea>
              <div className="members"></div>
            </div>
            <a className="button" onClick={handleAddCard}>Add</a>
            <i className="x-icon icon" onClick={toggleAddCard}></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div className="add-card-toggle" data-position="bottom" onClick={toggleAddCard}>
            Add a card...
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
