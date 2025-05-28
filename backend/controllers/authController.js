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
        const {username, password, rememberMe} = req.body;
        const user = await User.findByCredentials(username, password);
        const token = await user.generateAuthToken();

        const maxAge = rememberMe !== "on" ? 5*60*60*1000 : 7*24*60*60*1000;

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge,
        });
        
        return res.status(200).json({ user }); 

    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

exports.verify = async(req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: 'Not authenticated' });
        const user = await User.findByToken(token);
        return res.send({user});
    } catch (err) {
        res.status(err.statusCode || 500).json({message: err.message});
    }
}

exports.logout = async(req,res) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.status(400).json({message:"No token found"});
        }
        res.clearCookie('token');
        const user = await User.findByToken(token);
        await user.deleteToken(token);
        res.status(200).json({message:"Logged out succesfully"});
    } catch (err) {
        res.status(err.statusCode || 500).json({message: err.message});
    }
}
