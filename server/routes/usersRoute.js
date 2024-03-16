const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

// new user registration
router.post("/register", async (req, res) => {
  try {
    // check if user already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      throw new Error("User already exists");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // save user
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// user login
router.post("/login", async (req, res) => {
  try {
    // check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("User not found");
    }

    // if user is active
    if (user.status !== "active") {
      throw new Error("The user account is blocked , please contact admin");
    }

    // compare password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      throw new Error("Invalid password");
    }

    // create and assign token
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
      expiresIn: "1d",
    });

    // send response
    res.send({
      success: true,
      message: "User logged in successfully",
      data: token,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get current user
router.get("/get-current-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all users
router.get("/get-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.send({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// update user status
router.put("/update-user-status/:id", authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      message: "User status updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Forgot password route
const crypto = require('crypto');
router.post("/forgot-password", async (req, res) => {
  try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
          throw new Error("Email not found");
      }

      // Generate password reset token and set expiration time
      const resetToken = crypto.randomBytes(20).toString("hex");
      user.passwordResetToken = resetToken;
      user.passwordResetExpires = Date.now() + 3600000; // Token valid for 1 hour

      await user.save();

      // Send password reset instructions (via email or any other method)
      // ...

      res.send({
          success: true,
          message: "Password reset instructions sent. Check your email.",
      });
  } catch (error) {
      res.send({
          success: false,
          message: error.message,
      });
  }
});



router.post("/reset-password", async (req, res) => {
  try {
    const { email, panSsnNumber, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Email not found");
    }

    // Check if PAN/SSN matches
    if (user.panSsnNumber !== panSsnNumber) {
      throw new Error("Invalid PAN/SSN number");
    }

    // Update the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    // ... (existing code)

    // Add PAN/SSN number to the registration
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      panSsnNumber: req.body.panSsnNumber, // Added new field
    });

    // ... (existing code)
  } catch (error) {
    // ... (existing code)
  }
});


module.exports = router;
