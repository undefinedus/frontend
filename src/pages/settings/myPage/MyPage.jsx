import BasicLayout from "../../../layouts/BasicLayout";
import { PrevTitle } from "../../../layouts/TopLayout";
import MenuBox from "../../../components/settings/MenuBox";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("로그아웃");
  };

  const handleDeleteAccount = () => {
    console.log("회원탈퇴");
  };

  return (
    <BasicLayout>
      <div className="fixed top-0 left-0 right-0">
        <PrevTitle
          title={"마이페이지"}
          onClick={() => navigate({ pathname: "/settings" }, { replace: true })}
        />
      </div>
      <div className="w-full flex flex-col py-20 px-6 gap-4">
        <div className="w-full">
          <MenuBox
            text={"내 정보 수정"}
            hasChild={false}
            childList={[]}
            link={"userInfo"}
          />
        </div>
        <div className="w-full">
          <MenuBox
            text={"내 취향 수정"}
            hasChild={false}
            childList={[]}
            link={"myPage"}
          />
        </div>
        <div className="w-full">
          <MenuBox
            text={"내 업적"}
            hasChild={true}
            childList={["업적 목록", "칭호 수정"]}
            link={["achievements", "setTitle"]}
          />
        </div>
        <div className="w-full">
          <MenuBox
            text={"내 계정"}
            hasChild={true}
            onChildClick={handleLogout}
            childList={["카카오 연동하기", "비밀번호 변경", "로그아웃"]}
            link={["socialize", "changePassword", "logout"]}
          />
        </div>
        <div className="w-full">
          <MenuBox
            text={"회원 탈퇴하기"}
            hasChild={false}
            onChildClick={handleDeleteAccount}
            childList={[]}
            link={[]}
          />
        </div>
      </div>
    </BasicLayout>
  );
};

export default MyPage;
