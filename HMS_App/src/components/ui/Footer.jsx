// import React from 'react'

const Footer = () => {
  return (
    <div className="w-full h-[70vh] bg-[#4A4A4A] px-40 pt-24 flex">
      <div className="h-2/3 w-[30%]">
        <div className="w-full h-1/4 relative mb-10">
          <h1 className="font-semibold text-white inline-block h-full relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[19rem] after:border-b-2 after:border-[#D5D5D5] after:mt-2">
            REACH US
          </h1>
        </div>
        <div className="h-3/4 w-full flex flex-col font-bold text-white">
          <p className="tracking-wide">K8, KALINGA NAGAR</p>
          <p className="tracking-wide">BHUBANESWAR, ODISHA</p>
          <p className="tracking-wide">INDIA</p>
          <p className="tracking-wide">PIN CODE – 751003</p>
          <p className="mt-6 tracking-wide">CALL US: 0674-2386281</p>
        </div>
      </div>
      <div className="h-2/3 w-[20%]">
        <div className="w-full h-1/4 relative mb-10">
          <h1 className="font-semibold text-white inline-block h-full relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[12rem] after:border-b-2 after:border-[#D5D5D5] after:mt-2">
            INFO
          </h1>
        </div>
        <div className="h-3/4 w-full flex flex-col font-bold text-white">
          <p className="tracking-wide">ABOUT US</p>
          <p className="tracking-wide">DEPARTMENTS</p>
          <p className="tracking-wide">SERVICES</p>
          <p className="tracking-wide">SPECIALITY</p>
          <p className="tracking-wide">REACH US</p>
        </div>
      </div>
      <div className="h-2/3 w-[30%]">
        <div className="w-full h-1/4 relative mb-10">
          <h1 className="font-semibold text-white inline-block h-full relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[16rem] after:border-b-2 after:border-[#D5D5D5] after:mt-2">
            ACTION
          </h1>
        </div>
        <div className="h-3/4 w-full flex flex-col font-bold text-white">
          <p className="tracking-wide">CONTACT US</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
