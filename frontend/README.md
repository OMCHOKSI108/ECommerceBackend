# MarketStock Frontend

Professional React + TypeScript frontend integrated with existing Node.js backend APIs.

## Setup

1. Copy environment file:
	```powershell
	Copy-Item .env.example .env
	```
2. Update `.env` if backend runs on different host/port.
3. Install dependencies:
	```powershell
	npm install
	```
4. Run development server:
	```powershell
	npm run dev
	```

## Build

```powershell
npm run build
```

## Environment

- `VITE_API_BASE_URL` (default: `http://localhost:4000/api`)

## Implemented Pages

- Home page
- Login page
- Signup page
- App Overview page
- User Profile page
- Not Found page

## Backend API Mapping

- `POST /api/auth/signup` -> Signup page
- `POST /api/auth/login` -> Login page
- `GET /api/user/profile` -> Profile page
- `GET /api/health` -> Overview page health status

## Missing Backend APIs (Frontend Disabled/Hidden)

- Billing APIs
- Reports APIs
- Team management APIs
- Assets and scan analytics APIs

## Notes

- Token flow is handled using bearer token from login response.
- Unsupported modules are intentionally disabled until backend endpoints are available.
