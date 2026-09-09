# Vatsalya Vatika Ashram — Modern Full-Stack Website & Management Platform

A peaceful, spiritual, modern, and user-friendly web application created for **Vatsalya Vatika Ashram**, an educational and charitable refuge where 200+ students receive education, accommodation, food, healthcare, clothing, guidance, sports, activities, and essential life values.

---

## 🌟 Tech Stack

### Frontend
- **Framework**: React.js 18 + TypeScript + Vite
- **Styling**: Tailwind CSS (with custom Ashram Cream, Saffron, Emerald Green, Soft Gold & Charcoal Dark palette)
- **Animations**: Framer Motion & custom CSS radial clip-path theme transitions
- **Routing & HTTP**: React Router DOM v6, Axios
- **Icons & Notifications**: Lucide React, React Hot Toast

### Backend
- **Runtime & Server**: Node.js + Express.js + TypeScript
- **Database & ORM**: MongoDB + Mongoose (with built-in high-performance fallback data store for zero-dependency execution)
- **Authentication**: JWT (JSON Web Tokens) + bcryptjs password hashing
- **Security & Middleware**: CORS, custom Admin Auth Middleware, Global Error Handler

---

## 📁 Project Architecture

```text
vatsalya-vatika/
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Responsive UI components (Navbar, Hero, Impact, Facilities, Guruji, Lightbox, etc.)
│   │   ├── context/          # ThemeContext (with top-right to bottom-left clip transition) & AuthContext
│   │   ├── pages/            # Public & Protected Admin Dashboard Pages
│   │   ├── services/         # Centralized Axios API Services (events, gallery, facilities, contact, contributions, auth)
│   │   ├── types/            # TypeScript Interface definitions
│   │   ├── App.tsx           # App Router & Notifications
│   │   └── index.css         # Tailwind base styles & theme transition overlays
│   ├── index.html
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/           # Database & Environment Configuration
│   │   ├── controllers/      # REST API Controllers (Auth, Events, Gallery, Facilities, Contact, Contributions)
│   │   ├── middleware/       # JWT Authentication & Error Middleware
│   │   ├── models/           # Mongoose Data Models
│   │   ├── routes/           # Express Route definitions
│   │   ├── services/         # Fallback Data Store & Seed Database Service
│   │   └── server.ts         # Express Application Entry Point
│   ├── .env                  # Backend environment variables
│   └── package.json
│
├── README.md
└── package.json              # Root script runner
```

---

## 🚀 Quick Start Guide

### 1. Installation

From the root directory, install dependencies for both frontend and backend:

```bash
# Install root, frontend, and backend packages
npm run install:all
```

Or install individually:

```bash
cd frontend && npm install
cd ../backend && npm install
```

---

### 2. Environment Setup

The backend configuration is defined in `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/vatsalya_vatika
JWT_SECRET=vatsalya_vatika_jwt_secret_key_2026_spiritual_care
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

---

### 3. Seed Database & Start Servers

To initialize default admin credentials, events, gallery items, and facilities:

```bash
# Seed initial Ashram data
npm run seed

# Run backend REST API server (Port 5000)
npm run dev:backend

# Run frontend React app (Port 5173) in another terminal
npm run dev:frontend
```

---

## 🔑 Admin Credentials

- **Admin Login URL**: `http://localhost:5173/admin/login`
- **Email**: `admin@vatsalyavatika.org`
- **Password**: `admin123`

---

## 📡 REST API Documentation

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | Backend health check |
| `POST` | `/api/auth/login` | Public | Admin JWT Authentication |
| `GET` | `/api/events` | Public | Fetch all Ashram events |
| `POST` | `/api/events` | Protected (Admin) | Create a new event |
| `PUT` | `/api/events/:id` | Protected (Admin) | Update an event |
| `DELETE` | `/api/events/:id` | Protected (Admin) | Delete an event |
| `GET` | `/api/gallery` | Public | Fetch gallery images |
| `POST` | `/api/gallery` | Protected (Admin) | Add a gallery image |
| `DELETE` | `/api/gallery/:id` | Protected (Admin) | Delete a gallery image |
| `GET` | `/api/facilities` | Public | Fetch facility cards |
| `POST` | `/api/facilities` | Protected (Admin) | Add a new facility |
| `PUT` | `/api/facilities/:id` | Protected (Admin) | Update a facility |
| `DELETE` | `/api/facilities/:id` | Protected (Admin) | Delete a facility |
| `POST` | `/api/contact` | Public | Submit contact form inquiry |
| `GET` | `/api/contact` | Protected (Admin) | Fetch all contact messages |
| `PUT` | `/api/contact/:id` | Protected (Admin) | Update message status (`new`/`read`/`replied`) |
| `DELETE` | `/api/contact/:id` | Protected (Admin) | Delete contact message |
| `POST` | `/api/contributions` | Public | Record contribution/donation pledge |
| `GET` | `/api/contributions` | Protected (Admin) | View all recorded contribution pledges |

---

## 🌙 Dark Mode & Unique Visual Interactions

- **Diagonal Radial Clip Transition**: Toggling dark mode triggers a custom radial expansion originating from top-right (`100% 0%`) down across the viewport.
- **Lightbox Gallery**: Click any image to view full-resolution, zoom in/out, and navigate images seamlessly.
- **Interactive Payment Simulator**: Configurable donation tiers (₹500, ₹1000, ₹2500, Custom) with UPI/QR/Bank transfer details managed by the Ashram administrator.
