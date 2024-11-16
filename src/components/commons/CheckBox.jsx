import React from "react";
import { PiCaretRight } from "react-icons/pi";

function CheckBox({
  checked,
  onChange,
  value,
  peer,
  checkedPeer,
  showMessage = false,
}) {
  return (
    <div className="flex justify-between">
      <div className="flex justify-start">
        <div className="inline-flex text-base  text-undtextgray items-center">
          <label className="flex items-center cursor-pointer relative mr-2 ">
            <input
              type="checkbox"
              className={`${
                !peer && "peer p-2"
              } h-5 w-5 cursor-pointer transition-all appearance-none rounded-full bg-white border-2 border-undtextgray checked:bg-undpoint checked:border-undpoint`}
              checked={checked}
              onChange={({ target: { checked } }) => onChange(checked)}
            />
            <span
              className={`absolute text-undpoint p-3 peer-checked:opacity-100 peer-checked:text-undbgmain top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
            >
              <svg
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </label>
        </div>
        <div className="text-sm font-bold">{value}</div>
      </div>
      {showMessage && (
        <div className="flex items-center text-end">
          <PiCaretRight size={20} />
        </div>
      )}
    </div>
  );
}

export default CheckBox;
