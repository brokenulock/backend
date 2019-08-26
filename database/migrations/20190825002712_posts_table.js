exports.up = function(knex) {
  return knex.schema.createTable("posts", tbl => {
    tbl
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .notNullable();

    tbl.increments();

    tbl.string("image").notNullable();

    tbl.string("brand", 128);

    tbl.string("model", 128);

    tbl.string("year", 128);

    tbl.string("serial_number", 128);

    tbl.string("description", 128).notNullable();

    tbl.date("date_stolen");

    tbl.time("time_stolen");

    tbl.string("location", 128);

    tbl.float("latitude", 128);

    tbl.float("longitude", 128);

    tbl.string("reward", 128);

    tbl.boolean("found");

    tbl.timestamps(true, true);

    // update last seen
    tbl.string("last_seen_location", 128);

    tbl.string("last_latitude", 128);

    tbl.string("last_longitude", 128);

    tbl.date("last_date_seen");

    tbl.time("last_time_seen");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("posts");
};