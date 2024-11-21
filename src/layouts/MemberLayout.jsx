import React from "react";
import { PiX } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

const MemberLayout = ({ children, value }) => {
  return (
    <div className="pt-10 px-6 pb-6 h-full flex flex-col">
      <div className="grid grid-cols-MemberLayoutGrid mb-10">
        <div></div>
        <div className=" font-bold text-undpoint text-xl">{value}</div>
        <Link to="/member/login" className="flex justify-end">
          <PiX size={28} />
        </Link>
      </div>
      <div className="h-full">{children}</div>
    </div>
  );
};

export default MemberLayout;
