export default function boards(state = [], action) {
  switch (action.type) {
    case "FETCH_BOARDS_SUCCESS": {
      return action.boards.map(board => {...board, lists: undefined})
    }
    case "BOARD_FETCHED": {
      const newBoard = action.board;
      
      return state.filter(board => board._id !== newBoard._id).concat(newBoard);
    }
    case "CREATE_BOARD_SUCCESS": {
      const newBoard = action.board;
      return state.filter(board => board._id !== newBoard._id).concat(newBoard);
    }
    default:
      return state;
  }
}
