import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const Loading = <div>Loading...</div>;
import { Login, SignUp, FindPassword } from "../pages/lazyLoadPages.js";
const root = createBrowserRouter([
  {
    path: "login",
    element: (
      <Suspense fallback={Loading}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "signUp",
    element: (
      <Suspense fallback={Loading}>
        <SignUp />
      </Suspense>
    ),
  },
  {
    path: "findPassword",
    element: (
      <Suspense fallback={Loading}>
        <FindPassword />
      </Suspense>
    ),
  },
]);

export default root;
