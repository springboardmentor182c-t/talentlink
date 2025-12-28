import { useContext } from "react";
import { ThemeContext } from "../theme/themecontext";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      className="theme-btn"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? "🌙 Dark Mode" : "🌞 Light Mode"}
    </button>
  );
};

export default ThemeToggle;