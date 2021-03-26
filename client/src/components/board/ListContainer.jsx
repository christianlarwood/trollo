import React from 'react';
import ExistingLists from './ExistingLists';
import NewList from './NewList';

const ListContainer = ({ boardId }) => {
  return (
    <div id="list-container" className="list-container">
      <ExistingLists boardId={boardId} />
      <NewList boardId={boardId} />
    </div>
  )
}

export default ListContainer;