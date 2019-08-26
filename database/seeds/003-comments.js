exports.seed = function(knex) {
  // Deletes ALL existing entries
  return (
    knex("comments")
      // .del()
      .then(function() {
        // Inserts seed entries
        return knex("comments").insert([
          {
            user_id: 1,
            post_id: 1,
            id: 1,
            comment: "this is a test comment on a post"
          }
        ]);
      })
  );
};
