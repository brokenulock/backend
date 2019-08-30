const db = require("../../database/dbConfig");

module.exports = {
  add,
  remove,
  update,
  getUserPosts,
  getAllPosts,
  findById
};

function getAllPosts() {
  return db("posts")
    .join("users", "posts.user_id", "=", "users.id")
    .select(
      { username: "users.username" },
      "user_id",
      "users.avatar",
      "users.email",
      "users.phone",
      "users.instagram",
      "users.facebook",
      "users.twitter",
      { post_id: "posts.id" },
      "image",
      "manufacturer",
      "size",
      "model",
      "year",
      "serial_number",
      "description",
      "date_stolen",
      "time_stolen",
      "location",
      "latitude",
      "longitude",
      "reward",
      "found",
      "posts.created_at",
      "posts.updated_at",
      "last_seen_location",
      "last_latitude",
      "last_longitude",
      "last_date_seen",
      "last_time_seen"
    );
}

function findById(id) {
  return db("posts")
    .where("posts.id", id)
    .first()
    .join("users", "posts.user_id", "=", "users.id")
    .select(
      { username: "users.username" },
      "user_id",
      "users.avatar",
      "users.email",
      "users.phone",
      "users.instagram",
      "users.facebook",
      "users.twitter",
      { post_id: "posts.id" },
      "image",
      "manufacturer",
      "size",
      "model",
      "year",
      "serial_number",
      "description",
      "date_stolen",
      "time_stolen",
      "location",
      "latitude",
      "longitude",
      "reward",
      "found",
      "posts.created_at",
      "posts.updated_at",
      "last_seen_location",
      "last_latitude",
      "last_longitude",
      "last_date_seen",
      "last_time_seen"
    );
}

function getUserPosts(id) {
  return db("posts")
    .where("posts.user_id", id)
    .join("users", "posts.user_id", "=", "users.id")
    .select(
      { username: "users.username" },
      "user_id",
      "users.avatar",
      "users.email",
      "users.phone",
      "users.instagram",
      "users.facebook",
      "users.twitter",
      { post_id: "posts.id" },
      "image",
      "manufacturer",
      "size",
      "model",
      "year",
      "serial_number",
      "description",
      "date_stolen",
      "time_stolen",
      "location",
      "latitude",
      "longitude",
      "reward",
      "found",
      "posts.created_at",
      "posts.updated_at",
      "last_seen_location",
      "last_latitude",
      "last_longitude",
      "last_date_seen",
      "last_time_seen"
    );
}

async function add(post) {
  const [id] = await db("posts").insert(post, "id");

  return findById(id);
}

function remove(id) {
  return db("posts")
    .where({ id })
    .del();
}

function update(id, changes) {
  return db("posts")
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


