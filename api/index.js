const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
// app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const meals = require("./routes/meals");
const orders = require("./routes/orders");
const authentication = require("./routes/auth");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/meals", meals);
app.use("/api/orders", orders);
app.use("/api/auth", authentication);

module.exports = app;
