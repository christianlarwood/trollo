import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCard } from "../../actions/CardActions";

const LabelsPopover = ({ close }) => {
  const cardId = useParams().id;
  const card = useSelector(state => state.cards).find(({_id}) => cardId === _id);
  const dispatch = useDispatch();


  const [currentLabels, setCurrentLabels] = useState(card.labels);

  useEffect(() => {
    setCurrentLabels(card.labels);
  }, [card])

  const LabelPart = ({color}) => {



    const addLabel = () => {
      const card = {
        cardId: cardId,
        card: {
          labels: currentLabels.concat(color),
        }
      };
      dispatch(updateCard(cardId, card));
    };
 
    const removeLabel = () => {
      const card = {
        cardId: cardId,
        card: {
          labels: currentLabels.filter(label => color !== label),
        }
      };
      dispatch(updateCard(cardId, card));
    };

    const toggleLabel = () => {
      if   (currentLabels.includes(color)) removeLabel();
      else                                 addLabel();
    }
    
    return (
      <li>
        <div className={`${color} colorblindable`} onClick={toggleLabel}>
          { currentLabels.includes(color) &&  <i className="check-icon sm-icon"></i>}
        </div>
        <div className={`label-background ${color}`}></div>
        <div className="label-background-overlay"></div>
        <i className="edit-icon icon not-implemented"></i>
      </li>
    )
  }

  return (
    <div id="add-options-labels-dropdown">
      <header>
        <span>Labels</span>
        <a href="#" className="icon-sm icon-close" onClick={close}></a>
      </header>
      <div className="content">
        <input
          className="dropdown-input"
          placeholder="Search labels..."
          type="text"
        />
        <div className="labels-search-results">
          <ul className="label-list">
            {
              ["green", "yellow", "orange", "red", "purple", "blue"].map(color => 
                <LabelPart color={color} key={color}/>)
            }
          </ul>
          <ul className="light-list">
            <li className="not-implemented">Create a new label</li>
            <hr />
            <li className="toggleColorblind">
              Enable color blind friendly mode.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LabelsPopover;
