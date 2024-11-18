import React from "react";
import { PiWarningCircleDuotone } from "react-icons/pi";

const ListNotice = ({ type }) => {
  const content = {
    noResult: {
      icon: <PiWarningCircleDuotone size={28} color="#51392F" />,
      message: "검색 결과가 없습니다",
    },
  };

  const { icon, message } = content[type] || {};

  return (
    <div className="flex flex-col justify-items-center">
      <div className="flex justify-center">{icon}</div>
      <div className="flex justify-center">{message}</div>
    </div>
  );
};

export default ListNotice;
