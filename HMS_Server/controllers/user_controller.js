import User from "../models/UserModel.js";
import OTP from "../models/OTPModel.js";
import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../configs/config.js";

// POST: http://localhost:7001/api/user/register
// @param: {
//   "name": "Subham Pradhan",
//   "email": "abc@gmail.com",
//   "password": "Admin@123",
//   "usertype": "A"
// }

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

// POST: http://localhost:7001/api/user/register
// @param: {
//   "email": "abc@gmail.com",
//   "otp": "123456",
// }
export const registeredUserOtpVerification = async (req, res) => {
  try {
    // console.log(req.user);
    const { otp } = req.body;
    // Input validation to ensure that required fields are present
    if (!otp) {
      return res.status(401).send({ message: "OTP is required." });
    }

    // const { userEmail } = verifiedUser;

    // Fetch OTP record from the database
    const otpRecord = await OTP.findOne({ otp });
    if (!otpRecord) {
      return res.status(401).json({ msg: "OTP expired or invalid" });
    }

    // Saving the verified user to the database to user collection permanently...
    const { name, email, password, usertype } = otpRecord;
    const user = new User({
      username: name,
      email,
      password,
      usertype,
      isVerified: true,
    });
    await user.save();

    // Clear the OTP record after verification
    await OTP.deleteOne({ email });

    return res
      .status(201)
      .send({ msg: "User verified and registered successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation to ensure that required fields are present
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }
    const registeredUser = await User.findOne({ email });

    if (!registeredUser) {
      return res.status(401).send({ messaeg: "Invalid user credentials!!!" });
    }

    const validPassword = await bcrypt.compare(
      password,
      registeredUser.password
    );

    if (!validPassword) {
      return res.status(401).send({ message: "Invalid User credentials..." });
    }

    const { password: userPassword, ...rest } = Object.assign(
      {},
      registeredUser.toJSON()
    );

    const token = jwt.sign(
      {
        id: registeredUser._id,
        email: registeredUser.email,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res
      .status(200)
      .send({ message: "LoggedIn successful...", user: rest, token });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const { email, id } = req.user;
    const userdetails = await User.findOne({ email });
    if (!userdetails) {
      return res.status(404).send({ message: "User not found" });
    }

    const { password, ...rest } = Object.assign({}, userdetails.toJSON());
    return res
      .status(200)
      .send({ message: "Successfully found!!!", user: rest });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
