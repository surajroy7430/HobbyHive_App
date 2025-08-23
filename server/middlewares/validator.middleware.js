const { body, validationResult } = require("express-validator");

const registerValidator = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters long"),
];

const loginValidator = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const passwordValidator = [
  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters long"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("Password do not match");
      }
      return true;
    }),
];

const profileValidation = [
  body("username")
    .optional()
    .notEmpty()
    .withMessage("Username cannot be empty"),
  body("email").optional().isEmail().withMessage("Valid email required"),
];

const runValidation = (req, res, next) => {
  const errors = validationResult(req).formatWith(({ msg, path }) => {
    return `${path}: ${msg}`;
  });

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.mapped() });

  next();
};

module.exports = {
  registerValidator,
  loginValidator,
  passwordValidator,
  profileValidation,
  runValidation,
};
