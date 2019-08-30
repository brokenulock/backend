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
            username: "fixmylife",
            email: "fixmylife@gmail.com",
            avatar: "https://avatars2.githubusercontent.com/u/32081816?s=460&v=4",
            first_name: "irving",
            last_name: "duran",
            phone: "3472655235",
            instagram: "fixmylifenyc",
            twitter: "fixmylifenyc",
            website: "duranirving.com",
            bio: "creator of Broken U-Lock",
          },
          {
            username: "irving",
            email: "irving@gmail.com",
            avatar: "https://github.com/brokenulock/frontend/blob/master/src/bulfmlimg/default-avatar.png?raw=true",
            first_name: "irving",
            last_name: "duran",
            instagram: "duranfixed",
            twitter: "fixmylifenyc",
            website: "duranirving.com",
            bio: "creator of Broken U-Lock",
          },
          {
            username: "jimmyhedge",
            email: "jimmy@gmail.com",
            avatar: "https://github.com/brokenulock/frontend/blob/master/src/bulfmlimg/default-avatar.png?raw=true",
            first_name: "jimmy",
            last_name: "duran",
            twitter: "fixmylifenyc",
            website: "duranirving.com"
          },
          {
            username: "brokenulock",
            email: "contact@duranirving.com",
            avatar: "https://github.com/brokenulock/frontend/blob/master/src/bulfmlimg/brokenulocklogo.png?raw=true",
            first_name: "irving",
            last_name: "duran",
            phone: "3472655234",
            instagram: "brokenulock.app",
            twitter: "fixmylifenyc",
            website: "brokenulock.com",
            bio: "creator of Broken U-Lock",
          }
        ]);
      })
  );
};
