const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },

    redirectURL: {
      type: String,
      required: true,
    },

    visitHistory: [{ timestamps: { type: Number } }],
  },
  { timestamps: true },
);

//URL is the model which means a we can access that collection('url') using the URL
const URL = mongoose.model("url", urlSchema);

module.exports = URL;
