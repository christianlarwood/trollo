import React, {useState} from 'react';
import useInput from '../../hooks/useInput'
import { useDispatch } from 'react-redux';
import * as actions from '../../actions/ListActions';

const NewList = ({ boardId }) => {
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();
  const titleInputObject = useInput('');
  console.log(boardId)
  const handleClick = (event) => {
    event.preventDefault()
   
    const { value: title } = titleInputObject
    if (!title) return;

    dispatch(actions.createList({ title, boardId }, closeForm))
  }
  const closeForm = () => {
    toggleSelected();
    reset();
  }
  const { bind, reset } = titleInputObject;

  const toggleSelected = (e) => {
    if (e) e.preventDefault();
    setSelected(!selected);
  }

  return (
    <div id="new-list" className={selected ? "new-list selected" : "new-list"}>
      <span onClick={toggleSelected}>Add a list...</span>
      <input type="text" placeholder="Add a list..." {...bind} />
      <div>
        <input type="submit" className="button" value="Save" onClick={handleClick} />
        <i onClick={toggleSelected}className="x-icon icon"></i>
      </div>
    </div>
  )
}


export default NewList;
