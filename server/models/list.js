const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = Schema.Types;
const ListSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The List title is required']
  },
  boardId: {
    type: ObjectId,
    ref: "Board"
  },
  position: {
    type: Number,
    required: [true, "Card Position is required"],
    default: 65535.0
  },
  cards: [{
    type: ObjectId,
    ref: "Card",
  }]
},
  { timestamps: true }
)

const List = mongoose.model('List', ListSchema);

module.exports = List;