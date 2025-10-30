import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    const el = document.documentElement;
    if (theme === "dark") el.classList.add("dark"); else el.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="px-3 py-1 bg-card rounded-xl shadow-[var(--shadow-card)]">
        {theme === "dark" ? "Dark" : "Light"}
      </button>
    </div>
  );
}
