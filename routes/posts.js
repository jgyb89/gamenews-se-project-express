const router = require("express").Router();
const {
  getPosts,
  createPost,
  deletePost,
  likePost,
  dislikePost,
} = require("../controllers/posts");
const { validatePostCreation, validateId } = require("../middlewares/validation");

// Read all posts (Considered a protected route based on the master router)
router.get("/", getPosts);

// Create and Delete
router.post("/", validatePostCreation, createPost);
router.delete("/:postId", validateId, deletePost);

// Like and Dislike
router.put("/:postId/likes", validateId, likePost);
router.delete("/:postId/likes", validateId, dislikePost);

module.exports = router;
