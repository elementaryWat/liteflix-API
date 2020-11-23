const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    genre_id: {
      type: Number,
      required: true,
    },
    file_path: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = mongoose.model("Movie", movieSchema);
