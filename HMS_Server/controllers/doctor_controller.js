import Doctor from "../models/DoctorModel.js";
import OTP from "../models/OTPModel.js";
import User from "../models/UserModel.js";

export const getDocDashboardDetails = async (req, res) => {
  try {
    return res.status(200).send({
      user: "Doctor",
      message: "testing req/res cycle successfull...",
    });
  } catch (error) {
    return res.status(400).send({
      user: "Doctor",
      message: "Error in req/res cycle testing...",
    });
  }
};
