import React from "react";
import AppRoutes from "../routes";
import AuthInitializer from "./components/common/AuthInitializer";

const App = () => {
  return (
    <>
      <AuthInitializer />
      <AppRoutes />
    </>
  );
};

export default App;
