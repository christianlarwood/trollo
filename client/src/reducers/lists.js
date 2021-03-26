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
    default:
      return state;
  }
}
