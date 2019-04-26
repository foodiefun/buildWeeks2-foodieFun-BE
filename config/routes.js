const axios = require('axios');
const bcrypt = require('bcryptjs');

const { authenticate } = require('../auth/authenticate');
const tokenService = require('../auth/token-service.js');
const reviews = require('./reviews-model.js');
const users = require('./users-model.js');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/reviews', authenticate, getReviews);
};

function register(req, res) {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12); // 2 ^ n
  user.password = hash;

  users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

function login(req, res) {
  const { username, password } = req.body;

  users.findBy({ username })
    .first()
    .then( user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = tokenService.generateToken(user);
        res.status(200).json({ message: `Welcome ${user.username}`, token });
      }
      else {
        res.status(401).json({ message: 'Invalid Credentials, Please Try Again.' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

function getReviews(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
