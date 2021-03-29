import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import * as actions from "../../actions/ListActions";

const NewListForm = (props) => {
  const { value: title, bind: bindTitle } = useInput("");

  const dispatch = useDispatch();

  const createList = useCallback((newList, callback) => {
      dispatch(actions.createList(newList, callback));
    },
    [dispatch]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      const newList = { title };
      createList(newList, props.onCloseClick(new Event("click")));
    },
    [createList, props, title]
  );

  return (
    <div>
      <header>
        <span>Create List</span>
        <a
          href="#"
          className="icon-sm icon-close"
          onClick={props.onCloseClick}
        ></a>
      </header>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <dl>
            <dt>Title</dt>
            <dd>
              <input
                type="text"
                placeholder='Like "Things to do"...'
                value={title}
                {...bindTitle}
              />
            </dd>
          </dl>
          <button className="button" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewListForm;
