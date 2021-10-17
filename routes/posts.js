const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const PostsController = require("../controllers/PostsController");

router.get("/", async (req, res) => {
  // #swagger.tags = ['Posts']
  PostsController.getPosts(req, res);
});

router.get("/:id", async (req, res) => {
  // #swagger.tags = ['Posts']
  PostsController.getPostsById(req, res);
});

router.post("/", auth, async (req, res) => {
  // #swagger.tags = ['Posts']
  PostsController.createPosts(req, res);
});

router.put("/:id", auth, async (req, res) => {
  // #swagger.tags = ['Posts']
  PostsController.updatePosts(req, res);
});

router.delete("/:id", auth, async (req, res) => {
  // #swagger.tags = ['Posts']
  PostsController.deletePosts(req, res);
});

module.exports = router;
