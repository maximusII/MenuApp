const mongoose = require("mongoose");
const Recipe = mongoose.model("recipes");

module.exports = app => {
  app.get(`/recipe`, async (req, res) => {
    let recipes = await Recipe.find();

    return res.status(200).send(recipes);
  });

  app.get(`/recipe/:id`, async (req, res) => {
    const { id } = req.params;
    let recipes = await Recipe.findById(id);

    return res.status(200).send(recipes);
  });

  app.post(`/recipe`, async (req, res) => {
    let date = new Date();
    let recipe = await Recipe.create(Object.assign(req.body, { date }));

    return res.status(201).send({
      error: false,
      recipe
    });
  });

  app.put(`/recipe/:id`, async (req, res) => {
    const { id } = req.params;
    let date = new Date();
    let recipe;
    let currentRecipe = await Recipe.findById(id);

    function delVersionsKeyFromRecipe() {
      currentRecipe.versions = undefined;
      currentRecipe = JSON.parse(JSON.stringify(currentRecipe));
      return currentRecipe;
    }

    if (currentRecipe.versions.length === 0) {
      currentRecipe.versions = undefined;
      currentRecipe = JSON.parse(JSON.stringify(currentRecipe));
      recipe = await Recipe.findByIdAndUpdate(
        id,
        Object.assign(req.body, { versions: currentRecipe }, { date })
      );
    } else {
      recipe = await Recipe.findByIdAndUpdate(
        id,
        Object.assign(
          req.body,
          {
            versions: [...currentRecipe.versions, delVersionsKeyFromRecipe()]
          },
          { date }
        )
      );
    }

    return res.status(202).send({
      error: false,
      recipe
    });
  });

  app.delete(`/recipe/:id`, async (req, res) => {
    const { id } = req.params;
    let recipe = await Recipe.findByIdAndDelete(id);

    return res.status(202).send({
      error: false,
      recipe
    });
  });
};
