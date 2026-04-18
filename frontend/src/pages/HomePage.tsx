import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="brand">Cybercell</div>
        <nav className="landing-nav">
          <Link className="btn btn-outline" to="/login">
            Sign in
          </Link>
          <Link className="btn" to="/signup">
            Create account
          </Link>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="hero-tag">Node.js + PostgreSQL Integrated</p>
          <h1>Clean SaaS frontend for secure account workflows</h1>
          <p>
            Production-ready white theme UI connected to your existing backend APIs for signup, login, and profile.
          </p>
          <div className="hero-actions">
            <Link className="btn" to="/signup">
              Start with signup
            </Link>
            <Link className="btn btn-outline" to="/login">
              I already have an account
            </Link>
          </div>
        </div>

        <div className="hero-panel card">
          <h3>Live Backend API Map</h3>
          <ul>
            <li>POST /api/auth/signup</li>
            <li>POST /api/auth/login</li>
            <li>GET /api/user/profile</li>
            <li>GET /api/health</li>
          </ul>
          <p className="muted">Other sections are hidden or disabled until backend APIs are available.</p>
        </div>
      </section>
    </div>
  );
}
