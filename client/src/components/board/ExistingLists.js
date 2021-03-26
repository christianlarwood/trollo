import React from 'react';
import List from './List';
import { useSelector } from 'react-redux';

const ExistingLists = ({ boardId }) => {
  const lists = useSelector((state) => state.lists).filter(
    (list) => list.boardId === boardId
  );

  return (
    <div id="existing-lists" className="existing-lists">
      {lists.map((list) => <List key={list._id} listId={list._id} />)};
    </div>
  )
}

export default ExistingLists;