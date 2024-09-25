// import React from 'react'

const ReachUs = () => {
  return (
    <div className="w-full h-[100vh] px-40 pt-28 pb-24">
      <div className="w-full h-full flex justify-between">
        <div className="h-full w-2/6">
          <div className="relative h-1/4">
            <h1 className="font-semibold text-5xl text-[#4A4A4A] inline-block h-1/2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[19rem] after:border-b-2 after:border-[#D5D5D5] after:mt-2">
              <span className="">Reach Us</span>
            </h1>
          </div>
          <div className="h-3/4 font-alice text-lg text-[#4A4A4A]">
            <p>K8, Kalinga Nagar</p>
            <p>Bhubaneswar, Odisha</p>
            <p>India</p>
            <p>Pin Code - 751003</p>
            <p className="mt-6">Call Us: 0674-2386281</p>
          </div>
        </div>
        <div className="h-full w-4/6">
          <iframe
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7484.787528409847!2d85.76424288948826!3d20.283962224093706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a7a77f4d2d37%3A0xb4e2d6e2f8f0e83c!2sSUM%20Hospital!5e0!3m2!1sen!2sin!4v1727249031697!5m2!1sen!2sin"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ReachUs;
