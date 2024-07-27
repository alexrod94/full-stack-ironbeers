const router = require("express").Router();
const Beer = require("../models/Beer.model");

// GET all beers
router.get("/", (req, res, next) => {
  Beer.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message: "Something went wrong" }));
});

// GET random beer
router.get("/random", (req, res, next) => {
  Beer.find()
    .then((data) => {
      const randomNumber = Math.floor(Math.random() * data.length);
      res.json(data[randomNumber]);
    })
    .catch((err) => res.status(500).json({ message: "Something went wrong" }));
});

// GET one beer
router.get("/:id", (req, res, next) => {
  Beer.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message: "Something went wrong" }));
});

// POST beer
router.post("/", (req, res, next) => {
  Beer.create(req.body)
    .then((data) => res.json({ message: "Somos los más guays" }))
    .catch((error) => res.status(500).json({ message: "No somos tan guays" }));
});

module.exports = router;
