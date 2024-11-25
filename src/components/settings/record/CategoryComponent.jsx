import React from "react";
import { CommonTopLayout } from "../../../layouts/TopLayout";
import NavBar from "../../../layouts/NavBar";
import PieChart from "../statistics/PieChart";
import { PiMedalFill } from "react-icons/pi";

const CategoryComponent = () => {
  return (
    <div className=" bg-undbgmain">
      <div className="border-b border-b-undtextgray:opacity-50 mb-5">
        <div className="flex justify-between px-5">
          <div className="border-b-2 border-undpoint pb-1 px-1 text-undpoint">
            카테고리별
          </div>
          <div>일자별</div>
          <div>연/월별</div>
        </div>
      </div>
      <div className="px-5">
        <div className="flex flex-col gap-7">
          <div className="flex justify-center">
            <PieChart />
          </div>
          <div className="flex flex-col gap-4">
            <div className="font-extrabold flex justify-end">총 56권</div>
            <div>
              <div className="flex justify-between">
                <div className="flex">
                  <PiMedalFill color="#FFD400" size={24} />
                  <div>경제경영</div>
                </div>
                <div>22권</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryComponent;
