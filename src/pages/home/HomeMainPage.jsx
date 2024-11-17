import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { OnlyTitle, PrevAddBook } from "../../layouts/TopLayout";
// 책 추천 홈 페이지
const HomePage = () => {
  return (
    <>
      <PrevAddBook title={"책 전체 검색"}></PrevAddBook>
      <BasicLayout />
    </>
  );
};

export default HomePage;
