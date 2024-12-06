import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

const Main = lazy(() => import("../pages/settings/AdminPage"));
const Report = lazy(() => import("../pages/settings/ReportPage"));
const ReportDetail = lazy(() => import("../pages/settings/ReportDetailPage")); // 추가

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
    </Routes>
  );
};

export default AdminRouter;
