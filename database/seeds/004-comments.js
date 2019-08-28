
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return (
    knex("comments")
      // .del()
      .then(function() {
        // Inserts seed entries
        return knex("comments").insert([
          {
            user_id: 2,
            post_id: 1,
            comment: "hey i saw your bike"
          },
          {
            user_id: 1,
            post_id: 1,
            comment: "omg where??"
          },
          {
            user_id: 2,
            post_id: 1,
            comment: "In queens!!"
          },
          {
            user_id: 3,
            post_id: 2,
            comment: "sorry your bike for stolen i will keep an eye out"
          },
          {
            user_id: 2,
            post_id: 3,
            comment: "sorry your bike for stolen i will keep an eye out"
          }
        ]);
      })
  );
};
