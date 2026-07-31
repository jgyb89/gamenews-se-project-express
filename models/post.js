const mongoose = require("mongoose");
const validator = require("validator");

const postSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  gameTitle: {
    type: String,
    required: true,
  },
  categories: {
    type: [
      {
        type: String,
        enum: [
          "game content",
          "game development",
          "game promotion",
          "game review",
        ],
      },
    ],
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("post", postSchema);
