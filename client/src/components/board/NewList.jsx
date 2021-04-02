import React, {useState} from 'react';
import useInput from '../../hooks/useInput'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../actions/ListActions';

const NewList = ({ boardId }) => {
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();
  // const lastPosition = useSelector(state => {
  //   return state.lists.filter(l => l.boardId === boardId)
  // }).reduce((acc, curr) => {
  //   return acc > curr ? acc : curr
  // }, 70000.0)
  const titleInputObject = useInput('');
  const handleClick = (event) => {
    event.preventDefault()
   
    const { value: title } = titleInputObject
    if (!title) return;

    dispatch(actions.createList({ title, boardId, cards:[]}, closeForm))
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
      <input type="text" placeholder="Add a list..." {...bind} autoFocus/>
      <div>
        <input type="submit" className="button" value="Save" onClick={handleClick} />
        <i onClick={toggleSelected}className="x-icon icon"></i>
      </div>
    </div>
  )
}


export default NewList;
