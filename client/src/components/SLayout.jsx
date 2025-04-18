// src/components/SLayout.jsx
import React from "react";
import StaffNavbar from "./StaffNavbar";

const SLayout = ({ children }) => {
  return (
    <>
      <StaffNavbar />  {/* Staff Navbar for staff users */}
      <main className="pt-4">{children}</main>
    </>
  );
};

export default SLayout;
