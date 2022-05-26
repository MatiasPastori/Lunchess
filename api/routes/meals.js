const express = require("express");
const Meals = require("../models/meals");
const { isAuthenticated, hasRoles } = require("../auth");
const router = express.Router();

router.get("/", isAuthenticated, (req, res) => {
  Meals.find()
    .exec()
    .then((meals) => res.status(200).send(meals));
});

router.get("/:id", isAuthenticated, (req, res) => {
  Meals.findById(req.params.id)
    .exec()
    .then((meal) => res.status(200).send(meal));
});

// TODO: Test that the user is allowed to create a new meal by checking the roles.
router.post("/", isAuthenticated, hasRoles(["admin"]), (req, res) => {
  Meals.create(req.body).then((meal) => res.status(201).send(meal));
});

router.put("/:id", isAuthenticated, (req, res) => {
  Meals.findOneAndUpdate(req.params.id, req.body).then((meal) =>
    res.sendStatus(204)
  );
});

router.delete("/:id", isAuthenticated, hasRoles(["admin"]), (req, res) => {
  Meals.findOneAndDelete(req.params.id, req.body).then((meal) => {
    res.sendStatus(204);
  });
});

module.exports = router;
