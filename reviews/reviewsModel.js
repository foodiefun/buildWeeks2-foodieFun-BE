const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  get,
  findById,
};

async function insert(review) {
  // all id's returned back in an array, so destructure to only return the id of the new insert object
  const [ id ] = await db('reviews').insert(review);

  return db('reviews').where({id}).first();
}

function get() {
  return db('reviews');
}

async function update(id, changes) {
  return null;
}

function remove(id) {
  return null;
}


function findById(id) {
  return null;
}