const db = require("../../database/dbConfig");

module.exports = {
  getUsers,
  // find,
  findBy,
  findById,
  update,
  remove
};

function getUsers() {
  console.log(db("users"))

  return db("users");
}

// function find() {
//   return db("users").select(
//     "id",
//     "username",
//     "created_at",
//     "updated_at"
//   );
// }

function findBy(filter) {
  return db("users").where(filter);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first().select(
      "id",
      "username",
      "email",
      "avatar",
      "first_name",
      "last_name",
      "phone",
      "instagram",
      "facebook",
      "twitter",
      "website",
      "bio",
      "created_at",
      "updated_at"
    );
}

function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        return findById(id);
      } else {
        return null;
      }
    });
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}
