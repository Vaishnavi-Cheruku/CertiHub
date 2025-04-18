import React from "react";
import Carousel from "../components/Carousel";
import StaffNavbar from "../components/StaffNavbar";

const StaffHome = () => {
  return (
    <>
      <StaffNavbar />
      <div className="mt-6">
        <Carousel />

        <div className="max-w-4xl mx-auto mt-10 px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Welcome Staff</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            This staff portal is designed for streamlined and efficient management of certificate applications submitted by Delhi residents. Staff members can review, verify, and process applications in accordance with their designated roles within the Revenue Department. Ensuring transparency, accountability, and speed in public service delivery is our top priority.
          </p>
        </div>
      </div>
    </>
  );
};

export default StaffHome;
