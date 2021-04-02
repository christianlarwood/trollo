import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

// action creator that returns an object with the new data that dispatch will use to update state in Redux
export function fetchCardRequest() {
  return { type: types.FETCH_CARD_REQUEST };
}

export function fetchCardSuccess(card) {
  return { type: types.FETCH_CARD_SUCCESS, card };
}

export function cardFetched(card) {
  return { type: types.CARD_FETCHED, card };
}

export function createCardRequest() {
  return { type: types.CREATE_CARD_REQUEST };
}

export function createCardSuccess(card) {
  return { type: types.CREATE_CARD_SUCCESS, card: card };
}

export function updateCardRequest(card) {
  return { type: types.UPDATE_CARD_REQUEST, card };
}

export function updateCardSuccess(card) {
  return { type: types.UPDATE_CARD_SUCCESS, card };
}

export function createCommentRequest() {
  return { type: types.CREATE_COMMENT_REQUEST };
}

export function createCommentSuccess(comment) {
  return { type: types.CREATE_COMMENT_SUCCESS, comment: comment };
}

// export function fetchComments() {

// }

// {
//   "cardId": 9,
//   "comment": {
//     "text": "This is my comment"
//   }
// }

export function createComment(comment, callback) {
  return function (dispatch) {
    dispatch(createCommentRequest());
    apiClient.createComment(comment, (data) => {
      dispatch(createCommentSuccess(data.comment));

      if (callback) {
        callback(data.comment);
      }
    })
  }
}

// export function fetchCards() {
//   return function (dispatch) {
//     dispatch(fetchCardsRequest()); // defaults the state
//     apiClient.getCards((data) => dispatch(fetchCardsSuccess(data.cards)));
//   };
// }

export function fetchCard(id) {
  return function (dispatch) {
    dispatch(fetchCardRequest()); // defaults the state
    apiClient.getCard(id, (data) => {
      dispatch(cardFetched(data.card))

    });
  };
}
export function createCard(card, callback) {
  return function (dispatch) {
    dispatch(createCardRequest());
    apiClient.createCard(card, (data) => {
      dispatch(createCardSuccess(data.card));

      if (callback) {
        callback(data.card);
      }
    });
  };
}

export function updateCard(id, card, callback) {
  return function (dispatch) {
    dispatch(updateCardRequest());
    apiClient.updateCard(id, card, (data) => {
      dispatch(updateCardSuccess(data.card))

      if (callback) {
        callback(data.card);
      }
    });
  };
}