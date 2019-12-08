const User = require("../models/User");
const Profile = require("../models/Profile");

exports.getUserProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user // user is saved as a string
    }).populate("user", ["name", "email", "role"]);

    if (!profile) {
      return res
        .status(400)
        .json({ error: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: "Server error" });
  }
};

exports.getProfiles = async (req, res) => {
  try {
    let profiles = await Profile.find().populate("user", [
      "name",
      "email",
      "role"
    ]);
    res.json(profiles);
  } catch (error) {
    console.error(err.message);
    res.status(400).json({ error: "Server error" });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.userId
    }).populate("user", ["name", "email", "role"]);
    if (!profile) return res.status(400).json({ msg: "Profile not found" });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: "Server error" });
  }
};

exports.createProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({
      user: req.user
    });
    if (profile) {
      return res.status(400).json({ error: "You already have an account" });
    }
    profile = await new Profile({
      user: req.user,
      ...req.body
    });
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Server error" });
  }
};

exports.followProfile = async (req, res) => {
  try {
    let profile = await Profile.findById(req.body.profileId).populate("user", [
      "name",
      "email",
      "role"
    ]);
    let following = profile.following.filter(
      item => item.toString() === req.body.userId.toString()
    );
    if (
      profile.following.filter(
        item => item.toString() === req.body.userId.toString()
      ).length > 0
    ) {
      return res
        .status(400)
        .json({ alreadyfollowing: "User already follow this profile" });
    }
    profile.following.unshift(req.body.userId);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Server error" });
  }
};

exports.unFollowProfile = async (req, res) => {
  try {
    let profile = await Profile.findById(req.body.profileId).populate("user", [
      "name",
      "email",
      "role"
    ]);
    if (profile.following.indexOf(req.body.userId) === -1) {
      return res
        .status(400)
        .json({ notfollowing: "User doesn't follow this profile" });
    }
    const removeIndex = profile.following.indexOf(req.body.userId);
    profile.following.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Server error" });
  }
};
