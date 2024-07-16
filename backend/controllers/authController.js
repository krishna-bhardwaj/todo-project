const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

//SIGN UP
exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const hassPassword = bcrypt.hashSync(password);
        const user = new User({ email, username, password: hassPassword });
        await user
            .save()
            .then(() =>
                res.status(200).json({ message: 'You have registered.' })
            );
        next();
    } catch (error) {
        if (error.keyPattern.email)
            res.status(200).json({ message: 'Email ID already registered.' });
        else if (error.keyPattern.username)
            res.status(205).json({ message: 'Username already exists.' });
        else res.status(400).json({ message: '!!! ERROR' });
        next();
    }
};

//SIGN IN
exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res
                .status(404)
                .json({ message: "Username doesn't exists." });
        }

        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Password is not Correct' });
        }

        const { password, ...other } = user._doc;
        return res.status(200).json({ ...other });
    } catch (error) {
        return res.status(500).json({ message: '!!! Error' });
    }
};
