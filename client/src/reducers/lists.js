export default function lists(state = [], action) {
  switch (action.type) {
    case "BOARDS_FETCHED": {
      return action.boards.map(board => {
        let { lists } = board;
        if (!lists) {
          return [];
        }
        return lists.map(list => {
          return {...list, cards: undefined};
        })
      }).flat();
    }
    case "CREATE_LIST_SUCCESS": {
      const newList = action.list;
      return state.concat(newlist);
    }
    default:
      return state;
  }
}
