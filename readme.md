# 💼 JobPortal — Full-Stack Job Management Platform

A full-stack **MERN** (MongoDB, Express, React, Node.js) web application that connects **job seekers** and **recruiters** on a single platform. Recruiters can register companies, post job listings, and manage applicants. Students can browse jobs, apply, and track their application status.

---

## ✨ Features

### 👤 Authentication & Authorization
- User registration & login with **JWT-based** authentication
- Secure password hashing with **bcryptjs**
- Role-based access — **Student** and **Recruiter**
- Protected routes via authentication middleware

### 🏢 Company Management *(Recruiter)*
- Register and manage company profiles
- Add company details — name, description, location, website, logo

### 📋 Job Listings *(Recruiter)*
- Create job postings with title, description, requirements, salary, location, type, experience, and positions
- View all jobs posted by the logged-in recruiter

### 🔍 Job Discovery *(Student)*
- Browse and search all available job listings
- View detailed job information

### 📝 Application Workflow
- Students can apply to jobs
- Recruiters can view applicants for their postings
- Update application status — **Pending → Accepted / Rejected**

---

## 🛠️ Tech Stack

| Layer       | Technology                                                      |
| ----------- | --------------------------------------------------------------- |
| **Frontend**| React 19, Vite, React Router, Redux Toolkit, Tailwind CSS 4, shadcn/ui, Axios |
| **Backend** | Node.js, Express 5, Mongoose, JWT, bcryptjs, cookie-parser      |
| **Database**| MongoDB Atlas                                                    |

---

## 📁 Project Structure

```
JOB-management/
├── backend/
│   ├── controllers/          # Route handler logic
│   │   ├── user.controller.js
│   │   ├── company.controller.js
│   │   ├── job.controller.js
│   │   └── application.controller.js
│   ├── middlewares/
│   │   └── isAuthenticated.js   # JWT auth middleware
│   ├── models/               # Mongoose schemas
│   │   ├── user.model.js
│   │   ├── company.model.js
│   │   ├── job.model.js
│   │   └── application.model.js
│   ├── routes/               # Express route definitions
│   │   ├── user.route.js
│   │   ├── company.route.js
│   │   ├── job.route.js
│   │   └── application.route.js
│   ├── utils/
│   │   └── db.js             # MongoDB connection
│   ├── index.js              # Server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/         # Login & SignUp pages
│   │   │   ├── shared/       # Navbar & shared UI
│   │   │   └── ui/           # shadcn/ui components
│   │   ├── lib/              # Utility helpers
│   │   ├── App.jsx           # Routes & app shell
│   │   └── main.jsx          # React entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .env                      # Environment variables (git-ignored)
├── .gitignore
└── readme.md
```

---

## 🔌 API Endpoints

### User — `/api/v1/user`
| Method | Endpoint           | Auth | Description            |
| ------ | ------------------ | ---- | ---------------------- |
| POST   | `/register`        | ✗    | Register a new user    |
| POST   | `/login`           | ✗    | Login & receive token  |
| POST   | `/profile/update`  | ✓    | Update user profile    |
| GET    | `/logout`          | ✗    | Logout & clear cookie  |

### Company — `/api/v1/company`
| Method | Endpoint       | Auth | Description              |
| ------ | -------------- | ---- | ------------------------ |
| POST   | `/register`    | ✓    | Register a new company   |
| GET    | `/get`         | ✓    | Get logged-in user's companies |
| GET    | `/get/:id`     | ✓    | Get company by ID        |
| PUT    | `/update/:id`  | ✓    | Update company details   |

### Job — `/api/v1/job`
| Method | Endpoint        | Auth | Description                   |
| ------ | --------------- | ---- | ----------------------------- |
| POST   | `/post`         | ✓    | Create a new job posting      |
| GET    | `/get`          | ✓    | Get all jobs (with search)    |
| GET    | `/get/:id`      | ✓    | Get job by ID                 |
| GET    | `/getadminjobs` | ✓    | Get jobs posted by recruiter  |

### Application — `/api/v1/application`
| Method | Endpoint            | Auth | Description                     |
| ------ | ------------------- | ---- | ------------------------------- |
| POST   | `/apply/:id`        | ✓    | Apply to a job                  |
| GET    | `/getjobs`          | ✓    | Get jobs the user has applied to|
| POST   | `/getapplicants/:id`| ✓    | Get applicants for a job        |
| POST   | `/update/:id`       | ✓    | Update application status       |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later
- A **MongoDB Atlas** cluster (or local MongoDB instance)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/JOB-management.git
cd JOB-management
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
SECRET_KEY=your_jwt_secret_key
```

### 3. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Run the application

```bash
# Start backend (from /backend)
npm run dev

# Start frontend (from /frontend)
npm run dev
```

| Service  | URL                        |
| -------- | -------------------------- |
| Frontend | http://localhost:5173       |
| Backend  | http://localhost:3000       |

---

## 📄 License

This project is licensed under the **ISC License**.