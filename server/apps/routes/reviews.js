const express = require('express');
const router = express.Router();
const Review = require('../models/reviewModel');

// GET all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new review
router.post('/', async (req, res) => {
  try {
    console.log('BODY RECEIVED:', req.body);
    const { name, rating, comment } = req.body;

    if (!name || !rating) return res.status(400).json({ error: 'Name and rating required' });

    const newReview = new Review({ name, rating: Number(rating), comment });
    await newReview.save();

    console.log('REVIEW SAVED:', newReview);
    res.status(201).json(newReview);
  } catch (err) {
    console.error('POST /reviews ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

// PUT (update) review
router.put('/:id', async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReview) return res.status(404).json({ error: 'Review not found' });
    res.json(updatedReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE review
router.delete('/:id', async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) return res.status(404).json({ error: 'Review not found' });
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
