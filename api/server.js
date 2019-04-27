const express = require('express');

const reviews = require('../reviews/reviewsModel.js');

const server = express();
const multer = require('multer');
const cors = require('cors');

server.use(express.json());
server.use(cors());

server.get('/', async (req, res) => {
  res.status(200).json({ message: 'I am Son of Hal and I am always watching!' });
});

server.get('/reviews', async (req, res) => {
  const rows = await reviews.get();

  res.status(200).json(rows);
});

module.exports = server;