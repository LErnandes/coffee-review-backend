const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const userController = require("../controllers/userController");


/*
router.post(
  "/signup",
  [
    check("email", "Por favor coloque um email válido").isEmail(),
    check("password", "Por favor coloque uma senha válida").isLength({
      min: 6,
    })
  ],
  async (req, res) => {
    // #swagger.tags = ['User']
    userController.signup(req, res);
  }
);
*/


router.post(
  "/login",
  [
    check("email", "Por favor coloque um email válido").isEmail(),
    check("password", "Por favor coloque um password válido").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // #swagger.tags = ['User']
    userController.login(req, res);
  }
);

module.exports = router;
