const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipeSchema = new Schema({
  versions: Array,
  name: String,
  description: String,
  date: String
});

mongoose.model("recipes", recipeSchema);
