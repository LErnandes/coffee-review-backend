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

    await crudService.creater(req, res, req.body, Post);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Erro ao criar o post" });
  }
}

async function updatePosts(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (user == null) res.send({ message: "Não tem permissão para atualizar o post" });
    validationService.validation(req, res);

    await crudService.updater(req, res, req.body, Post);
    res.json(req.body);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Erro ao atualizar o post" });
  }
}

async function deletePosts(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (user == null) res.send({ message: "Não tem permissão para deletar o post" });
    
    await crudService.deleter(req, res, Post);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Erro ao deletar o post" });
  }
}

async function getPosts(req, res) {
  try {
    let postData = await Post.find();
    
    return res.json(postData);
  } catch (error) {
    console.error(error);
    res.send({ message: "Erro ao encontrar os posts" });
  }
}

async function getPostsById(req, res) {
  try {
    const { id } = req.params;
    let postData = undefined;
    const cachedPost = CacheService.get(`POST_${id}`);

    if (cachedPost) {
      return cachedPost;
    } else {
      postData = await Post.findById(id);
      CacheService.set(`POST_${id}`, postData, 86400);
    }

    res.json(postData);
  } catch (error) {
    console.error(error);
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
