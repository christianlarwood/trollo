const Comment = require("../models/comment");
const Card = require("../models/card");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createComment = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Comment.create(req.body.comment)
    .then(comment => {
        Card.findByIdAndUpdate(req.body.cardId, { $push: { comments: comment._id } })
          .then(() => {
            res.json({ comment });
        })
        .catch(() => {
          next(new HttpError("The comment could not be attached to the card", 500))
      })
    })
    .catch(err => 
      new HttpError("Comment could not be created, whaaat", 500)  
    )
  } else {
    return next(new HttpError("The comment could not be created, text is needed", 422))
  }
};

exports.createComment = createComment;