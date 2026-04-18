import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export function ProfilePage() {
  const { user, refreshProfile } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await refreshProfile();
    setIsRefreshing(false);
  };

  if (!user) {
    return (
      <div className="card">
        <h2>Profile unavailable</h2>
        <p className="muted">Login again to load profile details.</p>
      </div>
    );
  }

  return (
    <section className="grid-two">
      <article className="card">
        <div className="card-header">
          <h2>User profile</h2>
          <button className="btn btn-outline" type="button" onClick={onRefresh} disabled={isRefreshing}>
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        <div className="profile-grid">
          <div>
            <span>Full name</span>
            <strong>{user.fullName}</strong>
          </div>
          <div>
            <span>Username</span>
            <strong>{user.username}</strong>
          </div>
          <div>
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>
          <div>
            <span>Mobile</span>
            <strong>{user.mobile}</strong>
          </div>
          <div>
            <span>User ID</span>
            <strong>{user.id}</strong>
          </div>
          <div>
            <span>Created</span>
            <strong>{new Date(user.createdAt).toLocaleString()}</strong>
          </div>
        </div>
      </article>

      <article className="card">
        <h2>Auth token flow</h2>
        <ul className="check-list">
          <li>Token returned by POST /api/auth/login</li>
          <li>Stored in localStorage as auth_token</li>
          <li>Automatically attached to protected API requests</li>
          <li>Cleared on logout or profile auth failure</li>
        </ul>
      </article>
    </section>
  );
}
