import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

const ForumMain = lazy(() => import("../pages/forum/ForumMainPage"));
const ForumMainDetail = lazy(() =>
  import("../pages/forum/ForumMainDetailPage")
);
const ForumSubject = lazy(() => import("../pages/forum/ForumSubjectPage"));
const ForumSubjectDetail = lazy(() =>
  import("../pages/forum/ForumSubjectDetailPage")
);

const forumRouter = () => {
  return [
    {
      path: "",
      element: <Navigate replace={true} to={"list"} />,
    },
    {
      path: "list",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <ForumMain />
        </Suspense>
      ),
    },
    {
      path: "detail/:id",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <ForumMainDetail />
        </Suspense>
      ),
    },
    {
      path: "subject/list",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <ForumSubject />
        </Suspense>
      ),
    },
    {
      path: "subject/detail/:id",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <ForumSubjectDetail />
        </Suspense>
      ),
    },
  ];
};

export default forumRouter;
