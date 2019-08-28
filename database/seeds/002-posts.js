exports.seed = function(knex) {
  // Deletes ALL existing entries
  return (
    knex("posts")
      // .del()
      .then(function() {
        // Inserts seed entries
        return knex("posts").insert([
          {
            user_id: 1,
            id: 1,
            image:
              "https://cdn.shopify.com/s/files/1/0232/3305/products/State_Bicycle_Cyclocross_SSCX_Thunderbird2.JPG?v=1565719092",
            brand: "State Bicycle",
            model: "Thunderbird",
            year: "2015",
            serial_number: "4454626326325443",
            description: "example post",
            date_stolen: "2018-11-29T00:00:00.000Z",
            time_stolen: "1970-01-01T22:20:00.000Z",
            location: "Bushwick, Brooklyn, NY",
            latitude: 40.6958,
            longitude: -73.9171,
            reward: "I'll buy you a beer",
            found: true,
            last_seen_location: "Bushwick, Brooklyn, NY",
            last_latitude: 40.695338,
            last_longitude: -73.9133371,
            last_date_seen: "2018-11-29T00:00:00.000Z",
            last_time_seen: "1970-01-01T22:20:00.000Z"
          },
          {
            user_id: 2,
            id: 2,
            image:
              "https://cdn.shopify.com/s/files/1/0232/3305/products/state_bicycle_co_white_ghoul_fixie_1_1024x1024.jpg?v=1512236244",
            brand: "State Bicycle",
            model: "core-line",
            serial_number: "4454626326325443",
            description:
              "I usually leave my bike in the hall way of my home. someone must have entered and stole it while slept.",
            date_stolen: "2018-11-29T00:00:00.000Z",
            time_stolen: "1970-01-01T22:20:00.000Z",
            location: "Bushwick, Brooklyn, NY",
            latitude: 42.6958,
            longitude: -73.9171,
            reward: "I'll buy you a beer",
            found: true,
            last_seen_location: "Bushwick, Brooklyn, NY",
            last_latitude: 40.695338,
            last_longitude: -73.9133371,
            last_date_seen: "2018-11-29T00:00:00.000Z",
            last_time_seen: "1970-01-01T22:20:00.000Z"
          },
          {
            user_id: 3,
            id: 3,
            image:
              "https://cdn.shopify.com/s/files/1/0232/3305/products/state_bicycle_co_matte_black_wulf_fixie_1_1024x1024.jpg?v=1484343662",
            brand: "State Bicycle",
            model: "core-line",
            serial_number: "44546342426326325443",
            description:
              "this bike was not stolen outside my home. It was u locked and the person cut did not cut the lock.",
            date_stolen: "2018-11-29T00:00:00.000Z",
            time_stolen: "1970-01-01T22:20:00.000Z",
            location: "Bushwick, Brooklyn, NY",
            latitude: 40.58,
            longitude: -73.71,
            found: true,
            last_seen_location: "Bushwick, Brooklyn, NY",
            last_latitude: 40.6945338,
            last_longitude: -73.913371,
            last_date_seen: "2018-11-29T00:00:00.000Z",
            last_time_seen: "1970-01-01T22:20:00.000Z"
          }
        ]);
      })
  );
};
