const User = require("../models/user.model");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const updates = {};

    if (username) updates.username = username;
    if (email) updates.email = email;

    const user = await User.findByIdAndUpdate(req.user.id, updates).select(
      "-password"
    );
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ msg: "User profile updated", user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const deactivateAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { status: "Inactive" },
      { new: true }
    ).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ msg: "Your account has been deactivated", user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { getProfile, updateProfile, deactivateAccount };
