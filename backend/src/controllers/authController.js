const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db/pool");
const env = require("../config/env");

const isEmail = (value) => value.includes("@");
const isMobile = (value) => /^\d{8,15}$/.test(value);

const signup = async (req, res) => {
  const { mobile, email, password, fullName, username } = req.body;

  if (!mobile || !email || !password || !fullName || !username) {
    return res.status(400).json({ message: "mobile, email, password, fullName and username are required" });
  }

  if (!isMobile(mobile)) {
    return res.status(400).json({ message: "mobile must be 8 to 15 digits" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "password must be at least 6 characters" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const query = `
      INSERT INTO users (full_name, username, email, mobile, password_hash)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, full_name, username, email, mobile, created_at;
    `;

    const values = [fullName, username, email.toLowerCase(), mobile, passwordHash];
    const { rows } = await pool.query(query, values);

    return res.status(201).json({
      message: "Signup successful",
      user: rows[0]
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "email, mobile or username already exists" });
    }

    return res.status(500).json({ message: "Failed to signup" });
  }
};

const login = async (req, res) => {
  const { loginId, password } = req.body;

  if (!loginId || !password) {
    return res.status(400).json({ message: "loginId and password are required" });
  }

  let field = "username";
  let normalizedLoginId = loginId;

  if (isEmail(loginId)) {
    field = "email";
    normalizedLoginId = loginId.toLowerCase();
  } else if (isMobile(loginId)) {
    field = "mobile";
  }

  try {
    const query = `
      SELECT id, full_name, username, email, mobile, password_hash
      FROM users
      WHERE ${field} = $1
      LIMIT 1;
    `;

    const { rows } = await pool.query(query, [normalizedLoginId]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];
    const passwordMatches = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ sub: user.id }, env.jwt.secret, {
      expiresIn: env.jwt.expiresIn
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        username: user.username,
        email: user.email,
        mobile: user.mobile
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to login" });
  }
};

module.exports = {
  signup,
  login
};
