import React, { useEffect } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { OnlyTitle } from "../../layouts/TopLayout";
import MenuBox from "../../components/settings/MenuBox";
import ProfileBox from "../../components/settings/ProfileBox";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const { doLogout, moveToPath, isAdmin, loginState } = useCustomLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      alert("잘못된 접근 입니다.");
      navigate(-1);
    }
  }),
    [isAdmin, navigate];

  const handleClickLogout = () => {
    doLogout();
    alert("로그아웃되었습니다.");
    moveToPath("/");
  };

  // 관리자가 아닌 경우 null 반환 (렌더링하지 않음)
  if (!isAdmin()) {
    return null;
  }

  return (
    <BasicLayout>
      <OnlyTitle title="설정" showLine={true} />
      <div className="w-full flex flex-col px-7 py-8 gap-4">
        <div className="w-full">
          <ProfileBox />
        </div>
        <div className="w-full">
          <MenuBox
            text={"신고 내역"}
            hasChild={false}
            childList={[]}
            link={"report"}
          />
        </div>

        <div className="w-full">
          <MenuBox
            text={"고객 지원"}
            hasChild={true}
            childList={["FAQ", "1:1 문의", "공지사항", "개인정보처리방침"]}
          />
        </div>

        <div className="w-full">
          <MenuBox
            text={"계정"}
            hasChild={true}
            childList={["비밀번호 변경", "로그아웃"]}
            link={["changePassword", ""]}
            onChildClick={handleClickLogout}
          />
        </div>
      </div>
    </BasicLayout>
  );
};

export default AdminPage;
