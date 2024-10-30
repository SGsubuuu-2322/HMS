// import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import avatar from "../../assets/profile.png";
import convertToBase64 from "@/helper/convert";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { addDoctor } from "@/helper/API/user";
import { toast, ToastContainer } from "react-toastify";

const AddDoctors = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [doctorDetails, setdoctorDetails] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    role: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  function generateRandomNumber(digits) {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    let newPassword = "Doc@";
    setdoctorDetails({
      ...doctorDetails,
      password: newPassword + generateRandomNumber(4),
    });
  }, []);

  const [file, setFile] = useState();

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  const inputChangeHandler = (e) => {
    setdoctorDetails({ ...doctorDetails, [e.target.name]: e.target.value });
  };
  const selectGenderChangeHandler = (data) => {
    setdoctorDetails({ ...doctorDetails, gender: data });
  };
  const selectRoleChangeHandler = (data) => {
    setdoctorDetails({ ...doctorDetails, role: data });
  };

  const isFormValid = () => {
    const { firstName, gender, role, phone, address, email, password } =
      doctorDetails;
    if (
      !firstName?.trim() ||
      !email?.trim() ||
      !password?.trim() ||
      !gender?.trim() ||
      !role?.trim() ||
      !phone?.trim() ||
      !address?.trim()
    ) {
      toast.error("Enter all the fields!!!");
      return false;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Invalid password. Must be 8-10 characters with uppercase, lowercase, digit, and special character."
      );
      return false;
    }

    const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format.");
      return false;
    }

    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (isFormValid()) {
        let username =
          doctorDetails.firstName +
          " " +
          doctorDetails.middleName +
          " " +
          doctorDetails.lastName;

        // console.log(doctorDetails);

        const profileUpdationResponse = await dispatch(
          addDoctor({
            username,
            email: doctorDetails.email,
            password: doctorDetails.password,
            phone: doctorDetails.phone,
            address: doctorDetails.address,
            gender: doctorDetails.gender,
            role: doctorDetails.role,
            profilePicture: file || "",
          })
        ).unwrap();

        if (profileUpdationResponse) {
          navigate("/user/add-doctor", {
            state: {
              message: "Doctor profile added successfully...",
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const imageUrl =
    "https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="w-full h-screen bg p-10 flex items-center justify-center">
      <ToastContainer />
      <div className="relative w-[60%] p-5 mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-[3px]"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <form
          onSubmit={submitHandler}
          className="relative z-10 w-full border-[3px] border-[#0077ff94] bg-[#ffffff88] rounded-md p-2 px-6"
        >
          <div className="w-full h-20 flex justify-center items-center">
            <div>
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  className="border-2 border-gray-100 w-[66px] h-[66px] object-cover rounded-full shadow-lg cursor-pointer"
                  alt="avatar"
                />
              </label>

              <input
                className="hidden"
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              />
            </div>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">First Name</label>
            <input
              type="text"
              placeholder="Enter doctor's first name..."
              name="firstName"
              value={doctorDetails?.firstName}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Middle Name</label>
            <input
              type="text"
              placeholder="Enter doctor's middle name..."
              name="middleName"
              value={doctorDetails?.middleName}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Last Name</label>
            <input
              type="text"
              placeholder="Enter doctor's last name..."
              name="lastName"
              value={doctorDetails?.lastName}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Gender</label>
            <div className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm overflow-hidden">
              <Select
                onValueChange={selectGenderChangeHandler}
                defaultValue={doctorDetails?.gender || ""}
              >
                <SelectTrigger className="pl-0 text-base h-full rounded-none border-none bg-[#d0cdcdb6]">
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Role</label>
            <div className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm overflow-hidden">
              <Select
                onValueChange={selectRoleChangeHandler}
                defaultValue={doctorDetails?.gender || ""}
              >
                <SelectTrigger className="pl-0 text-base h-full rounded-none border-none bg-[#d0cdcdb6]">
                  <SelectValue placeholder="Select doctor's role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General Practitioners (GPs) / Primary Care Physicians">
                    General Practitioners (GPs) / Primary Care Physicians
                  </SelectItem>
                  <SelectItem value="Emergency Medicine Physicians">
                    Emergency Medicine Physicians
                  </SelectItem>
                  <SelectItem value="Surgeons">Surgeons</SelectItem>
                  <SelectItem value="Anesthesiologists">
                    Anesthesiologists
                  </SelectItem>
                  <SelectItem value="Radiologists">Radiologists</SelectItem>
                  <SelectItem value="Cardiologists">Cardiologists</SelectItem>
                  <SelectItem value="Neurologists">Neurologists</SelectItem>
                  <SelectItem value="Obstetricians and Gynecologists (OB-GYN)">
                    Obstetricians and Gynecologists (OB-GYN)
                  </SelectItem>
                  <SelectItem value="Pediatricians">Pediatricians</SelectItem>
                  <SelectItem value="Oncologists">Oncologists</SelectItem>
                  <SelectItem value="Endocrinologists">
                    Endocrinologists
                  </SelectItem>
                  <SelectItem value="Gastroenterologists">
                    Gastroenterologists
                  </SelectItem>
                  <SelectItem value="Nephrologists">Nephrologists</SelectItem>
                  <SelectItem value="Pulmonologists">Pulmonologists</SelectItem>
                  <SelectItem value="Infectious Disease Specialists">
                    Infectious Disease Specialists
                  </SelectItem>
                  <SelectItem value="Pathologists">Pathologists</SelectItem>
                  <SelectItem value="Critical Care/Intensivists">
                    Critical Care/Intensivists
                  </SelectItem>
                  <SelectItem value="Dermatologists">Dermatologists</SelectItem>
                  <SelectItem value="Orthopedic Surgeons">
                    Orthopedic Surgeons
                  </SelectItem>
                  <SelectItem value="Urologists">Urologists</SelectItem>
                  <SelectItem value="Hematologists">Hematologists</SelectItem>
                  <SelectItem value="Rehabilitation Physicians (Physiatrists)">
                    Rehabilitation Physicians (Physiatrists)
                  </SelectItem>
                  <SelectItem value="Palliative Care Physicians">
                    Palliative Care Physicians
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Email</label>
            <input
              type="email"
              placeholder="Enter doctor's email..."
              name="email"
              value={doctorDetails?.email}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Phone</label>
            <input
              type="text"
              placeholder="Enter doctor's phone number..."
              name="phone"
              value={doctorDetails?.phone}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Address</label>
            <input
              type="text"
              placeholder="Enter doctor's address..."
              name="address"
              value={doctorDetails?.address}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
          </div>
          <div className="w-full h-10 flex items-center justify-center py-1 mt-2">
            <Button>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctors;
