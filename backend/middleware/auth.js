const User = require('../models/userModel');
const {getTokenFromCookies} = require('../utils/auth');

const authenticateUser = async (req, res, next) => {
    try {
        const token = getTokenFromCookies(req,res);
        if(!token) return;

        const user = await User.findByToken(token);
        req.user = user;

        next();

    }catch {
        res.status(401).json({ message: 'Authentication failed' });
    }
}

module.exports = {authenticateUser};