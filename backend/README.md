# Backend API (Node.js + PostgreSQL)

## 1) Setup

1. Copy environment file:
   - Windows PowerShell:
     ```powershell
  Set-Location ..
  Copy-Item .env.example .env
  Set-Location .\backend
     ```
2. Update values in root `.env` for your local PostgreSQL.
3. Ensure database exists (example database name: `market_stock`).

## 2) Install

```powershell
npm install
```

## 3) Run with nodemon

```powershell
npm run dev
```

## 4) Run normally

```powershell
npm start
```

Server starts on `http://localhost:PORT` and auto-creates `users` table on startup.

## API Endpoints

### Health
- `GET /api/health`

### Signup
- `POST /api/auth/signup`
- Body:
```json
{
  "mobile": "9876543210",
  "email": "john@example.com",
  "password": "yourPassword",
  "fullName": "John Doe",
  "username": "john_doe"
}
```

### Login
- `POST /api/auth/login`
- Body (`loginId` can be mobile OR email OR username):
```json
{
  "loginId": "john@example.com",
  "password": "yourPassword"
}
```

### User Profile
- `GET /api/user/profile`
- Header: `Authorization: Bearer <token>`
