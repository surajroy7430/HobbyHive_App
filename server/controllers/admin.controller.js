const User = require("../models/user.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .sort({ role: -1, createdAt: -1 })
      .select("-password");

    res.json({ total: users.length, users });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const changeUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!["user", "admin"].includes(role))
      return res.status(400).json({ msg: "Invalid role" });

    const user = await User.findByIdAndUpdate(userId, { role }).select(
      "-password"
    );
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ msg: "User role updated", user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const activateAccount = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { status: "Active" },
      { new: true }
    ).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ msg: "User account activated successfully", user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const deactivateAccountByAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { status: "Inactive" },
      { new: true }
    ).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ msg: "User account deactivated successfully", user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const deleteUsersByAdmin = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ msg: "No users selected" });
    }

    const result = await User.deleteMany({ _id: { $in: ids } });

    res.json({
      msg: `Deleted ${result.deletedCount} ${
        result.deletedCount === 1 ? "user" : "users"
      } successfully.`,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const deleteUser = await User.findByIdAndDelete(userId);

    if (!deleteUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({
      msg: `User ${deleteUser.username} deleted successfully.`,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = {
  getAllUsers,
  changeUserRole,
  activateAccount,
  deactivateAccountByAdmin,
  deleteUsersByAdmin,
  deleteUserById
};
