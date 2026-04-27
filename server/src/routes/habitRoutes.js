const express = require('express');
const router = express.Router();
const {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  completeHabit
} = require('../controllers/habitController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.get('/', protect, getHabits);
router.post('/', protect, createHabit);
router.put('/:id', protect, updateHabit);
router.delete('/:id', protect, deleteHabit);
router.post('/:id/complete', protect, completeHabit);

module.exports = router;
