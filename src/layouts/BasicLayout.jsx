import React from "react";
import NavBar from "./NavBar";

const BasicLayout = ({ children }) => {
  return (
    <div>
      {children}
      <NavBar />
    </div>
  );
};

export default BasicLayout;
