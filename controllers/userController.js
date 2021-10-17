const User = require("../model/User");
const validationService = require("../services/validationService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function maketoken(payload, res, user = {}) {
  jwt.sign(
    payload,
    process.env.SECRETKEY,
    {
      expiresIn: "7d",
    },
    (error, token) => {
      if (error) throw error;
      res.status(200).json({
        user,
        token,
      });
    }
  );
}


async function signup(req, res) {
  validationService.validation(req, res);
  const { email, password } = req.body;

  try {
    let user = await User.findOne({
      email,
    });

    if (user) {
      return res.status(400).json({
        message: "O usuário já existe",
      });
    }

    user = new User({ email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    maketoken({ user: { id: user.id } }, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar a conta");
  }
}


async function login(req, res) {
  validationService.validation(req, res);
  const { email, password } = req.body;
  try {
    let user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "Usuário não existe",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Senha incorreta",
      });
    }

    maketoken({ user: { id: user.id } }, res, user);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Erro ao entrar na conta",
    });
  }
}

module.exports = { login, signup };
