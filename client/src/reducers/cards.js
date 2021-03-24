export default function cards(state = [], action) {
  switch (action.type) {
    case "FETCH_LISTS_SUCCESS": {
      return action.lists;
    }
    case "BOARDS_FETCHED": {
      return action.boards.map(board => {
        const { lists } = board
        let result = [];
        if (lists) {
          for (let i = 0; i < lists.length; i++) {
            const { cards } = lists[i];
            if (cards !== undefined) result.push(cards)
          }
        }
        
        return result;
      }).flat();
    }
    case "CREATE_LIST_SUCCESS": {
      const newCard = action.card;
      return state.concat(newCard);
    }
    default:
      return state;
  }
}
