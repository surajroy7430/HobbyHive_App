const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  changeUserRole,
} = require("../controllers/user.controller");
const limitRateRequest = require("../middlewares/limiter.middleware");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { roleMiddleware } = require("../middlewares/role.middleware");

router.use(authMiddleware, roleMiddleware(["admin"]));

router.get("/", limitRateRequest(1, 5), getAllUsers);
router.patch(
  "/:userId/role",
  limitRateRequest(10, 1, "Role already changed. Please wait 10 minutes."),
  changeUserRole
);

module.exports = router;
