const express = require("express");
const router = express.Router();
const {
  signupUser,
  signinUser,
  loadUser,
  socialLogin
} = require("../controllers/auth");
const {
  userSignupValidator,
  userSigninValidator
} = require("../validator/index");
const { auth } = require("../middleware/auth");

router.post("/signup", userSignupValidator, signupUser);
router.post("/signin", userSigninValidator, signinUser);
router.get("/", auth, loadUser);
router.post("/social", socialLogin);

module.exports = router;
