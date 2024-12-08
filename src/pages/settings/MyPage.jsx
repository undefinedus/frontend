import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import LogoutComponent from "../../components/member/LogoutComponent";
import { PrevTitle } from "../../layouts/TopLayout";
import MenuBox from "../../components/settings/MenuBox";

const MyPage = () => {
  return (
    <BasicLayout>
      <div className="fixed top-0 left-0 right-0">
        <PrevTitle title={"마이페이지"} />
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
            childList={["카카오 연동하기", "비밀번호 변경", "로그아웃"]}
            link={["socialize", "changePassword", "logout"]}
          />
        </div>
        <div className="w-full">
          <MenuBox
            text={"회원 탈퇴하기"}
            hasChild={false}
            childList={[]}
            link={[]}
          />
        </div>
      </div>
    </BasicLayout>
  );
};

export default MyPage;
