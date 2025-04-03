const path = require("path");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "IMF Gadget API",
      version: "1.0.0",
      description: "API documentation for IMF Gadget System",
    },
    servers: [
      isProduction
        ? {
            url:
              process.env.PROD_SERVER_URL || "https://your-production-url.com",
            description: "Production Server",
          }
        : {
            url: process.env.DEV_SERVER_URL || "http://localhost:5000",
            description: "Local Development Server",
          },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Optional, but recommended
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },

  // Ensure the path is always correct
  apis: [path.join(__dirname, "../routes/*.js")],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = { swaggerUi, swaggerSpec };
