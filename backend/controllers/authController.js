const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

//SIGN UP
exports.signup = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password);
        const user = new User({ email, username, password: hashedPassword });
        await user.save();
        const token = await user.generateAuthToken();
        res.status(200).json({ user, token });
    } catch (error) {
        if (error?.keyPattern?.email)
            res.status(400).json({ message: 'Email ID already registered.' });
        else if (error?.keyPattern?.username)
            res.status(400).json({ message: 'Username already exists.' });
        else
            res.status(500).json({ message: 'Internal server error.' });
    }
};

//SIGN IN
exports.login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user,token});
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

exports.verify = async(req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if(!token) {
            res.status(400).json({message:"You must login first to start adding task"});
        }
        const user = await User.findByToken(token);
        res.send({user});
    } catch (err) {
        res.status(err.statusCode || 500).json({message: err.message});
    }
}
