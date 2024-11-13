import React from "react";

function BigCheckBox({ checked, onChange, value }) {
  return (
    <div className="inline-flex text-base font-semibold text-undpoint rounded-md items-center border border-undpoint h-12 p-2">
      <label className="flex items-center cursor-pointer relative mr-2 ">
        <input
          type="checkbox"
          className="peer h-7 w-7 cursor-pointer transition-all appearance-none rounded-full bg-unddisabled border-2 border-undpoint checked:bg-undpoint checked:border-undpoint"
          checked={checked}
          onChange={({ target: { checked } }) => onChange(checked)}
        />
        <span className="absolute text-undpoint peer-checked:opacity-100 peer-checked:text-undbgmain top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg
            className="h-5 w-5"
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
      {value}
    </div>
  );
}

export default BigCheckBox;
