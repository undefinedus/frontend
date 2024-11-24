import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

const MyBookListPage = lazy(() => import("../pages/myBook/MyBookListPage"));
const MyBookDetailPage = lazy(() => import("../pages/myBook/MyBookDetailPage"));
const MyBookMarkPage = lazy(() => import("../pages/myBook/MyBookMarkPage"));
const MyBookShelfPage = lazy(() => import("../pages/myBook/MyBookShelfPage"));

const MyBookRouter = () => {
  return (
    <Routes>
      <Route path="" element={<Navigate replace to={"list"} />} />
      <Route
        path="list"
        element={
          <Suspense fallback={<LoadingPage />}>
            <MyBookListPage />
          </Suspense>
        }
      />
      <Route
        path="detail/:bookId"
        element={
          <Suspense fallback={<LoadingPage />}>
            <MyBookDetailPage />
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
      <Route
        path="shelf"
        element={
          <Suspense fallback={<LoadingPage />}>
            <MyBookShelfPage />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default MyBookRouter;
