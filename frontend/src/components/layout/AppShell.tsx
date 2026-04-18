import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ThemeToggle } from "../common/ThemeToggle";

const navItems = [
  { to: "/app/overview", label: "Overview" },
  { to: "/app/profile", label: "Profile" }
];

export function AppShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">Cybercell</div>
        <nav className="nav-list">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
            >
              {item.label}
            </NavLink>
          ))}
          <button className="nav-item nav-item-disabled" disabled type="button">
            Billing (No backend API)
          </button>
          <button className="nav-item nav-item-disabled" disabled type="button">
            Reports (No backend API)
          </button>
        </nav>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <div>
            <p className="topbar-title">Welcome{user ? `, ${user.fullName}` : ""}</p>
            <p className="topbar-subtitle">Professional frontend wired to your Node.js backend</p>
          </div>
          <div className="topbar-actions">
            <ThemeToggle />
            <button className="btn btn-outline" type="button" onClick={onLogout}>
              Logout
            </button>
          </div>
        </header>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
