import React from "react";
import {
  PiBooksFill,
  PiBooksLight,
  PiHouseFill,
  PiHouseLight,
  PiUsersThreeFill,
  PiUsersThreeLight,
  PiScalesFill,
  PiScalesLight,
  PiGearSixFill,
  PiGearSixLight,
} from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const domain = useLocation().pathname;
  const navigate = useNavigate();
  const isOwnPath = (path) => domain.includes(path);

  return (
    <>
      <div className="h-16 fixed bottom-0 start-0 w-full flex items-center justify-between px-5 border-t border-unddisabled bg-undbgmain">
        {isOwnPath("home") ? (
          <PiHouseFill
            color="7D5C4D"
            size="32"
            onClick={() => navigate({ pathname: "/home" }, { replace: true })}
          />
        ) : (
          <PiHouseLight
            color="7D5C4D"
            size="32"
            onClick={() => navigate({ pathname: "/home" }, { replace: true })}
          />
        )}

        {isOwnPath("social") ? (
          <PiUsersThreeFill
            color="7D5C4D"
            size="32"
            onClick={() => navigate({ pathname: "/social" }, { replace: true })}
          />
        ) : (
          <PiUsersThreeLight
            color="7D5C4D"
            size="32"
            onClick={() => navigate({ pathname: "/social" }, { replace: true })}
          />
        )}

        {isOwnPath("myBook") ? (
          <PiBooksFill
            color="7D5C4D"
            size="32"
            onClick={() => navigate({ pathname: "/myBook" }, { replace: true })}
          />
        ) : (
          <PiBooksLight
            color="7D5C4D"
            size="32"
            onClick={() => navigate({ pathname: "/myBook" }, { replace: true })}
          />
        )}

        {isOwnPath("forum") ? (
          <PiScalesFill
            color="7D5C4D"
            size="32"
            onClick={() => navigate({ pathname: "/forum" }, { replace: true })}
          />
        ) : (
          <PiScalesLight
            color="7D5C4D"
            size="32"
            onClick={() => navigate({ pathname: "/forum" }, { replace: true })}
          />
        )}

        {isOwnPath("settings") ? (
          <PiGearSixFill
            color="7D5C4D"
            size="32"
            onClick={() =>
              navigate({ pathname: "/settings" }, { replace: true })
            }
          />
        ) : (
          <PiGearSixLight
            color="7D5C4D"
            size="32"
            onClick={() =>
              navigate({ pathname: "/settings" }, { replace: true })
            }
          />
        )}
      </div>
    </>
  );
};

export default NavBar;
