const { check } = require("express-validator");

exports.validateList = [check("title").not().isEmpty()];
exports.validateCard = [check("title").not().isEmpty()];
exports.validateBoard = [check("title").not().isEmpty()];
