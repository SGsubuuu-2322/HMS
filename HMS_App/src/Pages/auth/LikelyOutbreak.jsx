// import React from 'react'

import { getOutbreaks } from "@/helper/API/user";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const LikelyOutbreak = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOutbreaks());
  }, []);
  return <div>LikelyOutbreak</div>;
};

export default LikelyOutbreak;
