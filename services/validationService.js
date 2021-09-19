const { validationResult } = require("express-validator");

function validation(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
}

function optionalfields(fields) {
  Object.keys(fields).forEach(key => fields[key] === undefined && delete fields[key])
  return fields
}

function rolecheck(roles, role, res) {
  if (!roles.includes(role)) {
    res.status(401).send("Você não tem permissão para fazer isso");
  }
}

module.exports = { validation, optionalfields, rolecheck };
