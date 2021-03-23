const Card = require("../models/card");
const List = require("../models/list")
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getLists = (req, res, next) => {
  List.find({}, "title _id createdAt updatedAt cards")
    .then(lists => {
      res.json({
        lists,
      })
    })
};

const getList = (req, res, next) => {
  List.findById(req.params.id).populate("cards")
    .then(list => {
      res.json({ list })
    })
    .catch(err =>
      next(new HttpError("List cannot be found.", 500))
    );
};

const createList = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {

    List.create(req.body)
      .then((list) => {
        const listId = list._id
        List.find({ _id: list._id }, "title _id createdAt updatedAt cards").then(list => res.json({ list }))
      })
      .catch(err =>
        next(new HttpError("Creating list failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

exports.createList = createList;
exports.getLists = getLists;
exports.getList = getList;