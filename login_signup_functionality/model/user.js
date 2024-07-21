const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const { createTokenForUser } = require("../service/auth");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profileImgLink: {
      type: String,
      default: "./assests/userAvatar.jpeg",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
    },
  },
  {
    timestamps: true,
  }
);

//converting normal password into encrypted one
// Pre-save hook to update the upatedAt field
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    user.salt = salt;
    next();
  } catch (err) {
    next(err);
  }
});

//checking correct login credentials
userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) return res.send({ msg: "no user" });
  console.log(user);

  const salt = user.salt;
  const hashedPassword = user.password;
  const hash = await bcrypt.hash(password, salt);

  if (hash !== hashedPassword) {
    return res.send({ msg: "wromg password" });
  }
  const token = createTokenForUser(user);
  return token;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
