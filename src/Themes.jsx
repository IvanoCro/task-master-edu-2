import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import styles from "./Themes.module.css";

// Teme dostupne u aplikaciji - mapirane točno prema global.css [data-theme="..."]
const themes = [
  {
    id: "default",
    name: "Svijetla Tema",
    preview: { primary: "#2563EB", card: "#F8FAFC", text: "#5B6270" }
  },
  {
    id: "violet",
    name: "Tamna Tema (Violet)",
    preview: { primary: "#6366F1", card: "#1e293b", text: "#94A3B8" }
  },
  {
    id: "emerald",
    name: "Cyber Tema (Zelena)",
    preview: { primary: "#10b981", card: "#115e59", text: "#a7f3d0" }
  },
  {
    id: "sunset",
    name: "Sunset Crimson",
    preview: { primary: "#f97316", card: "#1f080c", text: "#fca5a5" }
  },
  {
    id: "nordic",
    name: "Nordic Frost",
    preview: { primary: "#81a1c1", card: "#f8fafc", text: "#4c566a" }
  },
  {
    id: "retro",
    name: "Retro Neon",
    preview: { primary: "#ff007f", card: "#0f0720", text: "#bc95ff" }
  }
];

export default function Themes() {
  const { activeTheme, handleThemeChange } = useContext(ThemeContext);

  return (
    <div className={styles.wrapper}>
      <div className={styles.themeSelectorContainer}>
        <h3 className={styles.selectorTitle}>Odaberi Temu</h3>
        
        <div className={styles.themeGrid}>
          {themes.map((theme) => (
            <button
              key={theme.id}
              className={`${styles.themeBtn} ${activeTheme === theme.id ? styles.active : ""}`}
              onClick={() => handleThemeChange(theme.id)}
            >
              <span className={styles.themeName}>{theme.name}</span>
              {/* Vizualni preview krugovi za svaku temu */}
              <div className={styles.previewColors}>
                <span style={{ backgroundColor: theme.preview.primary }}></span>
                <span style={{ backgroundColor: theme.preview.card }}></span>
                <span style={{ backgroundColor: theme.preview.text }}></span>
              </div>
            </button>
          ))}
        </div>

        <Link className={styles.backButton} to="/settings">
          Back
        </Link>
      </div>
    </div>
  );
}