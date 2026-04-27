const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

require('./src/config/firebase');

const authRoutes = require('./src/routes/authRoutes');
const habitRoutes = require('./src/routes/habitRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Habit Tracker API is running 🔥' });
});

app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));