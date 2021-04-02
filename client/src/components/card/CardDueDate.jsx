import React, { useState } from 'react';
import DatePopover from '../popovers/DatePopover';
import Popover from "../shared/Popover";

const CardDueDate = ({ dueDate }) => {
  const [addDate, setAddDate] = useState({ visible: false, attachedTo: null });

  const showEditDate = (event) => {
    setAddDate({ visible: true, attachedTo: event.target });
  }

  // (dueDate);
  return (
    <li className="due-date-section">
      <h3>Due Date</h3>
      <div id="dueDateDisplay" className="overdue completed" onClick={showEditDate}>
        <input
          id="dueDateCheckbox"
          type="checkbox"
          className="checkbox"
          readOnly
        />{dueDate}
      </div>
      <Popover type="due-date" {...addDate}>
        <DatePopover close={() => {setAddDate({visible: false})}} />
      </Popover>
    </li>
  )
}

export default CardDueDate;