import BasicLayout from "../../../layouts/BasicLayout";
import { PrevTitle } from "../../../layouts/TopLayout";
import MenuBox from "../../../components/settings/MenuBox";
import { useNavigate } from "react-router-dom";
import useCustomLogin from "../../../hooks/useCustomLogin";
import { useEffect, useState } from "react";
import TwoButtonModal from "../../../components/modal/commons/TwoButtonModal";
import {
  getKakaoLoginLink,
  getMyInformation,
} from "../../../api/settings/myPageApi";
import { unregister } from "../../../api/signupApi";
import useDateDiff from "../../../hooks/useDateDiff";
import { useSelector } from "react-redux";

const MyPage = () => {
  const { doLogout } = useCustomLogin();
  const navigate = useNavigate();
  const [myInfo, setMyInfo] = useState();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [openUnregisterModal, setOpenUnregisterModal] = useState(false);
  const [openSocializeModal, setOpenSocializeModal] = useState(false);
  const [dynamicMyAccountRoutes, setDynamicMyAccountRoutes] = useState([
    "카카오 연동하기",
    "비밀번호 변경",
    "로그아웃",
  ]);
  const [dynamicMyAccountLinks, setDynamicMyAccountLinks] = useState([
    "socialize",
    "changePassword",
    "logout",
  ]);
  const { diffToday } = useDateDiff();
  const refresh = useSelector((state) => state.refresh.refresh);

  // 초기 정보 로드
  useEffect(() => {
    fetchMyInfo();
  }, [refresh]);

  const fetchMyInfo = async () => {
    try {
      const res = await getMyInformation();
      if (res.social) {
        setDynamicMyAccountRoutes(["로그아웃"]);
        setDynamicMyAccountLinks(["logout"]);
      }
      setMyInfo(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickChild = (child) => {
    if (child === "로그아웃") {
      handleClickLogout();
    } else {
      handleClickSocialize();
    }
  };

  const handleClickLogout = () => {
    setOpenLogoutModal(true);
  };

  const handleClickUnregister = () => {
    setOpenUnregisterModal(true);
  };

  const handleClickSocialize = () => {
    setOpenSocializeModal(true);
  };

  const handleLogout = () => {
    doLogout(myInfo.social);
    setOpenLogoutModal(false);
    navigate("/", { replace: true });
  };

  const handleUnregister = async () => {
    const res = await fetchUnregister();
    if (res === "success") {
      setOpenUnregisterModal(false);
      doLogout(myInfo.social);
      navigate("/", { replace: true });
    }
  };

  const handleSocialize = async () => {
    await socializeAccount();
  };

  const fetchUnregister = async () => {
    try {
      const res = await unregister();
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const socializeAccount = async () => {
    setOpenSocializeModal(false);
    const kakaoAuthUrl = getKakaoLoginLink();
    window.location.href = kakaoAuthUrl;
  };

  return (
    <BasicLayout>
      <div className="fixed top-0 left-0 right-0">
        <PrevTitle
          title={"마이페이지"}
          onClick={() => navigate({ pathname: "/settings" }, { replace: true })}
          showLine={false}
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
            link={"preferences"}
            data={myInfo}
          />
        </div>
        {/* <div className="w-full">
          <MenuBox
            text={"내 업적"}
            hasChild={true}
            childList={["업적 목록", "칭호 수정"]}
            link={["milestone", "setTitle"]}
            notToMove={["칭호 수정"]}
          />
        </div> */}
        <div className="w-full">
          <MenuBox
            text={"내 계정"}
            hasChild={true}
            onChildClick={handleClickChild}
            childList={dynamicMyAccountRoutes}
            link={dynamicMyAccountLinks}
            notToMove={["카카오 연동하기", "로그아웃"]}
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
      {openSocializeModal && (
        <TwoButtonModal
          onConfirm={handleSocialize}
          onCancel={() => setOpenSocializeModal(false)}
        >
          <p className="text-und16 text-undclickbrown font-bold">
            카카오 계정과 연동하시겠습니까?
          </p>
        </TwoButtonModal>
      )}
    </BasicLayout>
  );
};

export default MyPage;
