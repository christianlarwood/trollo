const Board = require("../models/board");
const List = require("../models/list")
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getBoards = (req, res, next) => {
  Board.find({}, "title _id createdAt updatedAt")
    .then(boards => {
      res.json({
        boards,
      })
    })
};

const getBoard = (req, res, next) => {
  Board.findById(req.params.id).populate({
    path: "lists",
    populate: {
      path: "cards"
    },
  })
    .then(board => {
      res.json({ board })
    })
    .catch(err =>
      next(new HttpError("Board cannot be found.", 500))
    );
};

const createBoard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const {title, lists} = req.body

    Board.create({title})
      .then((board) => {
        const boardId = board._id
        // if (!lists) return Board.findById(board._id)
        Board.find({ _id: board._id }, "title _id createdAt updatedAt").then(board => res.json({ board }))
      })
      .catch(err =>
        next(new HttpError("Creating board failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

// const createList = async (boardId, list) => {
//   const { cards } = list
//   list.cards = undefined
//   const newList = List.create({ boardId, ...list })
//   if (!cards) return newList
//   const listId = newList._id
//   const boardId = newList.boardId
//   cards.forEach(async card => {
//     let newCard = await createCard(listId, boardId, card)
//   })

//   return newList
// }

// const createCard = async (listId, boardId, card) => {
//   return await Card.create({...card, listId, boardId})
// }
// const createBoard = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (errors.isEmpty()) {
//     try {
//       const { title, lists } = req.body
//       const board = await Board.create({ title })
//       const boardId = board._id
//       if (!lists) return board;
    
//       lists.forEach(async list => {
//         await createList(boardId, list)
//       })
//     } catch (error) {
//       next(new HttpError("Creating board failed, please try again", 500))
      
//     }
//   }
// }

exports.getBoards = getBoards;
exports.createBoard = createBoard;
exports.getBoard = getBoard;