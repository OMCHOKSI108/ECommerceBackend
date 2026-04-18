const jwt = require("jsonwebtoken");
const env = require("../config/env");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid authorization token" });
  }

  const token = authHeader.slice(7);

  try {
    const payload = jwt.verify(token, env.jwt.secret);
    req.user = { id: payload.sub };
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = auth;
