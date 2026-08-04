const router = require("express").Router();
const { createUser, login } = require("../controllers/users");
const userRouter = require("./users");
const postRouter = require("./posts"); // IMPORT NEW POST ROUTER
const auth = require("../middlewares/auth");

// 1. Unprotected Authentication Routes
router.post("/signup", createUser);
router.post("/signin", login);

// 2. Authorization Gateway
router.use(auth);

// 3. Protected Routes
router.use("/users", userRouter);
router.use("/posts", postRouter);

// 4. Fallback Route
router.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

module.exports = router;
