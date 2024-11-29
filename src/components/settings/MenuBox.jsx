import React from "react";
import { PiCaretRight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const MenuBox = ({ text, hasChild, childList, link }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-undbgsub border border-unddisabled rounded-md p-5">
      <div
        className={`w-full flex ${
          hasChild ? "justify-start" : "justify-between"
        }`}
      >
        <span className="text-undtextgray font-extrabold">{text}</span>
        {!hasChild && (
          <PiCaretRight
            size={23}
            color="78716C"
            onClick={() =>
              navigate({ pathname: `./${link}` }, { replace: true })
            }
          />
        )}
      </div>
      {hasChild &&
        childList.map((child) => (
          <div className="w-full flex justify-between mt-2" key={child}>
            <span className="text-undtextdark font-bold">{child}</span>
            <PiCaretRight
              size={23}
              color="78716C"
              onClick={() =>
                navigate({ pathname: `./${link}` }, { replace: true })
              }
            />
          </div>
        ))}
    </div>
  );
};

export default MenuBox;
