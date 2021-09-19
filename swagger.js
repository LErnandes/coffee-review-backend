const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./index.js"];

const doc = {
  host: "localhost:4000",
  basePath: "/",
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: "User",
      description: "Endpoints",
      path: '/users'
    },
    {
      name: "Posts",
      description: "Endpoints",
      path: '/posts'
    },
  ],
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./index.js");
});
