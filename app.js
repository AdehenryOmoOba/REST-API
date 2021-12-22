if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

require("./db");
require("./models/subscribersModel");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const subscriberRouter = require("./controllers/subscribers");

// Middlewares
app.use(express.json());
app.use("/subscribers", subscriberRouter);

// Home Page
app.get("/", (req, res) => {
  res.send(`<h1>Home Page</h1>`);
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
