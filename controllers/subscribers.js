const router = require("express").Router();
const SubscribersModel = require("../models/subscribersModel");

// Routes

// Get all subscribers
router.get("/", async (req, res) => {
  try {
    const subscribers = await SubscribersModel.find();
    res.send(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get one subscriber
router.get("/:id", getSubscriber, (req, res) => {
  res.send(res.subscriber);
});

// create one subscriber
router.post("/", async (req, res) => {
  const subscriber = new SubscribersModel({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// update one subscriber
router.patch("/:id", getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
  }
  try {
    const updatedSubscriber = await res.subscriber.save();
    res.status(200).json(updatedSubscriber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete one subscriber
router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.send(`Subscriber successfully deleted!`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware
async function getSubscriber(req, res, next) {
  let findSubscriber;
  try {
    findSubscriber = await SubscribersModel.findById(req.params.id);

    if (!findSubscriber) {
      return res.status(404).json({ message: "Cannot find subscriber" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.subscriber = findSubscriber;
  next();
}

module.exports = router;
