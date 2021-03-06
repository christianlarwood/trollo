import React from 'react';
import { useDispatch } from 'react-redux';
import useInput from '../../hooks/useInput';

const CardComment = ({ cardId, commentDispatch }) => {
  const dispatch = useDispatch();
  const newCommentInput = useInput();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newComment = {
      cardId,
      comment: {
        cardId,
        text: newCommentInput.value
      }
    };

    dispatch(commentDispatch(newComment, () => {
      newCommentInput.reset();
      newCommentInput.setValue("");
      })
    );
  }

  return (
    <>
      <li className="comment-section">
        <h2 className="comment-icon icon">Add Comment</h2>
        <div>
          <div className="member-container">
            <div className="card-member">TP</div>
          </div>
          <div className="comment">
            <label>
              <textarea
                required=""
                rows="1"
                placeholder="Write a comment..."
                {...newCommentInput.bind}
              />
              <div>
                <a className="light-button card-icon sm-icon"></a>
                <a className="light-button smiley-icon sm-icon"></a>
                <a className="light-button email-icon sm-icon"></a>
                <a className="light-button attachment-icon sm-icon"></a>
              </div>
              <div>
                <input
                  type="submit"
                  // className="button not-implemented"
                  className="button"
                  value="Save"
                  onClick={handleSubmit}
                />
              </div>
            </label>
          </div>
        </div>
      </li>
    </>
  )
}

export default CardComment;