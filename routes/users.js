const router = require("express").Router();
const { getCurrentUser } = require("../controllers/users");

// GET /users/me - Returns the current user's profile data
router.get("/me", getCurrentUser);

module.exports = router;
