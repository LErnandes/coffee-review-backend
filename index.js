require('dotenv').config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const swaggerFile = require("./swagger_output.json");

const user = require("./routes/user");
const posts = require("./routes/posts");
const InitiateMongoServer = require("./config/db");

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());

app.use(express.json());

app.use(express.static("public"));

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

app.use("/users", user);
app.use("/posts", posts);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
