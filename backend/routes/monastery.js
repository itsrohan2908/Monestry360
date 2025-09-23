const express = require('express');
const router = express.Router();
const Monastery = require('../models/Monastery');

router.get('/', async (req, res) => {
  try {
    const monasteries = await Monastery.find();
    res.json(monasteries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const monastery = await Monastery.findById(req.params.id)
    if (!monastery) return res.status(404).json({ message: 'Monastery not found' })
    res.json(monastery)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router;