import Doctor from "../models/DoctorModel.js";
import OTP from "../models/OTPModel.js";
import Outbreak from "../models/OutbreakModel.js";
import Patient from "../models/PatientModel.js";
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

export const updateOutbreak = async (req, res) => {
  try {
    const { obid, obname, obcomments, oblocation, obmeasures } = req.body;
    const { user_id } = req.user;
    const storedUser = await User.findOne({ _id: user_id });
    if (!storedUser) {
      return res
        .status(403)
        .send({ message: "You're unauthorized for this action..." });
    }

    if (req.user.usertype == "D") {
      const updatedOutbreak = await Outbreak.findByIdAndUpdate(
        { _id: obid },
        { obname, obcomments, oblocation, obmeasures },
        { new: true }
      );
      return res
        .status(201)
        .send({ message: "Outbreak updated successfully!!!", updatedOutbreak });
    } else {
      return res
        .status(403)
        .send({ message: "You're unauthorized for this action..." });
    }
  } catch (error) {
    console.log(`System error happens: ${error.message}`);
    return res.status(500).send({ message: "Internal server error...", error });
  }
};

export const addPatient = async (req, res) => {
  try {
    const doctor_id = req.user.doctor_id;
    const {
      fullName,
      email,
      patientId,
      dob,
      age,
      gender,
      phone,
      address,
      diagnosis,
      prescription,
      condition,
      password,
    } = req.body;

    const registeredDoc = await Doctor.findOne({ _id: doctor_id });
    if (!registeredDoc) {
      return res.status(404).send({ message: "Unauthorized action..." });
    }

    const isRegisteredPatient = await Patient.findOne({ email: email });
    const isRegisteredUser = await User.findOne({ email: email });
    if (isRegisteredPatient || isRegisteredUser) {
      return res
        .status(400)
        .send({ message: "Email already registered. Try with new one.." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(req.body);
  } catch (error) {
    console.log(`System error happens: ${error.message}`);
    return res.status(500).send({ message: "Internal server error...", error });
  }
};
