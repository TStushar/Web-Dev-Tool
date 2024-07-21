const User = require("../model/user");

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    await User.create({ name, email, password });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    return res.redirect("/user/signup");
  }
}

async function handleUserSignin(req, res) {
  const { email, password } = req.body;
  try {
    const token = await User.matchPassword(email, password);
    res.cookie("token", token);
    console.log(token);
    return res.redirect("/");
  } catch (error) {
    console.log("should not be here");
    return res.render("login", {
      error: "incorrect password or email",
    });
  }
}

module.exports = {
  handleUserSignup,
  handleUserSignin,
};
