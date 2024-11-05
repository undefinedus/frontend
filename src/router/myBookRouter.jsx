import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

const MyBookShelfPage = lazy(() => import("../pages/myBook/MyBookShelfPage"));
const MyBookListPage = lazy(() => import("../pages/myBook/MyBookListPage"));
const MyBookMarkPage = lazy(() => import("../pages/myBook/MyBookMarkPage"));

const MyBookRouter = () => {
  return (
    <Routes>
      <Route path="" element={<Navigate replace to={"shelf"} />} />
      <Route
        path="shelf"
        element={
          <Suspense fallback={<LoadingPage />}>
            <MyBookShelfPage />
          </Suspense>
        }
      />
      <Route
        path="list"
        element={
          <Suspense fallback={<LoadingPage />}>
            <MyBookListPage />
          </Suspense>
        }
      />
      <Route
        path="mark"
        element={
          <Suspense fallback={<LoadingPage />}>
            <MyBookMarkPage />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default MyBookRouter;
