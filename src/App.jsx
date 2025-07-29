import React from "react";
import AppRoutes from "../routes";
import AuthInitializer from "./components/common/AuthInitializer";
import ThemeInitializer from "./components/common/ThemeInitializer";

const App = () => {
  return (
    <>
      <ThemeInitializer />
      <AuthInitializer />
      <AppRoutes />
    </>
  );
};

export default App;
