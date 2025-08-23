const express = require("express");
const router = express.Router();
const limitRateRequest = require("../middlewares/limiter.middleware");
const {
  getProfile,
  updateProfile,
} = require("../controllers/profile.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const {
  profileValidation,
  runValidation,
} = require("../middlewares/validator.middleware");

router.use(authMiddleware);

router.get("/", limitRateRequest(1, 5), getProfile);
router.put("/", profileValidation, runValidation, updateProfile);

module.exports = router;
