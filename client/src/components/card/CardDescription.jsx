import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateCard } from '../../actions/CardActions';
import useInput from "../../hooks/useInput";

const CardDescription = ({ cardId }) => {
  const description = useSelector((state) => state.cards).find((card) => card._id === cardId).description;
  const [editing, setEditing] = useState(false);
  const [anyDescriptionChanges, setAnyDescriptionChanges] = useState(false);
  const descriptionInput = useInput(description);
  const dispatch = useDispatch();

  const toggleEditDescription = () => {
    setEditing(!editing);
    if (description !== descriptionInput.value) setAnyDescriptionChanges(true);
  }

  const handleSubmit = () => {
    const card = {
      card: {
        description: descriptionInput.value,
      }
    };

    dispatch(updateCard(cardId, card, () => {
      setEditing(false);
      setAnyDescriptionChanges(false);
    }));
  }

  return (
    <form className="description">
      <p>Description</p>
      <span id="description-edit" className={editing ? "hidden": "link"} onClick={toggleEditDescription}>
        Edit
      </span>

        { editing ?
            <React.Fragment>
              <textarea className="textarea-toggle" rows="1" autoFocus {...descriptionInput.bind}/>
              <div>
                <div className="button" value="Save" onClick={handleSubmit}>
                  Save
                </div>
                <i className="x-icon icon" onClick={toggleEditDescription}></i>
              </div>
            </React.Fragment>
          :
          <p className="textarea-overlay">{descriptionInput.value}</p>
        }
      <p id="description-edit-options" className={anyDescriptionChanges ? "visible" : "hidden"}>
        {" "}You have unsaved edits on this field.{" "}
        <span className="link">View edits</span> -{" "}
        <span className="link">Discard</span>
      </p>
    </form>
  )
};

export default CardDescription;