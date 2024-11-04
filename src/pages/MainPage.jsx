import React, { useEffect } from "react";
import MainLogo from "../components/commons/MainLogo";
import { useNavigate } from "react-router-dom";
import useCustomLogin from "../hooks/useCustomLogin";

// 처음 어플 접속했을때
// 애니메이션 살짝 들어간 로딩화면
// 2~3초 대기 후 로그인페이지로 이동
//
const MainPage = () => {
  const navigate = useNavigate();

  //const { isLogin } = useCustomLogin();

  useEffect(() => {
    const animationDelay = setTimeout(() => {
      // 로그인으로 보내기
      // 일단 개발용으로 메인(내책장) 으로 보냄
      navigate("/myBook");
    }, 2000);
    return () => clearTimeout(animationDelay);
  }, []);

  return (
    <div className="h-screen">
      <MainLogo />
    </div>
  );
};

export default MainPage;
