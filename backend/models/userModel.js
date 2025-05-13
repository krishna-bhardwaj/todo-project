const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../constants');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id},JWT_KEY);

    user.tokens.push({token})

    await user.save();

    return token;
}

userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject._id;
    delete userObject.__v;
    return userObject;
};

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username });

    const error = new Error("Invalid login credentials");
    error.statusCode = 401;

    if (!user) throw error;

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) throw error;

    return user;
};


const User = mongoose.model('User', userSchema);

module.exports = User;
