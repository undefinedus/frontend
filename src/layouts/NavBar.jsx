import React from "react";
import {
  PiHouseLight,
  PiBooksFill,
  PiBooksLight,
  PiHouseFill,
  PiUsersThreeLight,
  PiUsersThreeFill,
  PiScalesLight,
  PiScalesFill,
  PiGearSixLight,
  PiGearSixFill,
} from "react-icons/pi";
import { useParams } from "react-router-dom";

const NavBar = () => {
  const domain = useParams();

  return (
    <>
      {/* <div className="fixed bottom-10 start-0 w-full flex justify-between px-3 py-2">
        <PiHouseLight color="7D5C4D" size="36" />
        <PiUsersThreeLight color="7D5C4D" size="36" />
        <PiBooksLight color="7D5C4D" size="36" />
        <PiScalesLight color="7D5C4D" size="36" />
        <PiGearSixLight color="7D5C4D" size="36" />
      </div> */}
      <h1 className="text-3xl">시험 텍스트를 입력해 보세요.</h1>
      <div className="fixed bottom-0 start-0 w-full flex justify-between px-3 py-4 border-t border-und_bgsub">
        <PiHouseFill
          onClick={() => alert("clicked!")}
          color="C1BDB8"
          size="36"
        />
        <PiUsersThreeFill color="C1BDB8" size="36" />
        <PiBooksFill color="C1BDB8" size="36" />
        <PiScalesFill color="C1BDB8" size="36" />
        <PiGearSixFill color="7D5C4D" size="36" />
      </div>
      {/* <div className="fixed bottom-0 start-0 w-full flex justify-between px-3 py-2">
        <PiHouseFill color="7D5C4D" size="36" />
        <PiUsersThreeFill color="7D5C4D" size="36" />
        <PiBooksFill color="7D5C4D" size="36" />
        <PiScalesFill color="7D5C4D" size="36" />
        <PiGearSixFill color="7D5C4D" size="36" />
      </div> */}
    </>
  );
};

export default NavBar;
