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
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
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
            avatar: "https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            first_name: "jimmy",
            last_name: "duran",
            twitter: "fixmylifenyc",
            website: "duranirving.com"
          },
          {
            username: "jess",
            email: "contact@duranirving.com",
            avatar: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            first_name: "jesss",
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
