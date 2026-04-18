import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function SignupPage() {
  const { signup, isAuthLoading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    mobile: "",
    password: ""
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signup(form);
      navigate("/login");
    } catch (error) {
      // Toast already handled in auth context.
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card card" onSubmit={onSubmit}>
        <p className="hero-tag">Create Account</p>
        <h1>Sign up</h1>
        <p className="muted">Create your account and then login to access your profile.</p>

        <label htmlFor="fullName">Full name</label>
        <input
          id="fullName"
          value={form.fullName}
          onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
          placeholder="John Doe"
          required
        />

        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={form.username}
          onChange={(event) => setForm((prev) => ({ ...prev, username: event.target.value }))}
          placeholder="john_doe"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          placeholder="john@example.com"
          required
        />

        <label htmlFor="mobile">Mobile number</label>
        <input
          id="mobile"
          value={form.mobile}
          onChange={(event) => setForm((prev) => ({ ...prev, mobile: event.target.value }))}
          placeholder="9876543210"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={form.password}
          onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
          placeholder="At least 6 characters"
          required
        />

        <button className="btn" type="submit" disabled={isAuthLoading}>
          {isAuthLoading ? "Creating account..." : "Create account"}
        </button>

        <p className="auth-footer">
          Already registered? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
