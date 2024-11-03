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

export const getOutbreaks = async (req, res) => {
  try {
    const { user_id, doctor_id } = req.user;
    if (!user_id || !doctor_id) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    const storedUser = await User.findOne({ _id: user_id });
    const storedDoctor = await Doctor.findOne({ _id: doctor_id });

    if (!storedUser || !storedDoctor) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    const allOutbreaks = await Outbreak.find({});

    return res
      .status(200)
      .send({ message: "All outbreaks found...", outbreaks: allOutbreaks });
  } catch (error) {
    console.log(`System error happens: ${error.message}`);
    return res.status(500).send({ message: "Internal server error...", error });
  }
};
