import { lazy } from "react";

export const Login = lazy(() => import("./member/LoginPage"));
export const SignUp = lazy(() => import("./member/SignUpPage"));
export const FindPassword = lazy(() => import("./member/findPassword"));
