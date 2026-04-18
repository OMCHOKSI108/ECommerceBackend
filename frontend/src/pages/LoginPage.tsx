import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function LoginPage() {
  const { login, isAuthLoading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    loginId: "",
    password: ""
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await login(form);
      navigate("/app/profile");
    } catch (error) {
      // Toast already handled in auth context.
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card card" onSubmit={onSubmit}>
        <p className="hero-tag">Secure Login</p>
        <h1>Welcome back</h1>
        <p className="muted">Use email, mobile number, or username with password.</p>

        <label htmlFor="loginId">Email / Mobile / Username</label>
        <input
          id="loginId"
          value={form.loginId}
          onChange={(event) => setForm((prev) => ({ ...prev, loginId: event.target.value }))}
          placeholder="john@example.com or 9876543210"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={form.password}
          onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
          placeholder="Enter password"
          required
        />

        <button className="btn" type="submit" disabled={isAuthLoading}>
          {isAuthLoading ? "Signing in..." : "Sign in"}
        </button>

        <p className="auth-footer">
          Need an account? <Link to="/signup">Create one</Link>
        </p>
      </form>
    </div>
  );
}
