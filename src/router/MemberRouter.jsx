import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";
import LoginPage from "../pages/member/LoginPage";
import SignUpPage from "../pages/member/SignupPage";
import FindPasswordPage from "../pages/member/FindPasswordPage";
import KakaoRedirectPage from "../pages/member/KakaoRedirectPage";
import SocialSignupPage from "../pages/member/SocialSignupPage";
import Loading from "../components/commons/Loading";


// 로그인, 회원가입, 추가정보입력, 비밀번호 찾기 라우터
const MemberRouter = () => {
  return (
    <Routes>
      <Route path="" element={<Navigate replace to={"login"} />} />
      <Route path="login" element={<LoginPage />} />
      <Route
        path="signup"
        element={
          <Suspense fallback={<LoadingPage />}>
            <SignUpPage />
          </Suspense>
        }
      />
      <Route
        path="findPassword"
        element={
          <Suspense fallback={<LoadingPage />}>
            <FindPasswordPage />
          </Suspense>
        }
      />
      <Route 
        path="kakao" 
        element={
        <Suspense fallback={<LoadingPage />}>
          <KakaoRedirectPage />
        </Suspense>
        }
      />
      <Route
        path="socialSignup"
        element={
          <Suspense fallback={<LoadingPage />}>
            <SocialSignupPage />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default MemberRouter;
