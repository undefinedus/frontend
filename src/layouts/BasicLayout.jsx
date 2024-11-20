import React from "react";
import NavBar from "./NavBar";

const BasicLayout = ({ children }) => {
  return (
    <div className="w-full h-full">
      {children}
      <NavBar />
    </div>
  );
};

export default BasicLayout;
