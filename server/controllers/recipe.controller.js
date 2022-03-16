const db = require("../models");
const Recipe = db.recipes;
// Create and Save a new recipe
exports.create = (req, res) => {
  
};
// Retrieve all recipes from the database.
exports.findAll = (req, res) => {
  
};
// Find a single recipe with an id
exports.findOne = (req, res) => {
  
};
// Update a recipe by the id in the request
exports.update = (req, res) => {
  
};
// Delete a recipe with the specified id in the request
exports.delete = (req, res) => {
  
};
// Delete all recipes from the database.
exports.deleteAll = (req, res) => {
  
};
// create recipe
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a recipe
  const recipe = new recipe({
    title: req.body.title,
    description: req.body.description,
      ingredients: req.body.ingredients,
      methods: req.body.methods,
    ingredientRows: req.body.ingredientRows,
      ingredientMethods: req.body.ingredientMethods,
    image: req.body.image,
  });
  // Save recipe in the database
  recipe
    .save(recipe)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the recipe."
      });
    });
};
// find recipe by title
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  Recipe.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving recipes."
      });
    });
};
// find recipe by id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Recipe.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found recipe with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving recipe with id=" + id });
    });
};
// update recipe
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  Recipe.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update recipe with id=${id}. Maybe recipe was not found!`
        });
      } else res.send({ message: "recipe was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating recipe with id=" + id
      });
    });
};
// delete a recipe
exports.delete = (req, res) => {
  const id = req.params.id;
  Recipe.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete recipe with id=${id}. Maybe recipe was not found!`
        });
      } else {
        res.send({
          message: "recipe was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete recipe with id=" + id
      });
    });
};
