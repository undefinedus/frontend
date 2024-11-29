import { lazy } from "react";

export const SignUp = lazy(() => import("./member/SignupPage"));
export const FindPassword = lazy(() => import("./member/findPassword"));
export const KakaoRedirect = lazy(() => import("./member/KakaoRedirectPage"));
