const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // ✅ Using bcryptjs (for consistency)
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!["admin", "agent"].includes(role)) {
      return res.status(400).json({ message: "Invalid role." });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const newUser = await User.create({ name, email, password, role });

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
