const Card = require("../models/card");
const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getLists = (req, res, next) => {
  List.find({}, "title _id createdAt updatedAt cards boardId").then((lists) => {
    res.json({
      lists,
    });
  });
};

const getList = (req, res, next) => {
  List.findById(req.params.id)
    .populate("cards")
    .then((list) => {
      res.json({ list });
    })
    .catch((err) => next(new HttpError("List cannot be found.", 500)));
};

const sendList = (req, res, next) => {
  const list = req.list
  if (list) {
    res.json({list})
  } else {
    next()
  }
}
const createList = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    // const {boardId, list} = req.body 
    // {boardId, cards: [], ...list}
    console.log(req.body)
    List.create(req.body)
      .then((newList) => {
        req.list = newList
        next()
      })
      .catch((err) =>
        next(new HttpError("Creating list failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const updateList = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    // console.log(req.body);
    
    List.findByIdAndUpdate(req.body._id, { title: req.body.title })
    .then(updatedList => {
      res.json(updatedList);
    } ,
        { new: true })
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

exports.createList = createList;
exports.getLists = getLists;
exports.getList = getList;
exports.sendList = sendList;
exports.updateList = updateList;