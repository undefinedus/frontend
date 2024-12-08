import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

const Main = lazy(() => import("../pages/settings/SettingsPage"));
const MyPage = lazy(() => import("../pages/settings/myPage/MyPage"));
const Record = lazy(() => import("../pages/settings/RecordPage"));
const Notifications = lazy(() => import("../pages/settings/NotificationsPage"));
const ChangePassword = lazy(() =>
  import("../pages/settings/ChangePasswordPage")
);
const UserInfo = lazy(() => import("../pages/settings/myPage/UserInfoPage"));

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
        path="record"
        element={
          <Suspense fallback={<LoadingPage />}>
            <Record />
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
        path="changePassword"
        element={
          <Suspense fallback={<LoadingPage />}>
            <ChangePassword />
          </Suspense>
        }
      />
      <Route
        path="myPage/userInfo"
        element={
          <Suspense fallback={<LoadingPage />}>
            <UserInfo />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default SettingsRouter;
