const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genre, validateGenres } = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/another', (req, res, next) => {});

// Get all genre
router.get('/', async (req, res) => {
  // throw new Error('Could not get genres.');
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

// Add a genre
router.post('/', auth, async (req, res) => {
  const { error } = validateGenres(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

// Get specific genre
router.get('/:id', validateObjectId,async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) {
    return res.status(404).send('The Genre didnt exist');
  }
  res.send(genre);
});

// Update genre
router.put('/:id', [auth, validateObjectId], async (req, res) => {
  const { error } = validateGenres(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!genre) return res.status(404).send('The Genre didnt exist');

  res.send(genre);
});

//Delete genre
router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) {
    return res.status(404).send('The Genre didnt exist');
  }

  res.send(genre);
});

module.exports = router;
