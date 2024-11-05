import React from "react";
import {
  PiBooksFill,
  PiHouseFill,
  PiUsersThreeFill,
  PiScalesFill,
  PiGearSixFill,
} from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const domain = useLocation().pathname;
  const navigate = useNavigate();
  const getColor = (path) => (domain.includes(path) ? "7D5C4D" : "C1BDB8");

  return (
    <>
      <div className="fixed bottom-0 start-0 w-full flex justify-between px-3 py-4 border-t border-und_bgsub bg-undbgmain">
        <PiHouseFill
          color={getColor("home")}
          size="36"
          onClick={() => navigate({ pathname: "/home" })}
        />
        <PiUsersThreeFill
          color={getColor("social")}
          size="36"
          onClick={() => navigate({ pathname: "/social" })}
        />
        <PiBooksFill
          color={getColor("myBook")}
          size="36"
          onClick={() => navigate({ pathname: "/myBook" })}
        />
        <PiScalesFill
          color={getColor("forum")}
          size="36"
          onClick={() => navigate({ pathname: "/forum" })}
        />
        <PiGearSixFill
          color={getColor("settings")}
          size="36"
          onClick={() => navigate({ pathname: "/settings" })}
        />
      </div>
    </>
  );
};

export default NavBar;
