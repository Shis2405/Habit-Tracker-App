import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getHabits, createHabit, deleteHabit, completeHabit } from '../services/api';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState({ name: '', description: '', color: '#6366f1' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const res = await getHabits();
      setHabits(res.data);
    } catch (err) {
      setError('Failed to load habits');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newHabit.name) return;
    try {
      const res = await createHabit(newHabit);
      setHabits([...habits, res.data.habit]);
      setNewHabit({ name: '', description: '', color: '#6366f1' });
    } catch (err) {
      setError('Failed to create habit');
    }
  };

  const handleComplete = async (id) => {
    try {
      const res = await completeHabit(id);
      setHabits(habits.map(h =>
        h.id === id ? { ...h, completedDates: res.data.completedDates } : h
      ));
    } catch (err) {
      setError('Failed to update habit');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteHabit(id);
      setHabits(habits.filter(h => h.id !== id));
    } catch (err) {
      setError('Failed to delete habit');
    }
  };

  const isCompletedToday = (habit) => {
    return habit.completedDates?.includes(today);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🌱 Habit Tracker</h1>
        <div className="user-info">
          <span>Hi, {user?.name}!</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </header>

      {error && <p className="error">{error}</p>}

      {/* Add Habit Form */}
      <div className="add-habit-form">
        <h2>Add New Habit</h2>
        <form onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Habit name (e.g. Exercise)"
            value={newHabit.name}
            onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={newHabit.description}
            onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
          />
          <div className="color-picker">
            <label>Color:</label>
            <input
              type="color"
              value={newHabit.color}
              onChange={(e) => setNewHabit({ ...newHabit, color: e.target.value })}
            />
          </div>
          <button type="submit">+ Add Habit</button>
        </form>
      </div>

      {/* Habits List */}
      <div className="habits-list">
        <h2>Today's Habits</h2>
        {loading ? (
          <p>Loading habits...</p>
        ) : habits.length === 0 ? (
          <p className="empty">No habits yet. Add your first one above! 🎯</p>
        ) : (
          habits.map(habit => (
            <div
              key={habit.id}
              className={`habit-card ${isCompletedToday(habit) ? 'completed' : ''}`}
              style={{ borderLeft: `4px solid ${habit.color}` }}
            >
              <div className="habit-info">
                <h3>{habit.name}</h3>
                {habit.description && <p>{habit.description}</p>}
                <span className="frequency">{habit.frequency}</span>
              </div>
              <div className="habit-actions">
                <button
                  className={`complete-btn ${isCompletedToday(habit) ? 'done' : ''}`}
                  onClick={() => handleComplete(habit.id)}
                >
                  {isCompletedToday(habit) ? '✅ Done' : '⬜ Mark Done'}
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(habit.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
