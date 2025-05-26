const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password);
        const user = new User({ email, username, password: hashedPassword });
        await user.save();
        return res.status(200).json({ message: "Registration Successfull!" });
    } catch (error) {
        if (error?.keyPattern?.email)
            return res.status(400).json({ message: 'Email ID already registered.' });
        else if (error?.keyPattern?.username)
            return res.status(400).json({ message: 'Username already exists.' });
        else
            return res.status(500).json({ message: 'Internal server error.' });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password);
        const token = await user.generateAuthToken();
        return res.send({user,token});
    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

exports.verify = async(req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if(!token) {
            return res.status(400).json({message:"No token found"});
        }
        const user = await User.findByToken(token);
        return res.send({user});
    } catch (err) {
        res.status(err.statusCode || 500).json({message: err.message});
    }
}

exports.logout = async(req,res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if(!token) {
            return res.status(400).json({message:"No token found"});
        }
        const user = await User.findByToken(token);
        await user.deleteToken(token);
        res.status(200).json({message:"Logged out succesfully"});
    } catch (err) {
        res.status(err.statusCode || 500).json({message: err.message});
    }
}
