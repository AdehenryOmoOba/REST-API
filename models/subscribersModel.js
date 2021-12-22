const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriberSchema = new Schema({
  name: { type: String, required: true },
  subscribedToChannel: { type: String, required: true },
  subscribeDate: { type: Date, required: true, default: new Date().toString() },
});

module.exports = mongoose.model("subscriber", subscriberSchema);
