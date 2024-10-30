import User from "../models/UserModel.js";
import OTP from "../models/OTPModel.js";
import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../configs/config.js";
import Doctor from "../models/DoctorModel.js";
import Admin from "../models/AdminModel.js";
import Patient from "../models/PatientModel.js";

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
    const { username, email, password, usertype } = req.body;

    // Input validation to ensure that required fields are present
    if (!username) {
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
      return res
        .status(404)
        .send({ message: "User found with this email. Try with new one!!!" });
    }

    if (usertype == "A" || usertype == "D") {
      // Checking for existing user in DB...
      const existingUser = await Admin.findOne({ email });
      if (existingUser) {
        return res
          .status(404)
          .send({ message: "User found with this email. Try with new one!!!" });
      }

      // Generating OTP...
      const otp = await otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });

      const token = jwt.sign(
        {
          username,
          userEmail: email,
          otp: otp,
          usertype,
        },
        JWT_SECRET,
        { expiresIn: "10m" }
      );

      // Save OTP and encrypted password in the database temporarily (but not the user)
      const hashedPassword = await bcrypt.hash(password, 10);
      await OTP.create({
        otp,
        email,
        password: hashedPassword,
        usertype,
        username,
      });

      return res.status(201).send({
        message: "User temporary registration successfull...",
        token,
      });
    } else if (usertype == "P") {
      if (!req.body.patientId) {
        return res.status(400).json({ message: "PatientID is required." });
      }
      const { patientId } = req.body;
      // Checking for existing user in DB...
      const existingUserE = await Patient.findOne({ email });
      const existingUserP = await Patient.findOne({ patientId });
      if (existingUserE) {
        return res.status(404).send({
          message: "User patient found with this email. Try with new one!!!",
        });
      } else if (existingUserP) {
        return res.status(404).send({
          message:
            "User patient found with this PatientId. Try with new one!!!",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        email,
        password: hashedPassword,
        patientId,
        usertype,
        isVerified: true,
      });
      const patient = new Patient({
        username,
        email,
        password: hashedPassword,
        usertype,
        patientId,
        isVerified: true,
      });
      await user.save();
      await patient.save();

      return res.status(201).send({ msg: "Patient registered successfully" });
    }
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
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
        usertype: registeredUser.usertype,
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
    const id = req.params.id;
    const userdetails = await User.findOne({ _id: id });
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

export const updateUserDetails = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).send({ message: "User Id not found" });
    }

    const { username, email, phone, address, gender, profilePicture } =
      req.body;

    if (!username) {
      return res.status(404).send({ message: "Username is required" });
    }
    if (!email) {
      return res.status(404).send({ message: "Email is required" });
    }

    const storedUser = await User.findOne({ _id: id });
    if (!storedUser) {
      return res
        .status(404)
        .send({ message: "User with this id not found!!!" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      { username, email, phone, address, gender, profilePicture },
      { new: true } // Returns the updated document
    );

    const { password, ...rest } = updatedUser.toObject(); // Removes the password field
    return res
      .status(201)
      .send({ message: "Successfully updated!!!", user: rest });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};
