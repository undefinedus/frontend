import React from "react";
import { PiUserFill } from "react-icons/pi";

// iconSize : px 바로 입력
// circleSize : px / 4 (tailwind 사이즈 입력)
const PortraitPlaceholder = ({ iconSize = 40, circleSize = 16 }) => {
  return (
    <div
      className={`flex justify-center items-center w-${circleSize} h-${circleSize} rounded-full bg-unddisabled`}
    >
      <PiUserFill size={iconSize} color="FFFFFF" />
    </div>
  );
};

export default PortraitPlaceholder;
