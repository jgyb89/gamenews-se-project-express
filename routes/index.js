const router = require("express").Router();
const { createUser, login } = require("../controllers/users");

// Authentication Routes
router.post("/signup", createUser);
router.post("/signin", login);

// Fallback for completely missing routes
router.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

module.exports = router;
