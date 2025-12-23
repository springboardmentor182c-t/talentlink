import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/landing.css";
import heroImage from "../assets/landing_page_image.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing">

      {/* NAVBAR */}
      <header className="navbar">
        <h1 className="logo">TalentLink</h1>

        <nav className="nav">
          <ul className="nav-links">
            <li>Platform</li>
            <li>Features</li>
            <li>Solutions</li>
            <li>Community</li>
          </ul>
        </nav>

        <div className="nav-actions">
          <button className="btn outline" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="btn primary" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </header>

      {/* HERO */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay" />

        <div className="hero-content">
          <h2>
            Work Without Borders.<br />
            Talent Without Limits.
          </h2>

          <p>
            The all-in-one ecosystem for hiring, contracts, payments and
            collaboration — built for modern teams.
          </p>

          <div className="hero-buttons">
              <button className="btn primary large" onClick={() => navigate("/login")}>Hire Talent →</button>
              <button className="btn glass large">Explore Platform</button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2 className="section-title">Why TalentLink?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>Smart Matching</h3>
            <p>
              Instantly connect with experts tailored to your project needs.
            </p>
          </div>

          <div className="feature-card highlight">
            <h3>Secure Payments</h3>
            <p>
              Escrow-based payments ensure safety and transparency.
            </p>
          </div>

          <div className="feature-card">
            <h3>Collaborate Seamlessly</h3>
            <p>
              Chat, share files, and track milestones — all in one workspace.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Build Your Dream Team Today</h2>
        <p>Join thousands of companies building faster with TalentLink.</p>
        <button className="btn primary xl" onClick={() => navigate("/signup")}>Get Started Free</button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 TalentLink</p>
        <p>support@talentlink.com</p>
      </footer>

    </div>
  );
};

export default Landing;
