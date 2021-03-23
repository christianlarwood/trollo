import React from 'react';
import List from './List';

const ExistingLists = ({ lists }) => {
  return (
    <div id="existing-lists" className="existing-lists">
      {/* <List key={lists._id} data={lists[0]} /> */}
      {lists.map((list) => <List key={list._id} info={list} />)};
    </div>
  )
}

export default ExistingLists;