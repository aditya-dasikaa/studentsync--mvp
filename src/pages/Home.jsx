import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-logo">
          Campus<span>Connect</span>
        </div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/events">Events</a>
          <a href="/dashboard">Dashboard</a>
        </div>
        <button className="nav-signin" onClick={() => navigate("/login")}>
          Sign In
        </button>
      </nav>

      {/* HERO SECTION */}
      <main className="hero">
        <h1 className="gradient-text">
          Your Campus Companion for <br /> Smart Productivity
        </h1>
        <p className="subtext">
          Stay on top of deadlines, events, and teamwork — all in one seamless,
          student-friendly workspace.
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={() => navigate("/login")}>
            Get Started
          </button>
          <button className="btn btn-secondary" onClick={() => navigate("/about")}>
            Learn More
          </button>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">© 2025 CampusConnect. All rights reserved.</footer>
    </div>
  );
}

export default Home;