// routes/jobs.js
const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// POST a new job
router.post('/add', async (req, res) => {
  const { postedBy } = req.body;

  if (!postedBy) {
    return res.status(400).json({ error: 'postedBy is required. Please login.' });
  }

  try {
    const newJob = new Job(req.body);
    const savedJob = await newJob.save();

    res.status(201).json(savedJob);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ postedAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a job
router.delete('/:id', async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting job', error: err });
  }
});

module.exports = router;
