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
  archived: {
    type: Boolean,
    default: false,
  },
  comments: [
    {
      type: ObjectId,
      ref: 'Comment',
    }
  ],
  actions: [
    {
      type: ObjectId,
      ref: 'Action',
    },
  ],
  },
  { timestamps: true }
)

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;

// {
//   "_id": 9,
//   "title": "My new card",
//   "description": "",
//   "labels": [],
//   "listId": 13,
//   "position": 65535.0,
//   "archived": false,
//   "createdAt": "2020-10-08T17:54:55.285Z",
//   "updatedAt": "2020-10-08T17:54:55.285Z",
//   "dueDate": null,
//   "completed": false,
//   "boardId": 1,
//   "comments": [],
//   "actions": [
//     {
//       "_id": 49,
//       "description": " added this card to My list",
//       "createdAt": "2020-10-08T17:54:55.319Z",
//       "updatedAt": "2020-10-08T17:54:55.319Z",
//       "card_id": 9
//     }
//   ]
// }