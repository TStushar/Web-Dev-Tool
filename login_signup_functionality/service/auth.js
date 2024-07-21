const JWT = require("jsonwebtoken");
const secreteKey = "$ajfkafdjkaaf";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImgLink: user.profileImgLink,
    role: user.role,
  };
  const token = JWT.sign(payload, secreteKey, {
    expiresIn: "48h",
  });

  return token;
}

function validateToken(token) {
  const playload = JWT.verify(token, secreteKey);
  return playload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
