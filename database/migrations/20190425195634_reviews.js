exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews', tbl => {
    tbl.increments();

    tbl
    .integer('userId')
    .unsigned()
    .references('id')
    .inTable('users')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')

    tbl.string('restaurantName', 128).notNullable();
    tbl.string('photo')
    tbl.string('foodName', 128).notNullable();
    tbl.string('foodType').notNullable();
    tbl.string('comments', 255)
    tbl.integer('rating')
    tbl.integer('price')
    tbl.string('date')
    tbl.string('restaurantInfo', 255)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('actions');
};
