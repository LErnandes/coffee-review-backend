const validationService = require("./validationService");
const User = require("../model/User");

async function getter(res, data, model, populates=[]) {
  try {
    const response = await model.find(data).populate(populates);

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao consultar o serviço");
  }
}

async function creater(req, res, data, model, roles) {
  const user = await User.findById(req.user.id);
  validationService.rolecheck(
    roles,
    user.role,
    res
  );

  try {
    var response = new model(data);

    await response.save();

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao criar");
  }
}

async function updater(req, res, data, model, roles) {
  const user = await User.findById(req.user.id);
  validationService.rolecheck(
    roles,
    user.role,
    res
  );

  try {
    const changeres = await model.updateOne({ _id: req.params.id }, { $set: data });

    res.status(200).json(changeres);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao criar");
  }
}

async function deleter(req, res, model, roles) {
  const user = await User.findById(req.user.id);
  validationService.rolecheck(
    roles,
    user.role,
    res
  );

  try {
    const response = await model.findById(req.params.id);

    await response.remove();

    return res.send();
  } catch {
    res.status(500).json({
      message: "Erro ao deletar",
    });
  }
}

module.exports = { getter, creater, updater, deleter };
