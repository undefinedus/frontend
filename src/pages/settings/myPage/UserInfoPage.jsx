import React, { useEffect, useState } from "react";
import { PrevTitle } from "../../../layouts/TopLayout";
import UserInfo from "../../../components/settings/myPage/UserInfo";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { triggerRefresh } from "../../../slices/myPageRefreshSlice";

const UserInfoPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [data, setData] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("state: ", state);
    setData(state.data);
  }, [location]);

  return (
    <div className="w-full h-full bg-undbgmain">
      <div className="fixed top-0 left-0 right-0">
        <PrevTitle
          title={"내 정보 수정"}
          onClick={() =>
            navigate({ pathname: "/settings/myPage" }, { replace: true, state })
          }
        />
      </div>

      <div className="w-full py-32 px-6">
        <UserInfo data={data} setRefresh={() => dispatch(triggerRefresh())} />
      </div>
    </div>
  );
};

export default UserInfoPage;
