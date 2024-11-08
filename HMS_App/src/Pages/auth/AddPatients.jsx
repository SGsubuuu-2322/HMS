import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const AddPatients = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [patientDetails, setpatientDetails] = useState({
    fullName: "",
    email: "",
    dob: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    diagnosis: "",
    prescription: "",
    condition: "",
    password: "",
  });

  function generateRandomNumber(digits) {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    if (user.usertype === "Admin" || user.usertype === "Patient") {
      navigate(-1);
    }
    let newPassword = "Pat@";
    setpatientDetails({
      ...patientDetails,
      password: newPassword + generateRandomNumber(4),
    });
  }, [navigate]);

  const inputChangeHandler = (e) => {
    setpatientDetails({ ...patientDetails, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    const {
      fullName,
      gender,
      phone,
      address,
      email,
      password,
      dob,
      age,
      diagnosis,
      prescription,
      condition,
    } = patientDetails;
    if (
      !fullName?.trim() ||
      !email?.trim() ||
      !password?.trim() ||
      !gender?.trim() ||
      !age?.trim() ||
      !phone?.trim() ||
      !address?.trim() ||
      !dob?.trim() ||
      !diagnosis?.trim() ||
      !prescription?.trim() ||
      !condition?.trim()
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

    if (phone.length != 10) {
      toast.error("Invalid phone no. It must be 10 digits.");
    }

    return true;
  };

  const selectGenderChangeHandler = (data) => {
    setpatientDetails({ ...patientDetails, gender: data });
  };
  const selectConditionChangeHandler = (data) => {
    setpatientDetails({ ...patientDetails, gender: data });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log(patientDetails);
    }
  };

  const imageUrl =
    "https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="w-full h-screen bg p-10 flex items-center justify-center">
      <ToastContainer />
      <div className="relative h-[90%] w-[70%] p-5 mt-16 shadow-lg shadow-black">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-[3px]"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <form
          onSubmit={submitHandler}
          className="relative z-10 h-full w-full border-[3px] border-[#0077ff94] bg-[#ffffff88] rounded-md p-2 px-6 overflow-hidden overflow-y-auto"
        >
          <div className="w-full flex justify-center items-center text-lg font-alice font-bold mb-4">
            <span className="shadow-lg shadow-[#0077ff94] rounded-md border-[3px] text-white border-[#0077ff94] px-1 py-2 bg-[#0077ff94] hover:bg-transparent hover:text-black transition-all duration-300 relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">
              Patient Appointment Form
            </span>
          </div>
          <div className="text-lg text-red-500 font-medium relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-red-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">
            Patient number:{" "}
            <span className="font-bold">{generateRandomNumber(4)}</span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Full Name</label>
            <input
              type="text"
              placeholder="Enter patient's full name..."
              name="fullName"
              value={patientDetails?.fullName}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
          </div>

          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Gender</label>
            <div className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm overflow-hidden">
              <Select
                onValueChange={selectGenderChangeHandler}
                defaultValue={patientDetails?.gender || ""}
              >
                <SelectTrigger className="pl-0 text-base h-full rounded-none border-none bg-[#d0cdcdb6]">
                  <SelectValue placeholder="Select patient's gender" />
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
            <label className="text-lg font-alice font-bold">DOB</label>
            <input
              type="date"
              placeholder="Enter patient's DOB..."
              name="dob"
              value={patientDetails?.dob}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Email</label>
            <input
              type="email"
              placeholder="Enter patient's email..."
              name="email"
              value={patientDetails?.email}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Phone</label>
            <input
              type="text"
              placeholder="Enter patient's phone number..."
              name="phone"
              value={patientDetails?.phone}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Address</label>
            <input
              type="text"
              placeholder="Enter patient's address..."
              name="address"
              value={patientDetails?.address}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
          </div>
          <div className="w-full h-20 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Diagnosis</label>
            <textarea
              name="diagnosis"
              placeholder="Enter patient's diagnosis/symptoms here..."
              value={patientDetails?.diagnosis}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            ></textarea>
          </div>
          <div className="w-full h-20 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Prescription</label>
            <textarea
              name="prescription"
              placeholder="Enter patient's prescription here..."
              value={patientDetails?.prescribtion}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            ></textarea>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Condition</label>
            <div className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm overflow-hidden">
              <Select
                onValueChange={selectConditionChangeHandler}
                defaultValue={patientDetails?.condition || ""}
              >
                <SelectTrigger className="pl-0 text-base h-full rounded-none border-none bg-[#d0cdcdb6]">
                  <SelectValue placeholder="Select patient's condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="InPatient">InPatient</SelectItem>
                  <SelectItem value="OutPatient">OutPatient</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-full h-10 flex items-center justify-center py-1 mt-2">
            <Button>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatients;
