import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const Loading = <div>Loading....</div>;

const Main = lazy(() => import("../pages/MainPage"));
const MyBookShelf = lazy(() => import("../pages/MyBookShelf"));

const root = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: "/MyBookShelf/",
    element: (
      <Suspense fallback={Loading}>
        <MyBookShelf />
      </Suspense>
    ),
  },
]);

export default root;
