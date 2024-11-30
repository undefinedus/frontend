import React, { useState, useEffect } from "react";
import { PiCaretDown } from "react-icons/pi";

export const YearDropdown = ({ options, onChange, activeOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  useEffect(() => {
    if (activeOption) setSelectedOption(`${activeOption}년`);
  }, [activeOption]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed h-screen w-full top-0 start-0 bg-transparent"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div className="relative w-24 bg-undbgmain">
        <div
          className="flex justify-center items-center cursor-pointer"
          onClick={toggleDropdown}
        >
          <p className="font-extrabold text-base pr-0.5">{selectedOption}</p>
          <PiCaretDown size={24} color="#78716C" />
        </div>

        {isOpen && (
          <div className="absolute mt-1 w-24 bg-white border border-unddisabled rounded shadow-lg z-10 right-1">
            {options.map((year, index) => (
              <p
                key={year}
                className={`px-1 py-2 text-und14 text-undtextgray cursor-pointer hover:bg-unddisabled ${
                  index !== options.length - 1
                    ? "border-b border-unddisabled"
                    : ""
                }`}
                onClick={() => handleOptionClick(`${year}년`)}
              >
                {`${year}년`}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default YearDropdown;
