const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    genre_ids: {
      type: [Number],
      required: true,
    },
    poster_path: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = mongoose.model("Movie", movieSchema);