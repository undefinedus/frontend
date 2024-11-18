import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";
const HomeMain = lazy(() => import("../pages/home/HomeMainPage"));
const HomeSearchBook = lazy(() => import("../pages/home/SearchBookPage"));
const BookDetail = lazy(() => import("../pages/home/BookDetailPage"));

// main : AI추천도서 + 취향추천도서 + 알라딘 베스트셀러
// searchbook : 책 전체 검색
// bookdetail/:id : 기본 책 상세
const HomeRouter = () => {
  return (
    <Routes>
      <Route
        path=""
        element={
          <Suspense fallback={<LoadingPage />}>
            <HomeMain />
          </Suspense>
        }
      />
      <Route
        path="searchbook"
        element={
          <Suspense fallback={<LoadingPage />}>
            <HomeSearchBook />
          </Suspense>
        }
      />
      <Route
        path="bookdetail/:id"
        element={
          <Suspense fallback={<LoadingPage />}>
            <BookDetail />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default HomeRouter;
