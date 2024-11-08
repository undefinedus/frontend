import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";
import LoginPage from "../pages/member/LoginPage";
import SignUpPage from "../pages/member/SignUpPage";
import FindPasswordPage from "../pages/member/FindPasswordPage";

// 로그인, 회원가입, 추가정보입력, 비밀번호 찾기 라우터
const MemberRouter = () => {
  return (
    <Routes>
      <Route path="" element={<Navigate replace to={"login"} />} />
      <Route
        path="login"
        element={
          <Suspense fallback={<LoadingPage />}>
            <LoginPage />
          </Suspense>
        }
      />
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
    </Routes>
  );
};

export default MemberRouter;
