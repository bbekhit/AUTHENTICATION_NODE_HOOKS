const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { getUserProfile, createProfile } = require("../controllers/profile");

router.get("/me", auth, getUserProfile);
router.post("/profile", auth, createProfile);

module.exports = router;
