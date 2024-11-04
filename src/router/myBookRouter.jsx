import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

const MyBookShelf = lazy(() => import("../pages/myBook/MyBookShelfPage"));
const MyBookList = lazy(() => import("../pages/myBook/MyBookListPage"));
const MyBookMark = lazy(() => import("../pages/myBook/MyBookMarkPage"));

const myBookRouter = () => {
  return [
    {
      path: "",
      element: <Navigate replace={true} to={"shelf/:id"} />,
    },
    {
      path: "shelf/:id",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <MyBookShelf />
        </Suspense>
      ),
    },
    {
      path: "list/:id",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <MyBookList />
        </Suspense>
      ),
    },
    {
      path: "mark/:id",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <MyBookMark />
        </Suspense>
      ),
    },
  ];
};

export default myBookRouter;
