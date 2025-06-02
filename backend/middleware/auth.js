const User = require("../models/userModel");
const { getTokenFromCookies } = require("../utils/auth");

const authenticateUser = async (req, res, next) => {
  try {
    const token = getTokenFromCookies(req, res);
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findByToken(token);

    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = user;

    next();
  } catch {
    res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = { authenticateUser };
