const express = require("express");
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const cardsController = require("../controllers/cardsController");
const {
  validateBoard,
  validateList,
  validateCard,
} = require("../validators/validators");

router.get("/boards", boardsController.getBoards);

router.get("/boards/:id", boardsController.getBoard);

router.post("/boards", validateBoard, boardsController.createBoard);

router.get("/lists", listsController.getLists);

router.get("/lists/:id", listsController.getList);

router.put("/lists/:id", listsController.updateList);

router.post("/lists", listsController.createList, boardsController.addListToBoard, listsController.sendList);

router.get("/cards", cardsController.getCards);

router.get("/cards/:id", cardsController.getCard);

router.post("/cards", validateCard, cardsController.createCard);

module.exports = router;
