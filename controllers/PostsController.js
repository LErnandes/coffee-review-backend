const validationService = require("../services/validationService");
const CacheService = require("../services/CacheService");
const crudService = require("../services/crudService");
const Post = require("../model/Post");
const User = require("../model/User");


async function createPosts(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (user == null) res.send({ message: "Não tem permissão para criar o post" });
    validationService.validation(req, res);

    const { name } = req.body;

    let data = validationService.optionalfields({
      name,
    });

    await crudService.creater(req, res, data, Post);
  } catch (error) {
    res.send({ message: "Erro ao criar o post" });
  }
}

async function updatePosts(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (user == null) res.send({ message: "Não tem permissão para atualizar o post" });
    validationService.validation(req, res);

    const { name } = req.body;

    let data = validationService.optionalfields({
      name,
    });

    await crudService.updater(req, res, data, Post);
  } catch (error) {
    res.send({ message: "Erro ao atualizar o post" });
  }
}

async function deletePosts(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (user == null) res.send({ message: "Não tem permissão para deletar o post" });
    await crudService.deleter(req, res, Post);
  } catch (error) {
    res.send({ message: "Erro ao deletar o post" });
  }
}

async function getPosts(req, res) {
  try {
    const cachedPost = CacheService.get("POSTS");
    const postData = undefined;

    if (cachedPost) {
      return cachedPost;
    } else {
      postData = await Post.find();
      CacheService.set("POSTS", postData, 86400);
    }

    res.json(Post);
  } catch (error) {
    res.send({ message: "Erro ao encontrar os posts" });
  }
}

async function getPostsById(req, res) {
  try {
    const { id } = req.params;
    const postData = undefined;
    const cachedPost = CacheService.get(`POST_${id}`);

    if (cachedPost) {
      return cachedPost;
    } else {
      postData = await Post.findById(id);
      CacheService.set(`POST_${id}`, postData, 86400);
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
