const router = require("express").Router();
const {
  getPosts,
  createPost,
  deletePost,
  likePost,
  dislikePost,
} = require("../controllers/posts");

// Read all posts (Considered a protected route based on the master router)
router.get("/", getPosts);

// Create and Delete
router.post("/", createPost);
router.delete("/:postId", deletePost);

// Like and Dislike
router.put("/:postId/likes", likePost);
router.delete("/:postId/likes", dislikePost);

module.exports = router;
