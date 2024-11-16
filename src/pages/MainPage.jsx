import React, { useEffect } from "react";
import MainLogo from "../components/commons/MainLogo";
import { useNavigate } from "react-router-dom";

// 처음 어플 접속했을때
// 애니메이션 살짝 들어간 로딩화면
// 2~3초 대기 후 로그인페이지로 이동
//
const MainPage = () => {
  const navigate = useNavigate();

  //const { isLogin } = useCustomLogin();

  useEffect(() => {
    const animationDelay = setTimeout(() => {
      navigate("/member/");
    }, 2000);
    return () => clearTimeout(animationDelay);
  }, []);

  return (
    <div className="h-screen bg-white">
      <MainLogo />
    </div>
  );
};

export default MainPage;
