const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const gadgetRoutes = require("./routes/gadget.routes");
const authRoutes = require("./routes/auth.routes");
const { swaggerUi, swaggerSpec } = require("./config/swagger");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

// Root route
app.get("/", (req, res) => {
  res.send("IMF Gadget API is running!");
});

// Routes
app.use("/api/gadgets", gadgetRoutes);
app.use("/api/auth", authRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app; // Export app for use in server.js
