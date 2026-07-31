const Post = require("../models/post");

const getPosts = (req, res) => {
  Post.find({})
    .sort({ createdAt: -1 })
    .then((posts) => res.status(200).send(posts))
    .catch(() => res.status(500).send({ message: "An error has occurred on the server" }));
};

const createPost = (req, res) => {
  const { imageUrl, gameTitle, categories } = req.body;
  const owner = req.user._id;

  Post.create({ imageUrl, gameTitle, categories, owner })
    .then((post) => res.status(201).send(post))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Invalid data passed to create post" });
      }
      return res.status(500).send({ message: "An error has occurred on the server" });
    });
};

const deletePost = (req, res) => {
  const { postId } = req.params;

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        return res.status(404).send({ message: "Post not found" });
      }
      // Verify authorization: only the owner can delete their post
      if (!post.owner.equals(req.user._id)) {
        return res.status(403).send({ message: "You are not authorized to delete this post" });
      }
      return Post.deleteOne({ _id: postId }).then(() =>
        res.status(200).send({ message: "Post successfully deleted" })
      );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid ID format" });
      }
      return res.status(500).send({ message: "An error has occurred on the server" });
    });
};

const likePost = (req, res) => {
  Post.findByIdAndUpdate(
    req.params.postId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((post) => {
      if (!post) {
        return res.status(404).send({ message: "Post not found" });
      }
      return res.status(200).send(post);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid ID format" });
      }
      return res.status(500).send({ message: "An error has occurred on the server" });
    });
};

const dislikePost = (req, res) => {
  Post.findByIdAndUpdate(
    req.params.postId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((post) => {
      if (!post) {
        return res.status(404).send({ message: "Post not found" });
      }
      return res.status(200).send(post);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid ID format" });
      }
      return res.status(500).send({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  getPosts,
  createPost,
  deletePost,
  likePost,
  dislikePost,
};
