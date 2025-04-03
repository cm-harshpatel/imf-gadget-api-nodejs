const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Required for Railway
});

const tables = ['"Users"', '"Gadgets"']; // Add all your table names here

const clearTables = async () => {
  try {
    const truncateQuery = `TRUNCATE TABLE ${tables.join(
      ", "
    )} RESTART IDENTITY CASCADE;`;
    await pool.query(truncateQuery);
    console.log("✅ All tables cleared successfully!");
  } catch (error) {
    console.error("❌ Error clearing tables:", error);
  } finally {
    await pool.end();
  }
};

clearTables();
