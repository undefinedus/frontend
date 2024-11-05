import React, { useEffect } from "react";
import BasicLayout from "../../layouts/BasicLayout";

const MyBookShelfPage = () => {
  useEffect(() => {
    if (import.meta.env.MODE === "development") {
      console.log("Development Mode");
    } else {
      console.log("Production Mode");
    }
  });

  return <BasicLayout>MyBookShelfPage</BasicLayout>;
};

export default MyBookShelfPage;
