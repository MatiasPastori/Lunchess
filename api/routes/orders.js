const express = require("express");
const Orders = require("../models/orders");
const { isAuthenticated, hasRoles } = require("../auth/index");

const router = express.Router();

// TODO: Remove repeated logic in this method
router.get("/", isAuthenticated, (req, res) => {
  if (req.user.role.indexOf("admin") > -1) {
    Orders.find()
      .exec()
      .then((orders) => res.status(200).send(orders));
  } else {
    Orders.find({ user_id: req.user._id })
      .exec()
      .then((orders) => res.status(200).send(orders));
  }
});

router.get("/:id", isAuthenticated, (req, res) => {
  Orders.findById(req.params.id)
    .exec()
    .then((order) => res.status(200).send(order));
});

router.post("/", isAuthenticated, (req, res) => {
  const { _id } = req.user;
  Orders.create({ ...req.body, user_id: _id }).then((order) =>
    res.status(201).send(order)
  );
});

// TODO: Test that a user is allowed to update an existing order only if he has the admin role.
router.put("/:id", isAuthenticated, hasRoles(["admin", "user"]), (req, res) => {
  Orders.findOneAndUpdate(req.params.id, req.body).then((order) =>
    res.sendStatus(204)
  );
});

// TODO: Test that a user is allowed to update an existing order only if he has the admin role.
router.delete("/:id", isAuthenticated, (req, res) => {
  Orders.findOneAndDelete(req.params.id, req.body).then((order) => {
    res.sendStatus(204);
  });
});
module.exports = router;
