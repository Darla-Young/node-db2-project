exports.up = function (knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments() // id
    tbl.text('vin') // vin
      .unique()
      .notNullable()
    tbl.text('make') // make
      .notNullable()
    tbl.text('model') // model
      .notNullable()
    tbl.decimal('mileage') // mileage
      .notNullable()
    tbl.text('title') // title
    tbl.text('transmission') // tranny
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars')
};
