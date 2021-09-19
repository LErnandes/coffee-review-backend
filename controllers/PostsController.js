const crudService = require("../services/crudService");
const validationService = require("../services/validationService");
const CacheService = require("../services/CacheService");
const Post = require("../model/Post");


async function createPosts(req, res) {
  try {
    validationService.validation(req, res);

    const { name } = req.body;

    let data = validationService.optionalfields({
      name,
    });

    await crudService.creater(req, res, data, Post, roles);
  } catch (error) {
    res.send({ message: "Erro ao deletar o post" });
  }
}

async function updatePosts(req, res) {
  try {
    validationService.validation(req, res);

    const { name } = req.body;

    let data = validationService.optionalfields({
      name,
    });

    await crudService.updater(req, res, data, Post, roles);
  } catch (error) {
    res.send({ message: "Erro ao deletar o post" });
  }
}

async function deletePosts(req, res) {
  try {
    await crudService.deleter(req, res, Post, roles);
  } catch (error) {
    res.send({ message: "Erro ao deletar o post" });
  }
}

async function getPosts(req, res) {
  try {
    const cachedPost = CacheService.get("POSTS");
    const Post;

    if (cachedPost) {
      return cachedPost;
    } else {
      Post = await Post.find();
      CacheService.set("POSTS", Post, 86400);
    }

    res.json(Post);
  } catch (error) {
    res.send({ message: "Erro ao encontrar o post" });
  }
}

async function getPostsById(req, res) {
  try {
    const { id } = req.params;
    const Post;
    const cachedPost = CacheService.get(`POST_${id}`);

    if (cachedPost) {
      return cachedPost;
    } else {
      Post = await Post.findById(id);
      CacheService.set(`POST_${id}`, Post, 86400);
    }

    res.json(Post);
  } catch (error) {
    res.send({ message: "Erro ao encontrar o post" });
  }
}

module.exports = {
  createPosts,
  updatePosts,
  deletePosts,
  getPostsById,
  getPosts,
};
