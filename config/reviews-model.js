const express = require('express');
const db = require('../data/dbConfig.js');

module.exports = {
  addReview,
  find,
  findBy,
  findById,
  getAllReviews,
  deleteReview,
  getReviewByUserId,
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

function getAllReviews() {
  return db('reviews')
}

function deleteReview(id) {
  return db('reviews')
    .where('id', id)
    .del();
}

function getReviewByUserId(id) {
  return db('reviews')
    .where('userId', id)
}