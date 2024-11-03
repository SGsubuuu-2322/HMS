// import React from 'react'

import { getDoctors } from "@/helper/API/user";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const DoctorsRecord = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDoctors());
  }, []);
  return <div>DoctorsRecord</div>;
};

export default DoctorsRecord;
