export default function cards(state = [], action) {
  switch (action.type) {
    case "FETCH_LISTS_SUCCESS": {
      return action.lists;
    }
    case "BOARD_FETCHED": {
        let { lists } = action.board;
        const newCards = lists.reduce((acc, list) => {
          return acc.concat(list.cards);
        }, [])
        console.log(newCards);
        return newCards;
        // return state.filter(card => {
        //   card.boardId !== action.board._id
        // }).concat(newCards)
    }
    case "CREATE_CARD_SUCCESS": {
      return state.concat(action.card);
    }
    default:
      return state;
  }
}
