// src/pages/Home.jsx
import React from "react";

export default function Home() {
  return (
    <section className="hero-section">
      <div className="hero-inner">
        <h1 className="gradient-text">
          Your Campus Companion for
          <br />
          Smart Productivity
        </h1>

        <p className="subtext">
          Stay on top of deadlines, events, and teamwork — all in one place.
        </p>

        <div className="hero-buttons">
          <button className="btn btn-primary">Get Started</button>
          <button className="btn btn-secondary">Learn More</button>
        </div>
      </div>
    </section>
  );
}