require("dotenv").config();
const { Sequelize } = require("sequelize");

const isProduction = process.env.NODE_ENV === "production";

const sequelize = isProduction
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Required for Railway PostgreSQL
        },
      },
      logging: false, // Disable logging
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || "postgres",
        logging: false, // Disable logging for cleaner console output
      }
    );

// Ensure tables are created only if they don't exist
sequelize
  .sync({ alter: true }) // Change `alter` to `force: true` if you want to reset tables on every restart
  .then(() => console.log("✅ Database synced"))
  .catch((err) => console.error("❌ Database sync error:", err));

module.exports = sequelize;
