
import React, { useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { OnlyTitle } from "../../layouts/TopLayout";
import MenuBox from "../../components/settings/MenuBox";
import ProfileBox from "../../components/settings/ProfileBox";
import { useNavigate } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";

const SettingsPage = () => {
  const { loginState } = useCustomLogin();
  const navigate = useNavigate();

  useEffect(() => {
    // roles에 ADMIN이 포함되어 있는지 확인하고 리다이렉션
    if (loginState.roles?.includes("ADMIN")) {
      navigate("/admin", { replace: true });
    }
  }, [loginState.roles, navigate]);


  return (
    <BasicLayout>
      <div className="w-full flex flex-col px-7 py-8 gap-4">
        <div className="w-full">
          <ProfileBox openModal={handleProfileModal} />
        </div>
        <div className="w-full">
          <MenuBox
            text={"마이페이지"}
            hasChild={false}
            childList={[]}
            link={"myPage"}
          />
        </div>
        <div className="w-full">
          <MenuBox
            text={"독서 기록"}
            hasChild={true}
            childList={["통계"]}
            link={["record"]}
          />
        </div>
        <div className="w-full">
          <MenuBox
            text={"알림 설정"}
            hasChild={false}
            childList={[]}
            link={"notifications"}
          />
        </div>
        <div className="w-full">
          <MenuBox
            text={"고객 지원"}
            hasChild={true}
            childList={["FAQ", "1:1 문의", "공지사항", "개인정보처리방침"]}
          />
        </div>
      </div>
      {isProfileModalOpen && (
        <ProfileModifyingModal
          onClose={handleProfileModal}
          profile={loginState}
        />
      )}
    </BasicLayout>
  );
};

export default SettingsPage;
