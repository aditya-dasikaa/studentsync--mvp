import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="home">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-logo">
          Campus<span>Connect</span>
        </div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Events</a>
          <a href="#">Contact</a>
        </div>
        <button className="nav-signin" onClick={handleGetStarted}>
          Sign In
        </button>
      </nav>

      {/* HERO SECTION */}
      <main className="hero">
        <h1 className="gradient-text">
          Your Campus Companion for
          <br />
          Smart Productivity
        </h1>
        <p className="subtext">
          Stay on top of deadlines, events, and teamwork — all in one place.
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={handleGetStarted}>
            Get Started
          </button>
          <button className="btn btn-secondary">Learn More</button>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">© 2025 CampusConnect. All rights reserved.</footer>
    </div>
  );
}

export default Home;