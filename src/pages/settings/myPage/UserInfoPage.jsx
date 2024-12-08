import React from "react";
import { PrevTitle } from "../../../layouts/TopLayout";
import UserInfo from "../../../components/settings/myPage/UserInfo";
import { useNavigate } from "react-router-dom";

const UserInfoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-undbgmain">
      <div className="fixed top-0 left-0 right-0">
        <PrevTitle
          title={"내 정보 수정"}
          onClick={() =>
            navigate({ pathname: "/settings/myPage" }, { replace: true })
          }
        />
      </div>

      <div className="w-full py-36 px-6">
        <UserInfo />
      </div>
    </div>
  );
};

export default UserInfoPage;
