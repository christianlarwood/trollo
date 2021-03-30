import React from 'react';
import { useDispatch } from 'react-redux';
import { createComment } from '../../actions/CardActions';
import useInput from '../../hooks/useInput';

const CardComment = ({ cardId }) => {
  const dispatch = useDispatch();
  const newCommentInput = useInput();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newComment = {
      cardId,
      comment: {
        text: newCommentInput.value
      }
    }
    dispatch(createComment(newComment, () => {
      newCommentInput.reset();
    }));
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
                value={newCommentInput.value} 
                {...newCommentInput.bind}
              ></textarea>
              <div>
                <a className="light-button card-icon sm-icon"></a>
                <a className="light-button smiley-icon sm-icon"></a>
                <a className="light-button email-icon sm-icon"></a>
                <a className="light-button attachment-icon sm-icon"></a>
              </div>
              <div>
                <input
                  type="submit"
                  className="button not-implemented"
                  value="Save"
                  onSubmit={handleSubmit}
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