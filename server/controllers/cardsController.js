const Card = require("../models/card");
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
    .then((card) => {
      res.json({ card });
    })
    .catch((err) => next(new HttpError("Card cannot be found.", 500)));
};

const createCard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Card.create(req.body)
      .then((card) => {
        const cardId = card._id;
        Card.find(
          { _id: cardId },
          "title _id listId boardId duedate createdAt updatedAt labels"
        ).then((card) => res.json({ card }));
      })
      .catch((err) =>
        next(new HttpError("Creating card failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

exports.createCard = createCard;
exports.getCards = getCards;
exports.getCard = getCard;
