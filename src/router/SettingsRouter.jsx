import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

const Main = lazy(() => import("../pages/settings/SettingsPage"));
const MyPage = lazy(() => import("../pages/settings/MyPage"));
const Achievments = lazy(() => import("../pages/settings/AchievmentsPage"));
const Notifications = lazy(() => import("../pages/settings/NotificationsPage"));
const Visibility = lazy(() => import("../pages/settings/VisibilityPage"));

// 통계 / 계정 / 신고 추가 바람
// 해당 경로에 페이지가 많을 경우 라우터로 빼도됨
// 신고는 페이지에서 권한 체킹 필요

const SettingsRouter = () => {
  return (
    <Routes>
      <Route
        path=""
        element={
          <Suspense fallback={<LoadingPage />}>
            <Main />
          </Suspense>
        }
      />
      <Route
        path="myPage"
        element={
          <Suspense fallback={<LoadingPage />}>
            <MyPage />
          </Suspense>
        }
      />
      <Route
        path="achievments"
        element={
          <Suspense fallback={<LoadingPage />}>
            <Achievments />
          </Suspense>
        }
      />
      <Route
        path="notifications"
        element={
          <Suspense fallback={<LoadingPage />}>
            <Notifications />
          </Suspense>
        }
      />
      <Route
        path="visibility"
        element={
          <Suspense fallback={<LoadingPage />}>
            <Visibility />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default SettingsRouter;
