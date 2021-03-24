export default function boards(state = [], action) {
  switch (action.type) {
    case "BOARDS_FETCHED": {
      return action.boards.map(board => {
        board = {...board, lists: undefined}
        return board
      });
    }
    case "CREATE_BOARD_SUCCESS": {
      const newBoard = action.board;
      return state.concat(newBoard);
    }
    default:
      return state;
  }
}
