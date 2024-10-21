import User from "../models/UserModel.js";
import OTP from "../models/OTPModel.js";
import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../configs/config.js";

export const registerUser = async (req, res) => {
  try {
    // Destructuring credentials from req.body
    const { name, email, password, usertype } = req.body;

    // Input validation to ensure that required fields are present
    if (!name) {
      return res.status(400).json({ message: "Username is required." });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }
    if (!usertype) {
      return res.status(400).json({ message: "Password is required." });
    }

    // Checking for existing user in DB...
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User found with this email. Try with new one!!! ");
    }

    // Generating OTP...
    const otp = await otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const token = jwt.sign(
      {
        userEmail: email,
        otp: otp,
      },
      JWT_SECRET,
      { expiresIn: "10m" }
    );

    // Save OTP and encrypted password in the database temporarily (but not the user)
    const hashedPassword = await bcrypt.hash(password, 10);
    await OTP.create({ otp, email, password: hashedPassword, usertype, name });

    return res.status(201).send({
      message: "User registration successfull...",
      token,
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
};
