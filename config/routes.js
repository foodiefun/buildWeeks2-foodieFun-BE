const axios = require("axios");
const bcrypt = require("bcryptjs");
const formData = require('express-form-data');
const cloudinary = require('cloudinary');


const { authenticate } = require("../auth/authenticate");
const tokenService = require("../auth/token-service.js");
const reviews = require("./reviews-model.js");
const users = require("./users-model.js");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/user/:id/reviews", authenticate, getReviews);
  server.post("/api/user/review", authenticate, addReview);
  server.post('/api/review/:id/images', authenticate, formData.parse(), addPhoto)
  // server.get('/api/review/:id', authenticate, getReview)
  // server.get('/api/review/:id/foodtype', authenticate, getReviewByFoodType)
};

function register(req, res) {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12); // 2 ^ n
  user.password = hash;

  users
    .addUser(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

function login(req, res) {
  const { username, password } = req.body;

  users
    .findByUsername(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = tokenService.generateToken(user);
        res.status(200).json({ message: `Welcome ${user.username}`, token });
      } else {
        res
          .status(401)
          .json({ message: "Invalid Credentials, Please Try Again." });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

function getReviews(req, res) {
  const { id } = req.params;

  reviews
    .getReviewsByUserId(id)
    .then(reviews => {
      res.status(200).json(reviews);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error Fetching Reviews", error: err });
    });
}

function addReview(req, res) {
  const newReview = req.body;

  reviews
    .add(newReview)
    .then(review => {
      res.status(201).json(review);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error inserting review", error: err });
    });
}

// 
  const addPhoto = async ({ files, params }, res) => {
    let [images] = Object.values(files);
    image = Array.isArray(images) ? (image = images[0]) : images;
  
    if (image !== undefined) {
        try {
          const { public_id } = await cloudinary.uploader.upload(image.path);
          const localImage = await reviews.addImage(public_id, params.id);// create local image path for accessing on cloudinary and relating it to a review
          res.json({ localImage });
        } catch (error) {
          res.status(500).json({ error });
        }
    } else res.status(500).json({ error: 'No images found!' });
  }



// function getReview(req, res) {
//   const { id } = req.params;

//   reviews.findById(id)
//     .then(review => {
//       res.status(200).json(review.data.results)
//     })
//     .catch(err => {
//       res.status(500).json({ message: 'Error Fetching Reviews', error: err });
//     });
// }

// function getReviewByFoodType(req, res) {
//   const { id } = req.params;
//   const { foodType } = req.body;

//   reviews.getByFoodType(id, foodType)
//     .then(reviews => {
//       res.status(200).json(reviews.data.results)
//     })
// }
