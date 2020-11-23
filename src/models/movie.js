const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema(
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
module.exports = mongoose.model("Song", songSchema);
