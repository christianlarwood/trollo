import React from 'react';
import ActivityComment from './ActivityComment';
import ActivityAction from './ActivityAction';

const CardActivity = ({ comments, actions }) => {
    // need to get all activity
   // need to iterate over an array of activities and render each respective component

   /**
    * []comments
    * []actions
    * concatenate and sort by createdAt
    * map into components
    * render!
    *
    * comment
    * {
      "cardId": 9,
      "comment": {
        "text": "This is my comment"
      }
    }
    action
        {
      "_id": 50,
      "description": " marked the due date complete",
      "createdAt": "2020-10-08T18:15:25.014Z",
      "updatedAt": "2020-10-08T18:15:25.014Z",
      "cardId": 9
    },
    */
  const mapActivityToComponent = (activity) => {
    if (activity.description) {
      return <ActivityAction key={activity._id} action={activity}/>
    } else {
      return <ActivityComment key={activity._id} comment={activity}/>;
    }
  };

  const activity = comments.concat(actions).sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt)
  }).map(mapActivityToComponent)

  return (
    <>
      <li className="activity-section">
        <h2 className="activity-icon icon">Activity</h2>
        <ul className="horiz-list">
          <li className="not-implemented">Show Details</li>
        </ul>
        <ul className="modal-activity-list">
          { activity }
        </ul>
      </li>
    </>
  )
}

export default CardActivity;