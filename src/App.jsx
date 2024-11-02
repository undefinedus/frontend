import { Suspense, useState } from "react";
import { RouterProvider } from "react-router-dom";
import root from "./router/root";
import Loading from "./components/commons/Loading";
import "./App.css";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={root} />
    </Suspense>
  );
}

export default App;
