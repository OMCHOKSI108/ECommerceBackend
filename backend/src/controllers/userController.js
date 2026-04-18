const pool = require("../db/pool");

const getProfile = async (req, res) => {
  try {
    const query = `
      SELECT id, full_name, username, email, mobile, created_at
      FROM users
      WHERE id = $1
      LIMIT 1;
    `;

    const { rows } = await pool.query(query, [req.user.id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    return res.status(200).json({
      id: user.id,
      fullName: user.full_name,
      username: user.username,
      email: user.email,
      mobile: user.mobile,
      createdAt: user.created_at
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch profile" });
  }
};

module.exports = {
  getProfile
};
