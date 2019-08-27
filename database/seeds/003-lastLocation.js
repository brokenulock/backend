exports.seed = function(knex) {
  // Deletes ALL existing entries
  return (
    knex("last_location")
      // .del()
      .then(function() {
        // Inserts seed entries
        return knex("last_location").insert([
          {
            user_id: 1,
            post_id: 1,
            id: 1,
            last_seen_location: "Bushwick, Brooklyn, NY",
            last_latitude: 40.6958,
            last_longitude: -73.9171,
            last_date_seen: "2018-11-29T00:00:00.000Z",
            last_time_seen: "1970-01-01T22:20:00.000Z",
          },
          {
            user_id: 1,
            post_id: 1,
            id: 2,
            last_seen_location: "Bushwick, Brooklyn, NY",
            last_latitude: 40.695338,
            last_longitude: -73.9133371,
            last_date_seen: "2018-11-29T00:00:00.000Z",
            last_time_seen: "1970-01-01T22:20:00.000Z",
          },

        ]);
      })
  );
};
