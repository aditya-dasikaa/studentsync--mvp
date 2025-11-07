import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      {/* NAVBAR */}
      <nav className="about-nav">
        <div className="nav-logo">
          Campus<span>Connect</span>
        </div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/dashboard">Dashboard</a>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="about-main">
        <section className="about-hero">
          <h1 className="about-title">About CampusConnect</h1>
          <p className="about-subtitle">
            Your <strong>Campus Companion</strong> designed for smarter productivity,
            effortless collaboration, and stress-free student life.
          </p>
        </section>

        <section className="about-content">
          <p>
            CampusConnect is a modern productivity and communication platform built
            specifically for students and academic teams. Whether you're tracking
            assignments, managing event schedules, or collaborating on projects, it
            brings everything together — beautifully and intuitively.
          </p>

          <p>
            Unlike generic tools like Google Calendar or WhatsApp groups,
            CampusConnect is built around the unique flow of campus life. It integrates
            <strong> task management</strong>, <strong>reminders</strong>, and
            <strong> group event tracking</strong> under one unified dashboard —
            designed to reduce confusion and boost focus.
          </p>

          <p>
            Whether it’s sharing deadlines with your teammates, receiving alerts about
            club meetings, or organizing personal to-dos, CampusConnect ensures nothing
            slips through the cracks.
          </p>
        </section>

        <section className="about-features">
          <h2>🌟 Why Students Love CampusConnect</h2>
          <ul>
            <li>🗓 Smart task scheduling with auto-reminders</li>
            <li>🤝 Group collaboration for assignments and clubs</li>
            <li>📚 Personalized dashboard with your priorities</li>
            <li>📱 Accessible on mobile and desktop for flexible planning</li>
            <li>🔔 Real-time notifications to keep you on track</li>
          </ul>
        </section>

        <section className="about-mission">
          <h2>🎯 Our Mission</h2>
          <p>
            We believe student productivity should be effortless. Our mission is to
            help learners focus on growth, not organization. With CampusConnect, every
            student gets a personal assistant that keeps academic life organized, fun,
            and stress-free.
          </p>
        </section>

        <section className="about-vision">
          <h2>🚀 The Vision Ahead</h2>
          <p>
            CampusConnect is continuously evolving — we’re working on AI-powered study
            planners, cross-campus networking, and integration with your favorite tools
            like Notion, Trello, and Google Drive.
          </p>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="about-footer">
        © 2025 CampusConnect. All rights reserved.
      </footer>
    </div>
  );
}

export default About;