import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";

// 인증이 필요한 라우트를 감싸는 HOC
export const withAuth = (WrappedComponent) => {
  return function WithAuthComponent(props) {
    const { isLogin, moveToLogin } = useCustomLogin();
    const location = useLocation();

    React.useEffect(() => {
      if (!isLogin) {
        moveToLogin();
      }
    }, [isLogin]);

    if (!isLogin) {
      return <Navigate to="/member/login" state={{ from: location }} replace />;
    }

    return <WrappedComponent {...props} />;
  };
};

// 라우터 전체를 감싸는 인증 컨테이너
export const AuthContainer = ({ children }) => {
  const { isLogin } = useCustomLogin();
  const location = useLocation();

  // 로그인이 필요하지 않은 경로들
  const publicPaths = [
    "/member/login",
    "/member/signup",
    "/member/kakao",
    "/member/findPassword",
    "/member/privacyPolicy",
    "/member/TermsOfUse",
    // 필요한 공개 경로 추가
  ];

  const isPublicPath = publicPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  if (!isLogin && !isPublicPath) {
    return <Navigate to="/member/login" state={{ from: location }} replace />;
  }

  return children;
};
