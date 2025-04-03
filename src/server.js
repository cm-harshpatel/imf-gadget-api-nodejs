require("dotenv").config(); // Load environment variables
const sequelize = require("./config/database"); // Import Sequelize instance
const app = require("./app"); // Import the configured app

const PORT = process.env.PORT || 5000;

// Function to start the server after DB connection is confirmed
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");

    await sequelize.sync();
    console.log("✅ Database synchronized!");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection or sync failed:", error);
    process.exit(1); // Stop the process if DB connection fails
  }
};

startServer();
