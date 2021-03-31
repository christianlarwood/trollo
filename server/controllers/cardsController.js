const Card = require("../models/card");
const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getCards = (req, res, next) => {
  Card.find(
    {},
    "title _id createdAt updatedAt labels position boardId listId"
  ).then((cards) => {
    res.json({
      cards,
    });
  });
};

const getCard = (req, res, next) => {
  Card.findById(req.params.id)
    .populate("comments")
    .populate("actions")
    .then((card) => {
      res.json({ card });
    })
    .catch((err) => next(new HttpError("Card cannot be found.", 500)));
};

const createCard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Card.create(req.body.card)
      .then((card) => {
        List.findByIdAndUpdate(req.body.listId, { $push: { cards: card}})
        .then(() => res.json({ card }))
        .catch(new HttpError("Card created, but not added to list", 500));
      })
      .catch((err) =>
        next(new HttpError(`${err}`, 500))
      );
  } else {
    return next(new HttpError("Card has no title.", 404));
  }
};

const updateCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id, req.body.card, { new: true })
    .then((card) => res.json({ card }))
    .catch(new HttpError("Comment something something error"));
}

exports.createCard = createCard;
exports.getCards = getCards;
exports.getCard = getCard;
exports.updateCard = updateCard; 