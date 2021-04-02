import React, { useState } from "react";
import Popover from "../shared/Popover";
import LabelPopover from "../popovers/LabelPopover";

const CardLabels = ({ labels }) => {

  const [addLabels, setAddLabels] = useState({ visible: false, attachedTo: null});

  const showAddLabels = (e) => {
    setAddLabels({ visible: true, attachedTo: e.target});
  }


  return (
    <li className="labels-section">
      <h3>Labels</h3>
      {
        labels.map(color =>
            <div key={color} className="member-container">
              <div className={`${color} label colorblindable`}></div>
            </div>
          )
      }
      <div className="member-container">
        <i className="plus-icon sm-icon" onClick={showAddLabels}></i>
        <Popover type="labels" {...addLabels}>
          <LabelPopover labels={labels} close={() => {setAddLabels({visible: false})}}></LabelPopover>
        </Popover>
      </div>
    </li>
  )
}

export default CardLabels;