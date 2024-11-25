import React from "react";
import { CommonTopLayout } from "../../layouts/TopLayout";
import NavBar from "../../layouts/NavBar";
import CategoryComponent from "../../components/settings/record/CategoryComponent";

const RecordPage = () => {
  return (
    <div className=" bg-undbgmain">
      <CommonTopLayout title={"통계"} showLine={false} />
      <CategoryComponent />
      <NavBar />
    </div>
  );
};

export default RecordPage;
