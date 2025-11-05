// src/components/Navbar.jsx
import React, { useState } from "react";
import "../App.css";

function Navbar() {
  const [active, setActive] = useState("Home");

  const menuItems = ["Home", "About", "Events", "Contact"];

  return (
    <nav>
      {/* Logo with elegant gradient */}
      <div className="nav-logo">CampusConnect</div>

      {/* Navigation Links */}
      <div className="nav-links">
        {menuItems.map((item) => (
          <a
            key={item}
            href="#"
            className={active === item ? "active" : ""}
            onClick={() => setActive(item)}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;