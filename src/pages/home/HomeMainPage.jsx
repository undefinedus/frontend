import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { TitleSearch } from "../../layouts/TopLayout";
// 책 추천 홈 페이지
const HomePage = () => {
  return (
    <BasicLayout>
      <TitleSearch title={"홈"} showLine={false} />
    </BasicLayout>
  );
};

export default HomePage;
