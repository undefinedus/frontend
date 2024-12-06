import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

const ForumMain = lazy(() => import("../pages/forum/ForumMainPage")); //토론 메인
const WritePropose = lazy(() => import("../pages/forum/WriteProposePage")); // 발의 작성
const ProposeDetail = lazy(() => import("../pages/forum/ProposeDetailPage")); // 발의 상세
const ProposeSearchBook = lazy(() =>
  import("../pages/mybook/MyBookSearchPage")
); // 발의할 책 검색 -> 책갈피 책 추가 검색 MYBOOK_0021과 동일
const ModifyPropose = lazy(() => import("../pages/forum/ModifyProposePage")); // 발의 수정

const ScheduledDetail = lazy(
  () => import("../pages/forum/ScheduledDetailPage") // 예정된 토론 상세
);

const InprogressDetail = lazy(() =>
  import("../pages/forum/InprogressDetailPage")
); // 진행 중 상세
const InprogressOpinions = lazy(() =>
  import("../pages/forum/InprogressOpinionsPage")
); // 진행 중 토론 의견 목록

const CompletedDetail = lazy(() =>
  import("../pages/forum/CompletedDetailPage")
); // 종료된 토론 상세
const CompletedOpinions = lazy(() =>
  import("../pages/forum/CompletedOpinionsPage")
); // 종료된 토론 의견 목록
const ForumAnalysis = lazy(() => import("../pages/forum/ForumAnalysisPage")); // AI 분석

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
        path="propose/write"
        element={
          <Suspense fallback={<LoadingPage />}>
            <WritePropose />
          </Suspense>
        }
      />
      <Route
        path="propose/searchBook"
        element={
          <Suspense fallback={<LoadingPage />}>
            <ProposeSearchBook />
          </Suspense>
        }
      />
      <Route
        path="propose/:discussionId"
        element={
          <Suspense fallback={<LoadingPage />}>
            <ProposeDetail />
          </Suspense>
        }
      />
      <Route
        path="propose/modify/:discussionId"
        element={
          <Suspense fallback={<LoadingPage />}>
            <ModifyPropose />
          </Suspense>
        }
      />
      <Route
        path="scheduled/:discussionId"
        element={
          <Suspense fallback={<LoadingPage />}>
            <ScheduledDetail />
          </Suspense>
        }
      />
      <Route
        path="inprogress/:discussionId"
        element={
          <Suspense fallback={<LoadingPage />}>
            <InprogressDetail />
          </Suspense>
        }
      />
      <Route
        path="inprogress/opinions/:discussionId"
        element={
          <Suspense fallback={<LoadingPage />}>
            <InprogressOpinions />
          </Suspense>
        }
      />
      <Route
        path="completed/:discussionId"
        element={
          <Suspense fallback={<LoadingPage />}>
            <CompletedDetail />
          </Suspense>
        }
      />
      <Route
        path="completed/forumAnalysis/:discussionId"
        element={
          <Suspense fallback={<LoadingPage />}>
            <ForumAnalysis />
          </Suspense>
        }
      />
      <Route
        path="complete/opinions/:discussionId"
        element={
          <Suspense fallback={<LoadingPage />}>
            <CompletedOpinions />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default ForumRouter;
