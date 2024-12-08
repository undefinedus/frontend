import React from "react";
import { PrevTitle } from "../../../layouts/TopLayout";
import UserInfo from "../../../components/settings/myPage/UserInfo";

const UserInfoPage = () => {
  return (
    <>
      <PrevTitle title={"내 정보 수정"} />
      <UserInfo />
    </>
  );
};

export default UserInfoPage;
