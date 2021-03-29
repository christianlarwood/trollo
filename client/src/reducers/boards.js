export default function boards(state = [], action) {
  switch (action.type) {
    case "FETCH_BOARDS_SUCCESS": {
      return action.boards
    }
    case "BOARD_FETCHED": {
      const {lists, ...newBoard} = action.board
      return state.filter(board => board._id !== newBoard._id).concat(newBoard);
    }
    case "CREATE_BOARD_SUCCESS": {
      return state.concat(action.board)
    }
    default:
      return state;
  }
}
