exports.getTokenFromCookies = (req, res) => {
  const token = req.cookies?.token;
  if (!token) {
    res.status(401).json({ message: 'Not authenticated' });
    return null;
  }
  return token;
};