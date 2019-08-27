const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return (
    knex("users")
      // .del()
      .then(function() {
        // Inserts seed entries
        return knex("users").insert([
          {
            id: 1,
            username: "fixmylife",
            password: bcrypt.hashSync("password", 10),
            email: "ijd.irving@gmail.com",
            avatar: "https://avatars2.githubusercontent.com/u/32081816?s=460&v=4",
            first_name: "irving",
            last_name: "duran",
            phone: 3472655234,
            instagram: "brokenulock",
            facebook: "",
            twitter: "fixmylifenyc",
            website: "duranirving.com",
            bio: "creator of Broken U-Lock",
          },
          {
            id: 2,
            username: "irving",
            password: bcrypt.hashSync("password", 10),
            email: "ijdirving@gmail.com",
            avatar: "https://avatars2.githubusercontent.com/u/32081816?s=460&v=4",
            first_name: "irving",
            last_name: "duran",
            phone: 3472655234,
            instagram: "brokenulock",
            facebook: "",
            twitter: "fixmylifenyc",
            website: "duranirving.com",
            bio: "creator of Broken U-Lock",
          }
        ]);
      })
  );
};
