import React, { useEffect } from 'react';
import List from './List';

import { useSelector, useDispatch } from 'react-redux';
import { fetchBoards } from '../../actions/BoardActions';

const ExistingLists = ({ boardId }) => {
  const dispatch = useDispatch()
  console.log(boardId)
  const lists = useSelector((state) => state.lists).filter(
    (list) => list.boardId === boardId
  );
  console.log(lists);

  useEffect(() => {
    dispatch(fetchBoards())
  }, [dispatch]) 
  
  return (
    <div id="existing-lists" className="existing-lists">
      {lists && lists.map((list) => <List key={list._id} info={list} />)};
    </div>
  )
}

export default ExistingLists;