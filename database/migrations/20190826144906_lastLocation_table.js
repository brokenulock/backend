
exports.up = function(knex) {
  return knex.schema.createTable("last_location", tbl => {
    tbl
    .integer("post_id")
    .references("id")
    .inTable("posts")
    .onDelete("CASCADE")
    .onUpdate("CASCADE")
    .notNullable();

    tbl
    .integer("user_id")
    .references("id")
    .inTable("users")
    .onDelete("CASCADE")
    .onUpdate("CASCADE")
    .notNullable();

    tbl.increments();

    tbl.string("last_seen_location", 128).notNullable();

    tbl.float("last_latitude", 128).notNullable();

    tbl.float("last_longitude", 128).notNullable();

    tbl.date("last_date_seen");

    tbl.time("last_time_seen");

    tbl.timestamps(true, true);
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("last_location");
};
