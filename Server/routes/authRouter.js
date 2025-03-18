import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/authModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import LoginAware from "../middleware/LoginAware.js";

const JWT_TOKEN = "goofd";

const authRouter = express.Router();

// Route 1: signup admin user, no login required, subdomain
authRouter.post(
  "/signup",
  [
    body("name", "name is too short").isLength({ min: 3 }),
    body("email", "enter valid email").isEmail(),
    body("username", "username is too short").isLength({ min: 3 }),
    body("password", "password is too short").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    const Success = true;

    // insertion
    try {
      // destructuring
      const { name, email, username } = req.body;
      //   check duplicate
      const existUser = await User.findOne({ email });
      if (existUser) {
        return res.send({
          Success: false,
          errors: [{ msg: "try with a different email" }],
        });
      }
      //   hash password
      const salt = await bcrypt.genSalt(10);
      const securePass = await bcrypt.hash(req.body.password, salt);
      const user = await User.create({
        name,
        email,
        username,
        password: securePass,
      });
      res.json({ Success: true });
    } catch (errors) {
      res
        .status(500)
        .send({ Success: false, errors: [{ msg: "internal server error" }] });
    }
  }
);

// Route 2: signup admin user, no login required, subdomain
authRouter.post(
  "/login",
  [
    body("email", "enter valid email").isEmail(),
    body("password", "password is too short").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    const Success = true;

    try {
      // destructuring
      const { email, password } = req.body;

      // find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.send({
          Success: false,
          errors: [{ msg: "invalid Credentials" }],
        });
      }
      const verifyPass = await bcrypt.compare(password, user.password);
      if (!verifyPass) {
        return res.send({
          Success: false,
          errors: [{ msg: "invalid Credentials" }],
        });
      }
      const data = {
        user: {
          id: user._id,
          loggedUser: user.username,
        },
      };

      // JWT token generate
      const authToken = jwt.sign(data, JWT_TOKEN);
      res.send({ Success: true, authToken });
    } catch (errors) {
      res
        .status(500)
        .send({ Success: false, errors: [{ msg: "internal server error" }] });
    }
  }
);

// Route 3: signup admin user, no login required, subdomain
authRouter.get("/getuser", LoginAware, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById({ _id: userid }).select("-password");
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .send({ Success: false, errors: [{ msg: "Internal server error" }] });
  }
});

export default authRouter;
