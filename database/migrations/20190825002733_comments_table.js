exports.up = function(knex) {
  return knex.schema.createTable("comments", tbl => {
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

    tbl.string("comment", 1000).notNullable();

    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("comments");
};
