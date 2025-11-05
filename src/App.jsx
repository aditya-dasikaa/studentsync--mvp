// src/App.jsx
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <h1>
          Your Campus Companion for <br /> Smart Productivity
        </h1>
        <p>
          Stay on top of deadlines, events, and teamwork — all in one place.
        </p>

        <div className="hero-buttons">
          <button className="get-started">Get Started</button>
          <button className="learn-more">Learn More</button>
        </div>
      </section>

      {/* Footer */}
      <footer>© 2025 CampusConnect. All rights reserved.</footer>

      {/* Floating Dark/Light Toggle */}
      <button
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle theme"
      >
        {darkMode ? "🌙" : "☀"}
      </button>
    </div>
  );
}

export default App;