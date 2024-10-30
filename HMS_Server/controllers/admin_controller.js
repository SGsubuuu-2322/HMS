import Admin from "../models/AdminModel.js";
import Doctor from "../models/DoctorModel.js";
import OTP from "../models/OTPModel.js";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const getAdDashboardDetails = async (req, res) => {
  try {
    return res.status(200).send({
      user: "Admin",
      message: "testing req/res cycle successfull...",
    });
  } catch (error) {
    return res.status(400).send({
      user: "Admin",
      message: "Error in req/res cycle testing...",
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
    const { username, email, password, usertype } = otpRecord;
    const user = new User({
      username,
      email,
      password,
      usertype,
      isVerified: true,
    });
    const admin = new Admin({
      username,
      email,
      password,
      usertype,
      isVerified: true,
    });
    await user.save();
    await admin.save();

    // Clear the OTP record after verification
    await OTP.deleteOne({ email });

    return res.status(201).send({
      msg: "User-Admin verified and registered successfully",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const addDoctor = async (req, res) => {
  try {
    const admin_id = req.user.admin_id;
    const {
      username,
      email,
      password,
      phone,
      address,
      gender,
      role,
      profilePicture,
    } = req.body;

    const registeredAdmin = await Admin.findOne({ _id: admin_id });
    if (!registeredAdmin) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    const isRegisteredDoc = await Doctor.findOne({ email: req.body.email });
    const isRegisteredUser = await User.findOne({ email: req.body.email });
    if (isRegisteredDoc || isRegisteredUser) {
      return res
        .status(400)
        .send({ message: "Email already registered. Try with new one.." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await new User({
      username,
      email,
      usertype: "D",
      password: hashedPassword,
      phone,
      address,
      gender,
      role,
      profilePicture,
      isVerified: true,
    });
    const doctor = await new Doctor({
      username,
      email,
      usertype: "D",
      password: hashedPassword,
      phone,
      address,
      gender,
      role,
      profilePicture,
      isVerified: true,
    });

    if (!user || !doctor) {
      throw new Error("Error in creating user in database...");
    } else {
      user.save();
      doctor.save();
      return res
        .status(201)
        .send({ message: "Doctor created successfully..." });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
