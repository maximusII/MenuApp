const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); //del

const app = express();

mongoose.connect(
  "mongodb+srv://maximusII:mongopass@cluster0-byvpn.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(err) {
    if (err) throw err;
    console.log("Successfully connected to DB");
  }
);

app.use(bodyParser.json()); //del

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
