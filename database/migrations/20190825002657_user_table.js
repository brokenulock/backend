exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();

    tbl
      .string("username", 128)
      .notNullable()
      .unique();

    tbl.string("password", 128).notNullable();

    tbl
      .string("email", 128)
      .notNullable()
      .unique();

    tbl.string("avatar");

    tbl.string("first_name", 128);

    tbl.string("last_name", 128);

    tbl.float("phone", 128);

    tbl.string("instagram", 128);

    tbl.string("facebook", 128);

    tbl.string("twitter", 128);

    tbl.string("website", 128);

    tbl.string("bio", 1000);

    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
