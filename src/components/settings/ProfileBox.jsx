import React, { useEffect } from "react";
import {
  PiPencilSimpleBold,
  PiUserCircleFill,
  PiUserFill,
} from "react-icons/pi";
import useCustomLogin from "../../hooks/useCustomLogin";
import PortraitPlaceholder from "../commons/PortraitPlaceholder";

const ProfileBox = ({ openModal }) => {
  const { isLogin, loginState } = useCustomLogin();

  return (
    <div className="w-full bg-white border border-unddisabled rounded-3xl px-2 py-4">
      <div className="w-full flex items-center">
        <div className=" h-16 flex justify-center items-center">
          <PortraitPlaceholder />
        </div>
        <div className="w-full flex flex-col gap-2 px-2">
          <div className="flex justify-between">
            <span className="text-undtextdark text-base font-extrabold">
              {loginState.nickname}
            </span>
            <PiPencilSimpleBold
              size={24}
              color="78716C"
              onClick={() => openModal(true)}
            />
          </div>
          <div className="flex justify-start text-undtextgray text-base">
            칭호
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
