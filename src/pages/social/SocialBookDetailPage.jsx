import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnlyTitle } from "../../layouts/TopLayout";
import BasicLayout from "../../layouts/BasicLayout";

// 유저 소셜 책 상세 페이지
const SocialBookDetailPage = () => {
  return (
    <BasicLayout>
      {/* 상단 네비 */}
      <div className="fixed top-0 left-0 w-full z-50 bg-undbgmain">
        <OnlyTitle title={"${nickname}의 책장"} showLine={true} />
        유저 소셜 책 상세 페이지
      </div>
    </BasicLayout>
  );
};

export default SocialBookDetailPage;
