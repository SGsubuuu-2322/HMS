import Admin from "../models/AdminModel.js";
import OTP from "../models/OTPModel.js";
import User from "../models/UserModel.js";

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
