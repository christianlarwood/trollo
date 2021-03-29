export default function lists(state = [], action) {
  switch (action.type) {
    case "BOARD_FETCHED": {
        let { lists } = action.board;
        const newLists = lists.reduce((acc, list) => {
          const { cards, ...listWithoutCards } = list
          return acc.concat(listWithoutCards)
        }, []);

        return state.filter(list => {
          list.boardId !== action.board._id
        }).concat(newLists)
    }
    case "CREATE_LIST_SUCCESS": {
      return state.concat(action.list)
    }
    case "UPDATE_LIST_SUCCESS": {
      // state.filter(list => )
      return state.map((list) => {
        if (list._id === action.newList._id) {
          list = action.newList;
        }
        return list;
      });
    }
    default:
      return state;
  }
}
