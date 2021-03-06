const Board = require("../models/board");
const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getBoards = (req, res, next) => {
  Board.find({}, "title _id createdAt updatedAt").then((boards) => {
    res.json({
      boards,
    });
  });
};

const getBoard = (req, res, next) => {
  Board.findById(req.params.id)
    .populate({
      path: "lists",
      populate: {
        path: "cards",
        populate: [
          {
            path: "comments",
          },
          // {
          //   path: "actions",
          // },
        ]
      },
    })
    .then((board) => {
      res.json({ board });
    })
    .catch((err) => next(new HttpError("Board cannot be found.", 500)));
};

const createBoard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Board.create(req.body)
      .then((board) => {
        Board.find({ _id: board._id }, "title _id createdAt updatedAt").then(board => res.json({ board }))
      })
      .catch(err =>
        next(new HttpError("Creating board failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const addListToBoard = (req, res, next) => { // also has req.list
  Board.findByIdAndUpdate(req.body.boardId, { '$addToSet': { lists: req.list._id } })
    .then(updatedBoard => {
      next();
    })
}
// { '$addToSet': { <field1>: <value1>, ... } }

exports.getBoards = getBoards;
exports.createBoard = createBoard;
exports.getBoard = getBoard;
exports.addListToBoard = addListToBoard;