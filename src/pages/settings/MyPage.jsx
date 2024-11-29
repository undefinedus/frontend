import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import LogoutComponent from "../../components/member/LogoutComponent";

const MyPage = () => {
  return (
    <BasicLayout>
      <div>
        <div>내 정보 수정 컴포넌트</div>
        <div>내 취향 수정 컴포넌트</div>
        <div>내 업적 컴포넌트</div>
        <div>
          내 계정 컴포넌트
          <LogoutComponent />
        </div>
        <div>회원 탈퇴하기 컴포넌트</div>
      </div>
    </BasicLayout>
  );
};

export default MyPage;
