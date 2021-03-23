import React from 'react';
import ExistingLists from './ExistingLists';

const ListContainer = ({ lists }) => {
  return (
    <div id="list-container" className="list-container">
      <ExistingLists lists={lists} />
      <div id="new-list" className="new-list">
        <span>Add a list...</span>
        <input type="text" placeholder="Add a list..." />
        <div>
          <input type="submit" className="button" value="Save" />
          <i className="x-icon icon"></i>
        </div>
      </div>
    </div>
  )
}

export default ListContainer;