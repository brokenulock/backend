exports.up = function(knex) {
  return knex.schema.createTable("notifications", tbl => {
    tbl
      .integer("post_id")
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tbl
      .integer("comment_id")
      .references("id")
      .inTable("comments")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tbl.string("sender_username").notNullable();

    tbl.integer("sender_id").notNullable();

    tbl.string("receiver_username");

    tbl.string("alert", 1000);

    tbl.integer("receiver_id");

    tbl.increments();

    tbl.boolean("seen").notNullable();

    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("notifications");
};
