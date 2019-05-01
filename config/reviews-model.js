const express = require("express");
const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  getAllReviews,
  deleteReview,
  getReviewsByUserId,
  getByFoodType,
  addImage
};

async function addImage(pid, reviewId) {
  const photo = await db("reviews")
  .where("id", reviewId)
  .update({ photo: pid })

  return findById(reviewId)
}

function find() {
  return db("reviews");
}

async function findBy(filter) {
  return await db("reviews").where(filter);
}

async function add(review) {
  const [id] = await db("reviews").insert(review);

  return findById(id);
}

async function findBy(id) {
  return await db("reviews")
    .where({ id })
    .first();
}

async function getAllReviews() {
  return await db("reviews");
}

async function deleteReview(id) {
  return await db("reviews")
    .where("id", id)
    .del();
}

async function getReviewsByUserId(id) {
  return db("reviews").where("userId", id);
}

async function findById(id) {
  return await db("reviews")
    .where({ id })
    .first();
}

async function getByFoodType(id, foodtype) {
  return await db("reviews").where({
    userId: id,
    foodType: foodtype
  });
}
