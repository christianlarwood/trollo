import React from 'react';
import useInput from '../../hooks/useInput'
import { useDispatch } from 'react-redux';
import * as actions from '../../actions/ListActions';

const NewList = ({boardId, onNewListClick}) => {
  const dispatch = useDispatch();
  
  const handleClick = (event) => {
    event.preventDefault()
    const { value: title, reset } = titleInputObject
    dispatch(actions.createList({title, boardId}, reset ))
  }

  const titleInputObject = useInput('');
  return (
    <div id="new-list" className="new-list">
      <span>Add a list...</span>
      <input type="text" placeholder="Add a list..." />
      <div>
        <input type="submit" className="button" value="Save" onClick={onNewListClick} />
        <i className="x-icon icon"></i>
      </div>
    </div>
  )
}


export default NewList;
