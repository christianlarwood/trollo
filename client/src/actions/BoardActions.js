import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

// action creator that returns an object with the new data that dispatch will use to update state in Redux
export function fetchBoardsRequest() {
  return { type: types.FETCH_BOARDS_REQUEST };
}

export function fetchBoardRequest() {
  return { type: types.FETCH_BOARD_REQUEST };
}
export function fetchBoardsSuccess(boards) {
  return { type: types.FETCH_BOARDS_SUCCESS, boards };
}

export function boardFetched(board) {
  return { type: types.BOARD_FETCHED, board };
}


export function createBoardRequest() {
  return { type: types.CREATE_BOARD_REQUEST };
}

export function createBoardSuccess(board) {

  return { type: types.CREATE_BOARD_SUCCESS, board: board };
}

export function fetchBoards() {
  return function (dispatch) {
    dispatch(fetchBoardsRequest()); // defaults the state
    apiClient.getBoards((data) => dispatch(fetchBoardsSuccess(data.boards)));
  };
}

export function fetchBoard(id) {
  return function (dispatch) {
    dispatch(fetchBoardRequest()); // defaults the state
    apiClient.getBoard(id, (data) => {
      dispatch(boardFetched(data.board))
    
    });
  };
}
export function createBoard(board, callback) {
  return function (dispatch) {
    dispatch(createBoardRequest());
    apiClient.createBoard(board, (data) => {
      dispatch(createBoardSuccess(data.board));

      if (callback) {
        callback(data.board);
      }
    });
  };
}
