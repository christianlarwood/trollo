import React, { useState } from 'react';
import CardsContainer from '../card/CardsContainer';
import { useSelector, useDispatch } from 'react-redux';
import useInput from '../../hooks/useInput';
import * as action from '../../actions/ListActions';
const List = ({ listId }) => {
  const list = useSelector(state => state.lists).find(list => list._id === listId);
  const [editing, setEditing] = useState(false);
  const {value: title, reset, bind} = useInput(list.title)
  const toggleEditing = (e) => {
    // console.log(editing);
    e.preventDefault()
    setEditing(!editing)
  }

  const dispatch = useDispatch();
  
  const handleChange = (event) => {
    event.preventDefault();
    console.log(list.title, title)
    if (!list || list.title === title) return setEditing(false);

    const newList = { ...list, title };
    dispatch(action.updateList(newList, () => {
      setEditing(false);
    }))
  }

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      console.log("enter Pressed")
      event.preventDefault();
      event.stopPropagation();
      handleChange(event);
    }
  }
  const renderTitle = () => {
    if (!!editing) {
      return (<input type="text" onBlur={handleChange} onKeyDown={handleEnter} placeholder="editListName..." {...bind}/>)
    }
    return <p className="list-title">{list.title}</p>
  }
  return (
    <div className="list-wrapper">
      `<div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon"  href=""></a>
          <div onClick={() => setEditing(true)}>
            {renderTitle()}
          </div>
          <div className="add-dropdown add-top">
            <div className="card"></div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <CardsContainer listId={listId} />
          <div className="add-dropdown add-bottom">
            <div className="card">
              <div className="card-info"></div>
              <textarea name="add-card"></textarea>
              <div className="members"></div>
            </div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div className="add-card-toggle" data-position="bottom">
            Add a card...
          </div>
        </div>
      </div>
    </div>
  )
}

export default List;