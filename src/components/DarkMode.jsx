import { useEffect, useState } from "react";

function DarkModeToggle() {

  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDark(true);
      document.body.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div 
      className={`toggle ${dark ? "active" : ""}`} 
      onClick={() => setDark(!dark)}
    >
      <div className="toggle-circle"></div>
    </div>
  );
}

export default DarkModeToggle;