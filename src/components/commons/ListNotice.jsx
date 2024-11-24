import React from "react";
import { PiBookOpenDuotone, PiWarningCircleDuotone } from "react-icons/pi";

const ListNotice = ({ type }) => {
  const content = {
    noResult: {
      icon: <PiWarningCircleDuotone size={28} color="#51392F" />,
      message: "검색 결과가 없습니다",
    },
    emptyBook: {
      icon: <PiBookOpenDuotone size={32} color="#51392F" />,
      message: "책장이 비어 있어요",
    },
  };

  const { icon, message } = content[type] || {};
  console.log("******검색결과 타입:", type);

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <div className="flex justify-center">{icon}</div>
      <div className="flex justify-center">{message}</div>
    </div>
  );
};

export default ListNotice;
