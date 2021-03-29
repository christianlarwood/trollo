const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = Schema.Types;
const CardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Card\'s title is required']
  },
  boardId: {
    type: ObjectId,
    ref: "Board"
  },
  listId: {
    type: ObjectId,
    ref: "List"
  },
  dueDate: Date,
  description: String,
  labels: [String],
  position: {
    type: Number,
    required: [true, "Card Position is required"],
    default: 65535.0
  },
  comments: [
    {
      type: ObjectId,
      ref: 'Card'
    }
  ]
  },
  { timestamps: true }
)

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;

// {"_id":{"$oid":"605a2ee33122698af973db07"},"title":"Rodney"}