# 🌱 Habit Tracker App

A full-stack web application to track your daily habits. Built with React, Node.js, Express, and Firebase Firestore.

## 🌐 Live Demo

- **Frontend:** https://habit-tracker-app-three-chi.vercel.app
- **Backend API:** https://habit-tracker-app-production-3303.up.railway.app

## ✨ Features

- ✅ User registration and login with JWT authentication
- ✅ Create, update, and delete habits
- ✅ Mark habits as complete/incomplete for today
- ✅ Color-coded habit cards
- ✅ Daily habit tracking with completion history
- ✅ Fully responsive UI
- ✅ Protected routes (auth required)

## 🛠️ Tech Stack

### Frontend
- React 18 + Vite
- React Router v6
- Axios
- Context API for global state

### Backend
- Node.js + Express
- Firebase Admin SDK
- Firebase Firestore (database)
- JWT (jsonwebtoken) for authentication
- bcryptjs for password hashing

### Deployment
- Frontend → Vercel
- Backend → Railway
- Database → Firebase Firestore (free tier)

## 📁 Project Structure habit-tracker/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/           # Page-level components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── context/         # Global state
│   │   │   └── AuthContext.jsx
│   │   ├── services/        # API calls
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── server/                  # Node.js backend
├── src/
│   ├── config/
│   │   └── firebase.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── habitController.js
│   ├── middleware/
│   │   └── auth.js
│   └── routes/
│       ├── authRoutes.js
│       └── habitRoutes.js
├── server.js
└── package.json

## 🚀 Getting Started Locally

### Prerequisites
- Node.js v18+
- Firebase account (free)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Shis2405/Habit-Tracker-App.git
cd Habit-Tracker-App
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` folder:

```env
PORT=8000
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

Add your Firebase service account key:
- Go to Firebase Console → Project Settings → Service Accounts
- Click **Generate new private key**
- Save the downloaded file as `server/src/config/serviceAccountKey.json`

Start the backend:

```bash
npm run dev
```

Backend runs on `http://localhost:8000`

### 3. Set up the frontend

```bash
cd ../client
npm install
```

Create a `.env` file in the `client/` folder:

```env
VITE_API_URL=http://localhost:8000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |

### Habits (all protected — requires JWT)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/habits` | Get all habits for logged-in user |
| POST | `/api/habits` | Create a new habit |
| PUT | `/api/habits/:id` | Update a habit |
| DELETE | `/api/habits/:id` | Delete a habit |
| POST | `/api/habits/:id/complete` | Toggle habit completion for today |

## 🔐 Environment Variables

### Backend (`server/.env`)
| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 8000) |
| `JWT_SECRET` | Secret key for JWT signing |
| `NODE_ENV` | Environment (development/production) |
| `FIREBASE_SERVICE_ACCOUNT` | Firebase credentials JSON (production only) |

### Frontend (`client/.env`)
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL |

## 🚢 Deployment

### Backend (Railway)
1. Push code to GitHub
2. Create new project on Railway → Deploy from GitHub
3. Set root directory to `server`
4. Add environment variables (PORT, JWT_SECRET, NODE_ENV, FIREBASE_SERVICE_ACCOUNT)
5. Generate domain in Settings → Networking

### Frontend (Vercel)
1. Create new project on Vercel → Import from GitHub
2. Set root directory to `client`
3. Add environment variable (VITE_API_URL)
4. Deploy!

## 📸 Screenshots

### Login Page
![Login Page](https://via.placeholder.com/800x400?text=Login+Page)

### Dashboard
![Dashboard](https://via.placeholder.com/800x400?text=Dashboard)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Shishir Sharma**
- GitHub: [@Shis2405](https://github.com/Shis2405)
