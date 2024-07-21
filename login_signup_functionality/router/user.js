const { Router } = require("express");
const {
  handleUserSignup,
  handleUserSignin,
} = require("../controller/handleSignUp");
const bcrypt = require("bcrypt");

const router = Router();

router.get("/signup", (req, res) => {
  res.render("singup");
});
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/signup", handleUserSignup);
router.post("/login", handleUserSignin);

module.exports = router;
