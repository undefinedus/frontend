import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

const ForumMain = lazy(() => import("../pages/forum/ForumMainPage")); //토론 메인
const ProposeDetail = lazy(() => import("../pages/forum/ProposeDetailPage")); // 발의 상세
const WritePropose = lazy(() => import("../pages/forum/WriteProposePage")); // 발의 작성
const ProposeSearchBook = lazy(() =>
  import("../pages/forum/ProposeSearchBookPage")
); // 발의할 책 검색 -> 책갈피 책 추가 검색 MYBOOK_0021과 동일
const ModifyPropose = lazy(() => import("../pages/forum/ModifyProposePage")); // 발의 수정
const ScheduledDetail = lazy(
  () => import("../pages/forum/ScheduledDetailPage") // 예정된 토론 상세
);
const InprogressDetail = lazy(() =>
  import("../pages/forum/InprogressDetailPage")
); // 진행 중 상세
const CompletedDetail = lazy(() =>
  import("../pages/forum/CompletedDetailPage")
); // 종료된 토론 상세
const ForumAnalysis = lazy(() => import("../pages/forum/ForumAnalysisPage")); // AI 분석
const Opinions = lazy(() => import("../pages/forum/OpinionsPage")); // 토론 의견 목록

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
        path="propose/:id"
        element={
          <Suspense fallback={<LoadingPage />}>
            <ProposeDetail />
          </Suspense>
        }
      />
      <Route
        path="propose/write"
        element={
          <Suspense fallback={<LoadingPage />}>
            <WritePropose />
          </Suspense>
        }
      />
      <Route
        path="searchBook"
        element={
          <Suspense fallback={<LoadingPage />}>
            <ProposeSearchBook />
          </Suspense>
        }
      />
      <Route
        path="propose/modify/:id"
        element={
          <Suspense fallback={<LoadingPage />}>
            <ModifyPropose />
          </Suspense>
        }
      />
      <Route
        path="scheduled/:id"
        element={
          <Suspense fallback={<LoadingPage />}>
            <ScheduledDetail />
          </Suspense>
        }
      />
      <Route
        path="inprogress/:id"
        element={
          <Suspense fallback={<LoadingPage />}>
            <InprogressDetail />
          </Suspense>
        }
      />
      <Route
        path="completed/:id"
        element={
          <Suspense fallback={<LoadingPage />}>
            <CompletedDetail />
          </Suspense>
        }
      />
      <Route
        path="completed/forumAnalysis/:id"
        element={
          <Suspense fallback={<LoadingPage />}>
            <ForumAnalysis />
          </Suspense>
        }
      />
      <Route
        path="opinions/:id"
        element={
          <Suspense fallback={<LoadingPage />}>
            <Opinions />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default ForumRouter;
