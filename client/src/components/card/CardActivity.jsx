import React from 'react';
import ActivityComment from './ActivityComment';
import ActivityLog from './ActivityLog';

const CardActivity = () => {
    // need to get all activity
   // need to iterate over an array of activities and render each respective component
  return (
    <>
      <li className="activity-section">
        <h2 className="activity-icon icon">Activity</h2>
        <ul className="horiz-list">
          <li className="not-implemented">Show Details</li>
        </ul>
        <ul className="modal-activity-list">
          <ActivityComment />
          <ActivityLog />
        </ul>
      </li>
    </>
  )
}

export default CardActivity;