const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../constants");

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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, JWT_KEY);

  user.tokens.push({ token });

  await user.save();

  return token;
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.tokens;
  delete user._id;
  delete user.__v;
  return user;
};

userSchema.methods.deleteToken = async function (token) {
  const user = this;

  user.tokens = user.tokens.filter((t) => t.token !== token);

  await user.save();
};

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });

  const error = new Error("Invalid login credentials");
  error.statusCode = 401;

  if (!user) {
    throw error;
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) throw error;

  return user;
};

userSchema.statics.findByToken = async (token) => {
  const decodedId = jwt.verify(token, JWT_KEY);
  const user = await User.findOne({ _id: decodedId, "tokens.token": token });

  if (!user) {
    const error = new Error("Token Expired");
    error.statusCode = 401;
    return error;
  }
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
