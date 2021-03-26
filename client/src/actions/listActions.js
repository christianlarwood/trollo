import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

// action creator that returns an object with the new data that dispatch will use to update state in Redux
export function fetchListRequest() {
  return { type: types.FETCH_LIST_REQUEST };
}

export function fetchListSuccess(list) {
  return { type: types.FETCH_LIST_SUCCESS, list };
}

// export function listFetched(list) {
//   return { type: types.LIST_FETCHED, list };
// }

export function createListRequest() {
  return { type: types.CREATE_LIST_REQUEST };
}

export function createListSuccess(list) {

  return { type: types.CREATE_LIST_SUCCESS, list: list };
}

export function fetchLists() {
  return function (dispatch) {
    dispatch(fetchListRequest()); // defaults the state
    apiClient.getLists((data) => dispatch(fetchListSuccess(data.lists)));
  };
}

export function fetchList(id) {
  return function (dispatch) {
    dispatch(fetchListRequest()); // defaults the state
    apiClient.getList(id, (data) => {
      dispatch(listFetched(data.list))
    
    });
  };
}
export function createList(list, callback) {
  return function (dispatch) {
    dispatch(createListRequest());
    apiClient.createList(list, (data) => {
      dispatch(createListSuccess(data.list));

      if (callback) {
        callback(data.list);
      }
    });
  };
}