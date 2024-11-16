import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

const SocialMain = lazy(() => import("../pages/social/SocialMainPage"));
const SocialList = lazy(() => import("../pages/social/SocialListPage"));

// main : 내 프로필, 소셜 검색
// list : 팔로워, 팔로잉 목록
const SocialRouter = () => {
  return (
    <Routes>
      <Route path="" element={<Navigate replace to={"main"} />} />
      <Route
        path="main"
        element={
          <Suspense fallback={<LoadingPage />}>
            <SocialMain />
          </Suspense>
        }
      />
      <Route
        path="list"
        element={
          <Suspense fallback={<LoadingPage />}>
            <SocialList />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default SocialRouter;
