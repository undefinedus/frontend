import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

const Main = lazy(() => import("../pages/settings/AdminPage"));
const Report = lazy(() => import("../pages/settings/ReportPage"));
const ReportDetail = lazy(() => import("../pages/settings/ReportDetailPage")); // 추가
const ChangePassword = lazy(() =>
  import("../pages/settings/myPage/ChangePasswordPage")
);
import PrivacyPolicyPage from "../pages/terms/PrivacyPolicy";
import TermsOfUsePage from "../pages/terms/TermsOfUse";

const AdminRouter = () => {
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
      <Route path="report">
        <Route
          index
          element={
            <Suspense fallback={<LoadingPage />}>
              <Report />
            </Suspense>
          }
        />
        <Route
          path=":id"
          element={
            <Suspense fallback={<LoadingPage />}>
              <ReportDetail />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="changePassword"
        element={
          <Suspense fallback={<LoadingPage />}>
            <ChangePassword />
          </Suspense>
        }
      />
      <Route
        path="privacyPolicy"
        element={
          <Suspense fallback={<LoadingPage />}>
            <PrivacyPolicyPage />
          </Suspense>
        }
      />
      <Route
        path="termsOfUse"
        element={
          <Suspense fallback={<LoadingPage />}>
            <TermsOfUsePage />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AdminRouter;
