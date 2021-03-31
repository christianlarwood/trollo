import React from 'react';

const ActivityAction = ({ action }) => {
  return (
    <>
      <li>
        <div className="member-container">
          <div className="card-member small-size">AU</div>
        </div>
        <p>
          <span className="member-name">Anonymous User</span> {action.description}<small>yesterday at 4:53 PM</small>
        </p>
      </li>
    </>
  )
}

export default ActivityAction;