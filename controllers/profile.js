const User = require("../models/User");
const Profile = require("../models/Profile");

exports.getUserProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user
    }).populate("user", ["name", "email", "role"]);

    if (!profile) {
      return res
        .status(400)
        .json({ error: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.createProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({
      user: {
        _id: req.user
      }
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
    res.status(500).send("Server error");
  }
};
