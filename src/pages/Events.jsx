import React from "react";
import "./Events.css";

function Events() {
  return (
    <div className="events-page">
      {/* NAVBAR */}
      <nav className="events-nav">
        <div className="nav-logo">
          Campus<span>Connect</span>
        </div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/dashboard">Dashboard</a>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="events-main">
        <h1 className="events-title">Campus Events & Activities 🎉</h1>
        <p className="events-subtitle">
          Stay updated with all the latest happenings — academic, cultural, and
          fun-filled — across your campus.
        </p>

        <div className="events-grid">
          <div className="event-card">
            <h2>📚 Tech Innovation Fair</h2>
            <p>
              Showcase your creativity! Present your innovative tech ideas and
              meet top industry mentors and judges.
            </p>
            <span className="event-date">📅 Nov 15, 2025 | Auditorium Hall</span>
            <button className="event-btn">View Details</button>
          </div>

          <div className="event-card">
            <h2>🎨 Art & Design Exhibition</h2>
            <p>
              Experience the creativity of your peers — from digital art to
              sculpture and modern design pieces.
            </p>
            <span className="event-date">📅 Nov 22, 2025 | Design Block</span>
            <button className="event-btn">Register Now</button>
          </div>

          <div className="event-card">
            <h2>🏆 Sports Meet</h2>
            <p>
              Participate in inter-department tournaments and show your
              competitive spirit across multiple sports.
            </p>
            <span className="event-date">📅 Dec 1–3, 2025 | Sports Complex</span>
            <button className="event-btn">View Schedule</button>
          </div>

          <div className="event-card">
            <h2>🎤 Cultural Night</h2>
            <p>
              A night of performances, music, and fun! Celebrate your campus
              culture and talents.
            </p>
            <span className="event-date">📅 Dec 10, 2025 | Open Grounds</span>
            <button className="event-btn">Get Pass</button>
          </div>
        </div>
      </main>

      <footer className="events-footer">
        © 2025 CampusConnect. All rights reserved.
      </footer>
    </div>
  );
}

export default Events;