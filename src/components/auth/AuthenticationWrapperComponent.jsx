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
    "/member/",
    "/member/login",
    "/member/signup",
    "/member/kakao",
    "/member/findPassword",
    "/member/privacyPolicy",
    "/member/termsOfUse",
    "/member/socialSignup",

    // 필요한 공개 경로 추가
  ];

  const isPublicPath = publicPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  // 로그인 안된 상태에서 로그인 전용 경로에 접근 시 로그인 페이지로 이동동
  if (!isLogin && !isPublicPath) {
    return <Navigate to="/member/login" state={{ from: location }} replace />;
  }

  // 로그인된 상태에서 비로그인 전용 경로에 접근 시 홈 페이지로 이동
  if (isLogin && isPublicPath) {
    return <Navigate to="/home" replace />;
  }

  return children;
};
