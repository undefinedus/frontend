import React from "react";

const AddBookDate = ({ end = null, dates }) => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-start text-und16 text-undtextdark font-bold">
        독서 기간
      </div>
      <div className={`flex ${end && "gap-5"} mt-2.5`}>
        <div
          className={`flex ${
            end ? "flex-col w-1/2 gap-1" : "justify-between w-full"
          }`}
        >
          <div
            className={`${
              end ? "w-full" : "w-1/2"
            } flex justify-start text-und14 text-undtextgray font-bold`}
          >
            시작일
          </div>
          <div
            className={`${
              end ? "w-full mt-1" : "w-1/2"
            } flex justify-center text-und14 text-undtextgray rounded-s-full rounded-e-full bg-undbgsub`}
          >
            {dates[0]}
          </div>
        </div>
        {end && (
          <div className={`flex flex-col w-1/2 gap-1`}>
            <div className="w-full flex justify-start text-und14 text-undtextgray font-bold">
              {end}
            </div>
            <div className="w-full mt-1 flex justify-center text-und14 text-undtextgray rounded-s-full rounded-e-full bg-undbgsub">
              {dates[1]}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBookDate;
