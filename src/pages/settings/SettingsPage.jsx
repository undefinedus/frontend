import React, { useState, useEffect } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { OnlyTitle } from "../../layouts/TopLayout";
import MenuBox from "../../components/settings/MenuBox";
import ProfileBox from "../../components/settings/ProfileBox";
import { useNavigate } from "react-router-dom";
import ProfileModifyingModal from "../../components/modal/settings/ProfileModifyingModal";
import useCustomLogin from "../../hooks/useCustomLogin";
import { getMySocialInfo } from "../../api/social/mySocialAPI";

const SettingsPage = () => {
  const { loginState } = useCustomLogin();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const navigate = useNavigate();

  const [myInfo, setMyInfo] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    // roles에 ADMIN이 포함되어 있는지 확인하고 리다이렉션
    if (loginState.roles?.includes("ADMIN")) {
      navigate("/admin", { replace: true });
    }
  }, [loginState.roles, navigate]);

  // 초기 정보 로드
  useEffect(() => {
    fetchMyInfo();
  }, [loginState, refresh]);

  const fetchMyInfo = async () => {
    try {
      const res = await getMySocialInfo();
      console.log(res.data);
      setMyInfo(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProfileModal = (boolean) => {
    setIsProfileModalOpen(boolean);
  };

  return (
    <BasicLayout>
      <div className="fixed top-0 left-0 right-0">
        <OnlyTitle title={"설정"} />
      </div>
      <div className="w-full flex flex-col px-6 pt-20 gap-4">
        <div className="w-full">
          <ProfileBox myInfo={myInfo} openModal={handleProfileModal} />
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
          myInfo={myInfo}
          setRefresh={setRefresh}
        />
      )}
    </BasicLayout>
  );
};

export default SettingsPage;
