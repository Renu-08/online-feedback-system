// routes/feedback.js
const express = require('express');
const Feedback = require('../models/Feedback');

const router = express.Router();

// Submit Feedback
router.post('/', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted', feedback });
  } catch (error) {
    console.error('Error saving feedback:', error.message);
    res.status(400).json({ message: 'Error submitting feedback', error });
  }
});

module.exports = router;
