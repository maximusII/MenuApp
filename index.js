const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("./models/Recipe");

const app = express();

mongoose.connect(
  "mongodb+srv://maximusII:mongopass@cluster0-byvpn.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  function(err) {
    if (err) throw err;
    console.log("Successfully connected to DB");
  }
);

app.use(bodyParser.json());

require("./routes/recipeRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
