const express = require('express');
const db = require('../data/dbConfig.js');

module.exports = {
  addReview,
  find,
  findBy,
  findById,
  getAllReviews,
  deleteReview,
  getAllReviewsByUserId,
  getByFoodType,
};
 
function find() {
  return db('reviews');
}

function findBy(filter) {
  return db('reviews').where(filter);
}

async function addReview(review) {
  const [id] = await db('reviews').insert(review);

  return findById(id);
}

function findBy(id) {
  return db('reviews')
    .where({ id })
    .first();
}

async function getAllReviews() {
  return db('reviews')
}

async function deleteReview(id) {
  return db('reviews')
    .where('id', id)
    .del();
}

async function getAllReviewsByUserId(id) {
  return db('reviews')
    .where('userId', id)
}

async function findById(id) {
  return db('reviews')
    .where({ id })
    .first();
}

async function getByFoodType(id, foodtype) {
  return db('reviews')
  .where({
    userId: id,
    foodType:  foodtype
  })
}