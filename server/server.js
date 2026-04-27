const express = require('express');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

require('./src/config/firebase');

const authRoutes = require('./src/routes/authRoutes');
const habitRoutes = require('./src/routes/habitRoutes');

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://habit-tracker-app-three-chi.vercel.app'
  ],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Habit Tracker API is running 🔥' });
});

app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));