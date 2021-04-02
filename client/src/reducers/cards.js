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
      return newCards;
    }
    case "CREATE_CARD_SUCCESS": {
      return state.concat(action.card);
    }
    case "CARD_FETCHED": {
      if (state.find(card => card._id === action.card._id)) {
        return state.map(card => card._id === action.card._id ? action.card : card)
      } else {
        return state.concat(action.card);
      }
    }
    case "CREATE_COMMENT_SUCCESS": {
      let comment = action.comment;
      return state.map(card => {
        if (card._id === comment.cardId) {
          return Object.assign({}, card, {comments: card.comments.concat(action.comment)})
        }
        return card;
      });
    }
    case "UPDATE_CARD_SUCCESS": {
      const id = action.card._id;

      return state.map(card => card._id === id ? action.card : card);
    }
    default:
      return state;
  }
}
