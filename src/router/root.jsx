import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

import memberRouter from "./memberRouter";
import homeRouter from "./homeRouter";
import socialRouter from "./socialRouter";
import myBookRouter from "./myBookRouter";
import forumRouter from "./forumRouter";
import settingsRouter from "./settingsRouter";

const Loading = <div>Loading....</div>;

const Main = lazy(() => import("../pages/MainPage"));
const Member = lazy(() => import("../pages/member/LoginPage"));
const Home = lazy(() => import("../pages/home/HomePage"));
const Social = lazy(() => import("../pages/social/SocialPage"));
const MyBook = lazy(() => import("../pages/myBook/MyBookListPage"));
const Forum = lazy(() => import("../pages/forum/ForumMainPage"));
const Settings = lazy(() => import("../pages/settings/SettingsPage"));

const root = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: "member",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Member />
      </Suspense>
    ),
    children: memberRouter(),
  },
  {
    path: "home",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Home />
      </Suspense>
    ),
    children: homeRouter(),
  },
  {
    path: "social",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Social />
      </Suspense>
    ),
    children: socialRouter(),
  },
  {
    path: "myBook",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <MyBook />
      </Suspense>
    ),
    children: myBookRouter(),
  },
  {
    path: "forum",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Forum />
      </Suspense>
    ),
    children: forumRouter(),
  },
  {
    path: "settings",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Settings />
      </Suspense>
    ),
    children: settingsRouter(),
  },
]);

export default root;
