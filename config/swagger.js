const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0", 
    info: {
      title: "User Management API",
      version: "1.0.0",
      description: "API documentation for Express User CRUD with JWT & Multer",
    },
    servers: [
      {
        url: "http://localhost:3030/api", // your base URL (adjust if PORT changes)
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"], // scan your route files for @swagger comments
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerSpec, swaggerUi };
