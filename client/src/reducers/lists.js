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
      const theList = action.list
      return state.filter(list => list._id !== theList._id).concat(theList);
    }
    default:
      return state;
  }
}
