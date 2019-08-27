exports.seed = function(knex) {
  // Deletes ALL existing entries
  return (
    knex("notifications")
      // .del()
      .then(function() {
        // Inserts seed entries
        return knex("notifications").insert([
          {
            id: 1,
            post_id: 1,
            comment_id: 1,
            sender_username: "irving",
            sender_id: 2,
            receiver_username: "fixmylife",
            receiver_id: 1,
            seen: 0
          },
          {
            id: 2,
            post_id: 1,
            comment_id: 2,
            sender_username: "fixmylife",
            sender_id: 1,
            receiver_username: "irving",
            receiver_id : 2,
            seen: 0
          },
          {
            id: 3,
            post_id: 1,
            comment_id: 3,
            sender_username: "irving",
            sender_id: 2,
            receiver_username: "fixmylife",
            receiver_id : 1,
            seen: 0
          }
        ]);
      })
  );
};
