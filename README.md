# Market Minds Investment (MMI) - Full Stack Advisory Platform

Production-ready modular full-stack web application for financial advisors.

## Tech Stack
- **Frontend:** React + Vite + Tailwind CSS + Recharts
- **Backend:** Node.js + Express + MongoDB (Mongoose)
- **Auth:** JWT access/refresh token with secure cookie refresh handling
- **Security:** Helmet, CORS, rate limiting, mongo sanitize, HPP
- **Uploads:** Multer with KYC size/type restrictions
- **Reports:** ExcelJS export

## Project Structure
```
backend/
  controllers/
  models/
  routes/
  middleware/
  config/
  utils/
frontend/
  src/
    components/
    pages/
    services/
    context/
    hooks/
```

## Quick Start
### 1) Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 2) Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

### 3) Seed Dummy Data
```bash
cd backend
npm run seed
```

## Default Dummy Credentials
- Admin: `admin@mmi.com` / `Admin@12345`
- Relationship Manager: `rm@mmi.com` / `Manager@12345`

## Core API Endpoints
### Authentication
- `POST /api/auth/register-admin`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `POST /api/auth/register-rm`

### Clients
- `POST /api/clients` (multipart with `kycDocument`)
- `GET /api/clients?search=priya&riskProfile=moderate&page=1&limit=10`
- `GET /api/clients/:id`
- `PUT /api/clients/:id`
- `DELETE /api/clients/:id` (soft delete)
- `GET /api/clients/:id/kyc` (protected download)

### Investments
- `POST /api/investments/client/:clientId`
- `PUT /api/investments/:id`
- `DELETE /api/investments/:id`
- `GET /api/investments/client/:clientId/summary`
- `GET /api/investments/client/:clientId/export`

### Dashboard
- `GET /api/dashboard`

## Example Requests
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mmi.com", "password":"Admin@12345"}'
```

```bash
curl -X GET http://localhost:5000/api/clients?search=ABCDE \
  -H "Authorization: Bearer <access_token>"
```

## Deployment
### Backend on Render
1. Create a new **Web Service** with root directory `backend`.
2. Set build command: `npm install`.
3. Set start command: `npm start`.
4. Add environment variables from `.env.example` with production values.
5. Use MongoDB Atlas connection string for `MONGO_URI`.

### Frontend on Vercel
1. Import repo into Vercel.
2. Set root directory to `frontend`.
3. Build command: `npm run build`, output: `dist`.
4. Add `VITE_API_URL` pointing to Render backend URL.

## Scalability Notes
- Follows modular clean architecture by domain route/controller/model separation.
- Designed to add modules for insurance tracking, stock portfolios, commissions, and client portal with minimal refactoring.
- Uses role-based authorization and central middleware for extensibility.
