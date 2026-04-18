import { useEffect, useState } from "react";
import { authService } from "../services/auth.service";

export function OverviewPage() {
  const [health, setHealth] = useState("checking");

  useEffect(() => {
    const run = async () => {
      try {
        const response = await authService.health();
        setHealth(response.status);
      } catch (error) {
        setHealth("unreachable");
      }
    };

    void run();
  }, []);

  return (
    <section className="grid-two">
      <article className="card">
        <h2>Backend integration status</h2>
        <p className="muted">Connected only to currently available backend routes.</p>
        <div className="status-chip">API health: {health}</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Endpoint</th>
              <th>Method</th>
              <th>Frontend usage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>/api/auth/signup</td>
              <td>POST</td>
              <td>Signup page</td>
            </tr>
            <tr>
              <td>/api/auth/login</td>
              <td>POST</td>
              <td>Login page</td>
            </tr>
            <tr>
              <td>/api/user/profile</td>
              <td>GET</td>
              <td>Profile page</td>
            </tr>
            <tr>
              <td>/api/health</td>
              <td>GET</td>
              <td>Overview health check</td>
            </tr>
          </tbody>
        </table>
      </article>

      <article className="card">
        <h2>Hidden or disabled modules</h2>
        <p className="muted">These are intentionally disabled because backend APIs are not available yet.</p>
        <ul className="check-list">
          <li>Reports module</li>
          <li>Billing module</li>
          <li>Team management</li>
          <li>Assets and scans dashboards</li>
        </ul>
      </article>
    </section>
  );
}
