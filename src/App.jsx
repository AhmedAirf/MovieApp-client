import React from "react";
import AppRoutes from "../routes";
import AuthInitializer from "./components/common/AuthInitializer";
import ThemeInitializer from "./components/common/ThemeInitializer";
import ScrollToTop from "./components/common/ScrollToTop";

const App = () => {
  return (
    <>
      <ThemeInitializer />
      <AuthInitializer />
      <ScrollToTop />
      <AppRoutes />
    </>
  );
};

export default App;
