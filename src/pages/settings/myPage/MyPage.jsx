import BasicLayout from "../../../layouts/BasicLayout";
import { PrevTitle } from "../../../layouts/TopLayout";
import MenuBox from "../../../components/settings/MenuBox";
import { useLocation, useNavigate } from "react-router-dom";
import useCustomLogin from "../../../hooks/useCustomLogin";
import { useEffect, useState } from "react";
import TwoButtonModal from "../../../components/modal/commons/TwoButtonModal";
import { getMyInformation, unregister } from "../../../api/settings/myPageApi";
import useDateDiff from "../../../hooks/useDateDiff";
import { useDispatch, useSelector } from "react-redux";

const MyPage = () => {
  const { doLogout } = useCustomLogin();
  const navigate = useNavigate();
  const [myInfo, setMyInfo] = useState();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [openUnregisterModal, setOpenUnregisterModal] = useState(false);
  const { diffToday } = useDateDiff();
  const refresh = useSelector((state) => state.refresh.refresh);

  // 초기 정보 로드
  useEffect(() => {
    fetchMyInfo();
  }, [refresh]);

  const fetchMyInfo = async () => {
    try {
      const res = await getMyInformation();
      console.log("res at page: ", res);
      setMyInfo(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickLogout = () => {
    setOpenLogoutModal(true);
  };

  const handleClickUnregister = () => {
    setOpenUnregisterModal(true);
  };

  const handleLogout = () => {
    doLogout();
    setOpenLogoutModal(false);
    navigate({ pathname: "/" }, { replace: true });
  };

  const handleUnregister = () => {
    console.log("unregister");
    fetchUnregister();
  };

  const fetchUnregister = async () => {
    try {
      const res = await unregister();
      console.log("res: ", res);
    } catch (error) {
      console.error(error);
    }
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
            data={myInfo}
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
            onChildClick={handleClickLogout}
            childList={["카카오 연동하기", "비밀번호 변경", "로그아웃"]}
            link={["socialize", "changePassword", "logout"]}
            notToMove={["로그아웃"]}
          />
        </div>
        <div className="w-full">
          <MenuBox
            text={"회원 탈퇴하기"}
            hasChild={false}
            onChildClick={handleClickUnregister}
            childList={[]}
            link={[]}
          />
        </div>
      </div>
      {openLogoutModal && (
        <TwoButtonModal
          onConfirm={handleLogout}
          onCancel={() => setOpenLogoutModal(false)}
        >
          <p className="text-und16 text-undclickbrown font-bold">
            로그아웃 하시겠습니까?
          </p>
        </TwoButtonModal>
      )}
      {openUnregisterModal && (
        <TwoButtonModal
          onConfirm={handleUnregister}
          onCancel={() => setOpenUnregisterModal(false)}
        >
          <p className="text-und16 text-undclickbrown font-bold">
            {diffToday(myInfo.createdDate)}일 간의 여정이 모두 사라집니다
          </p>
          <p className="text-und16 text-undclickbrown font-bold">
            정말 탈퇴하시겠습니까?🥲
          </p>
        </TwoButtonModal>
      )}
    </BasicLayout>
  );
};

export default MyPage;
