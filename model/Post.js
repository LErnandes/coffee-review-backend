const mongoose = require("mongoose");

const PostsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Int16Array,
    required: true,
  },
  ratingCount: {
    type: Int16Array,
    required: true,
  },
  priceRating: {
    type: Int16Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("PostType", PostsSchema);
