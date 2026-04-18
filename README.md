# MarketStock Monorepo

Production-ready full-stack workspace with a Node.js backend and a React frontend.
This repository is organized for local development first, then staging and production rollout.
The stack is intentionally simple and maintainable: Express, PostgreSQL, Vite, React, and TypeScript.

## 1. Project Overview

MarketStock currently provides account authentication and profile management.
The backend exposes stable REST APIs for signup, login, health, and profile fetch.
The frontend integrates only those existing APIs and avoids mock or fake service layers.
Unsupported modules are intentionally hidden or disabled until backend routes exist.

### Current Functional Scope

- User signup with mobile, email, password, full name, and username.
- User login using mobile OR email OR username and password.
- Bearer token authentication flow for protected endpoints.
- User profile retrieval for authenticated sessions.
- Basic backend health monitoring endpoint.

### Design Goals

- Clean architecture that can be extended without rewriting core flows.
- Environment driven configuration for local and deployment consistency.
- Production-like local workflow using npm install and npm run dev.
- Clear API to UI mapping with explicit handling of missing backend features.

## 2. Repository Structure

- backend: Express API, PostgreSQL integration, auth middleware, route handlers.
- frontend: Vite React TypeScript UI, auth context, service layer, route guards.
- docs: product and planning documentation.
- .env: root backend environment configuration.
- .env.example: root backend environment template.

## 3. Technology Stack

### Backend

- Runtime: Node.js
- Framework: Express
- Database: PostgreSQL
- Password Hashing: bcryptjs
- Auth Tokens: jsonwebtoken
- Security Middleware: helmet, cors
- Request Logging: morgan
- Environment: dotenv
- Dev Runner: nodemon

### Frontend

- Build Tool: Vite
- Language: TypeScript
- Library: React
- Routing: react-router-dom
- HTTP Client: axios
- Notifications: sonner
- State Strategy: context + hooks + service layer

## 4. Prerequisites

Install the following before running locally.

- Node.js 18 or later (Node.js 20 recommended).
- npm 9 or later.
- PostgreSQL 14 or later.
- Git.

Optional but recommended.

- VS Code with ESLint extension.
- PostgreSQL GUI client such as pgAdmin or DBeaver.

## 5. Environment Configuration

### Root Backend Environment

The backend reads variables from root .env.
Use root .env.example as template.

Required values.

- PORT
- DB_HOST
- DB_PORT
- DB_USER
- DB_PASSWORD
- DB_NAME
- JWT_SECRET
- JWT_EXPIRES_IN

Current local default in this repository uses DB_NAME=cyber_data.
Change values to match your own local PostgreSQL credentials.

### Frontend Environment

Frontend uses frontend/.env for frontend-specific variables.
Use frontend/.env.example as template.

Primary frontend variable.

- VITE_API_BASE_URL

Recommended local value.

- VITE_API_BASE_URL=http://localhost:4000/api

## 6. Local Setup Guide

Follow this exact order for a clean first run.

### Step 1: Configure Backend Environment

1. Copy root .env.example to root .env.
2. Update database and JWT settings.
3. Ensure DB_NAME points to an existing database.

### Step 2: Install Backend Dependencies

1. Open terminal at backend.
2. Run npm install.

### Step 3: Run Backend

1. Run npm run dev in backend.
2. Confirm startup logs show server URL.
3. Confirm no database authentication error appears.

### Step 4: Configure Frontend Environment

1. Open terminal at frontend.
2. Copy .env.example to .env.
3. Verify VITE_API_BASE_URL targets backend API base.

### Step 5: Install Frontend Dependencies

1. Run npm install in frontend.

### Step 6: Run Frontend

1. Run npm run dev in frontend.
2. Open the printed local URL in browser.

## 7. Build and Production Checks

### Backend

- Start command: npm start
- Dev command: npm run dev

### Frontend

- Build command: npm run build
- Preview command: npm run preview
- Dev command: npm run dev

Recommended pre-release checks.

- Frontend build passes.
- Backend starts with production-like env values.
- Login and profile flow works end-to-end.

## 8. API Reference

Base URL in local setup is http://localhost:4000/api.

### GET /health

- Purpose: service liveness check.
- Auth required: no.
- Success: status ok payload.

### POST /auth/signup

- Purpose: create new user account.
- Auth required: no.
- Required body fields: mobile, email, password, fullName, username.
- Validation highlights: mobile is 8 to 15 digits, password minimum length is 6.
- Duplicate conflict: returns 409 when email, mobile, or username exists.

### POST /auth/login

- Purpose: authenticate existing user.
- Auth required: no.
- Required body fields: loginId, password.
- loginId accepts mobile OR email OR username.
- Success returns bearer token and user object.

### GET /user/profile

- Purpose: fetch current authenticated profile.
- Auth required: yes.
- Header: Authorization Bearer token.
- Not found returns 404 if user record is unavailable.

## 9. Frontend to Backend Mapping

- Signup page calls POST /auth/signup.
- Login page calls POST /auth/login.
- Profile page calls GET /user/profile.
- Overview page calls GET /health.

If backend API is missing, frontend module is hidden or disabled.
This behavior is intentional and keeps UX honest in production.

## 10. Authentication Flow

1. User submits credentials on login page.
2. Backend returns JWT token and user payload.
3. Frontend stores token in local storage.
4. Axios interceptor appends token to protected API calls.
5. Profile page fetches authenticated user details.
6. Logout clears token and local auth state.

## 11. Error Handling Strategy

- API failures surface as user-facing toast notifications.
- Auth errors clear session when token becomes invalid.
- Validation messages from backend are shown directly where safe.
- Unsupported sections are not rendered as active features.

## 12. Troubleshooting

### Backend Cannot Start

- Check DB credentials in root .env.
- Verify PostgreSQL service is running.
- Verify DB_NAME exists.
- Verify DB_USER has database access rights.

### Login Fails with Invalid Credentials

- Confirm signup succeeded first.
- Confirm loginId matches email OR mobile OR username.
- Confirm password matches original signup value.

### Profile Endpoint Returns 401

- Confirm Authorization header includes Bearer token.
- Confirm token was not cleared from local storage.
- Login again to refresh session.

### Frontend Cannot Reach Backend

- Verify backend is running on configured port.
- Verify frontend .env VITE_API_BASE_URL is correct.
- Check browser network tab for failing URL.

## 13. Security Notes

- Never commit real secrets to git.
- Rotate JWT_SECRET before production deployment.
- Use long random JWT secret values in non-local environments.
- Restrict CORS policy for staging and production domains.
- Add HTTPS termination in production.

## 14. Roadmap Guidance

Potential next backend additions.

- Update profile endpoint.
- Password reset and email verification.
- Role-based access control.
- Audit logging for sensitive actions.

Potential next frontend additions.

- Profile edit form.
- Password reset screens.
- Admin panel gated by roles.
- Data tables for future domain modules.
