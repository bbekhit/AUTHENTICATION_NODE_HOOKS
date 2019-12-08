const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  getUserProfile,
  createProfile,
  getProfileById,
  getProfiles,
  followProfile,
  unFollowProfile
} = require("../controllers/profile");

router.get("/me", auth, getUserProfile);
router.get("/user/:userId", getProfileById);
router.get("/profiles", getProfiles);
router.post("/profile", auth, createProfile);
router.put("/follow/:id", auth, followProfile);
router.put("/unfollow/:id", auth, unFollowProfile);

module.exports = router;
