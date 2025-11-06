import React from "react";
import { SignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import "./loginpage.css";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      {/* BACK BUTTON */}
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>

      {/* LOGO */}
      <div className="login-logo">
        Campus<span>Connect</span>
      </div>

      {/* CLERK SIGN-IN CARD */}
      <div className="login-container">
        <SignIn
          path="/login"
          routing="path"
          signUpUrl="/login"
          afterSignInUrl="/dashboard"
          afterSignUpUrl="/dashboard"
          appearance={{
            elements: {
              rootBox: "clerk-root",
              card: "clerk-card",
              headerTitle: "clerk-title",
              headerSubtitle: "clerk-subtitle",
              socialButtonsBlockButton: "clerk-social-btn",
              formButtonPrimary: "clerk-button-primary",
              formFieldInput: "clerk-input",
              footerActionLink: "clerk-link",
              identityPreviewText: "clerk-text",
              formFieldLabel: "clerk-label",
            },
            layout: {
              socialButtonsPlacement: "top",
              socialButtonsVariant: "iconButton",
            },
          }}
        />
      </div>

      {/* FOOTER */}
      <footer className="login-footer">
        © 2025 CampusConnect. All rights reserved.
      </footer>
    </div>
  );
}

export default Login;