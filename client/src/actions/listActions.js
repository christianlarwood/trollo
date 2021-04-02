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
  return { type: types.CREATE_LIST_SUCCESS, list };
}

export function updateListSuccess(newList) {
  return { type: types.UPDATE_LIST_SUCCESS, newList };
}

export function updateListRequest() {
  return { type: types.UPDATE_LIST_REQUEST }
}

export function updateList(newList, callback) {
  return function (dispatch){
    dispatch(updateListRequest());
    apiClient.updateList(newList, (list) => {
      dispatch(updateListSuccess(list));

      if (callback) {
        callback(list);
      }
    })
  }
}
// boardId: "605cbbf91c60758168de1917"
// cards: []
// createdAt: "2021-03-26T17:31:43.334Z"
// title: "test my life"
// updatedAt: "2021-03-26T19:22:21.071Z"
// __v: 0
// _id: "605e1a7f8ead77ed09e31dce"
// export function createList(list, callback) {

//   return function (dispatch) {
//     dispatch(createListRequest());
//     apiClient.createList(list, (data) => {
//       console.log(data.list)
//       dispatch(createListSuccess(data.list));

//       if (callback) {
//         callback(data.list);
//       }
//     });
//   };
// }
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