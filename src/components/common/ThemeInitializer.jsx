import { useEffect } from "react";
import { useSelector } from "react-redux";

const ThemeInitializer = () => {
  const theme = useSelector((state) => state.ui.theme);

  useEffect(() => {
    // Apply theme to document body
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return null;
};

export default ThemeInitializer;
