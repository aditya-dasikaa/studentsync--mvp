import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} CampusConnect. All rights reserved.
    </footer>
  );
}

export default Footer;
