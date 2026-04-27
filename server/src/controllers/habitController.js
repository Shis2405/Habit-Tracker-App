const { db } = require('../config/firebase');

// @desc    Get all habits for logged-in user
// @route   GET /api/habits
const getHabits = async (req, res) => {
  try {
    const habitsRef = db.collection('habits');
    const snapshot = await habitsRef
      .where('userId', '==', req.user.id)
      .get();

    const habits = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(habits);
  } catch (error) {
    console.error('Get habits error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new habit
// @route   POST /api/habits
const createHabit = async (req, res) => {
  const { name, description, frequency, color } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Habit name is required' });
  }

  try {
    const newHabit = {
      userId: req.user.id,
      name,
      description: description || '',
      frequency: frequency || 'daily',
      color: color || '#6366f1',
      completedDates: [],
      createdAt: new Date().toISOString()
    };

    const habitRef = await db.collection('habits').add(newHabit);

    res.status(201).json({
      message: 'Habit created successfully',
      habit: { id: habitRef.id, ...newHabit }
    });
  } catch (error) {
    console.error('Create habit error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a habit
// @route   PUT /api/habits/:id
const updateHabit = async (req, res) => {
  const { name, description, frequency, color } = req.body;

  try {
    const habitRef = db.collection('habits').doc(req.params.id);
    const habitDoc = await habitRef.get();

    // Check habit exists
    if (!habitDoc.exists) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    // Check habit belongs to user
    if (habitDoc.data().userId !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedHabit = {
      ...(name && { name }),
      ...(description && { description }),
      ...(frequency && { frequency }),
      ...(color && { color }),
      updatedAt: new Date().toISOString()
    };

    await habitRef.update(updatedHabit);

    res.json({
      message: 'Habit updated successfully',
      habit: { id: req.params.id, ...updatedHabit }
    });
  } catch (error) {
    console.error('Update habit error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a habit
// @route   DELETE /api/habits/:id
const deleteHabit = async (req, res) => {
  try {
    const habitRef = db.collection('habits').doc(req.params.id);
    const habitDoc = await habitRef.get();

    // Check habit exists
    if (!habitDoc.exists) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    // Check habit belongs to user
    if (habitDoc.data().userId !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await habitRef.delete();

    res.json({ message: 'Habit deleted successfully' });
  } catch (error) {
    console.error('Delete habit error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Mark habit as complete for today
// @route   POST /api/habits/:id/complete
const completeHabit = async (req, res) => {
  try {
    const habitRef = db.collection('habits').doc(req.params.id);
    const habitDoc = await habitRef.get();

    // Check habit exists
    if (!habitDoc.exists) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    // Check habit belongs to user
    if (habitDoc.data().userId !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const today = new Date().toISOString().split('T')[0];
    const completedDates = habitDoc.data().completedDates || [];

    // Toggle completion — if already done today, undo it
    let updatedDates;
    if (completedDates.includes(today)) {
      updatedDates = completedDates.filter(date => date !== today);
    } else {
      updatedDates = [...completedDates, today];
    }

    await habitRef.update({ completedDates: updatedDates });

    res.json({
      message: completedDates.includes(today)
        ? 'Habit unmarked for today'
        : 'Habit marked complete for today!',
      completedDates: updatedDates
    });
  } catch (error) {
    console.error('Complete habit error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  completeHabit
};
