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
      return state.concat(action.card);
    }
    case "CREATE_COMMENT_SUCCESS": {
      let { comment } = action.comment;
      let cards = [...state];
      return cards.map(card => {
        if (card._id === comment.cardId) {
          card.comments.concat(comment);
        }
        return card;
      });
    }
    default:
      return state;
  }
}
