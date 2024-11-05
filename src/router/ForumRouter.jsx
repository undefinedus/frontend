import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

const ForumMain = lazy(() => import("../pages/forum/ForumMainPage"));
const ForumMainDetail = lazy(() =>
  import("../pages/forum/ForumMainDetailPage")
);
const ForumSubject = lazy(() => import("../pages/forum/ForumSubjectPage"));
const ForumSubjectDetail = lazy(() =>
  import("../pages/forum/ForumSubjectDetailPage")
);

const ForumRouter = () => {
  return (
    <Routes>
      <Route path="" element={<Navigate replace to={"list"} />} />
      <Route
        path="list"
        element={
          <Suspense fallback={<LoadingPage />}>
            <ForumMain />
          </Suspense>
        }
      />
      <Route
        path="detail/:id"
        element={
          <Suspense fallback={<LoadingPage />}>
            <ForumMainDetail />
          </Suspense>
        }
      />
      <Route
        path="subject/list"
        element={
          <Suspense fallback={<LoadingPage />}>
            <ForumSubject />
          </Suspense>
        }
      />
      <Route
        path="subject/detail/:id"
        element={
          <Suspense fallback={<LoadingPage />}>
            <ForumSubjectDetail />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default ForumRouter;
