import React from 'react';
import List from './List';
import { useSelector, useDispatch } from 'react-redux';
import getExistingLists from '../../actions/listActions';

const ExistingLists = ({ boardId }) => {
  const dispatch = useDispatch()
  const lists = useSelector(({ lists }) => lists).filter(
    (list) => list.boardId === boardId
  );
  
  useEffect(() => {
    dispatch(getExistingLists(boardId))
  }, []) 
  return (
    <div id="existing-lists" className="existing-lists">
      {lists && lists.map((list) => <List key={list._id} info={list} />)};
    </div>
  )
}

export default ExistingLists;