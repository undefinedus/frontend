import React from "react";
import { PiX } from "react-icons/pi";

const MemberLayout = ({ children }) => {
  return (
    <div className="">
      <div>
        <div className="flex justify-center w-full">
          <div className="w-1/3"></div>
          <div className="w-1/3 font-bold text-undpoint text-xl">회원가입</div>
          <PiX className="w-1/3 " size={28} />
        </div>
      </div>
      {children}
    </div>
  );
};

export default MemberLayout;
