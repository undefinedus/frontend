import React from "react";
import logo from "../../assets/logos/gongchaekWithText.png";

const MainLogo = () => {
  return (
    <div className="flex justify-center items-center bg-undbgmain min-h-svh">
      <img src={logo} alt="logoWithTextAnimation" className="w-52 h-52" />
    </div>
  );
};

export default MainLogo;
