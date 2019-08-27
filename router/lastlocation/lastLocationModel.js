const db = require("../../database/dbConfig");

module.exports = {
  add,
  remove,
  getAllLocations,
  findByPostId,
  findById
};
function getAllLocations() {
  return db("last_location")
    .join("posts", "last_location.post_id", "=", "posts.id")
    .join("users", "last_location.user_id", "=", "users.id")
    .select(
      { username: "users.username" },
      { user_id: "users.id" },
      { post_id: "posts.id" },
      { last_location_id: "last_location.id" },
      "last_location.last_seen_location",
      "last_location.last_latitude",
      "last_location.last_longitude",
      "last_location.last_date_seen",
      "last_location.last_time_seen",
      "last_location.created_at",
      "last_location.updated_at"
    );
}

function findByPostId(id) {
  return db("last_location")
    .where("last_location.post_id", id)
    .join("posts", "last_location.post_id", "=", "posts.id")
    .join("users", "last_location.user_id", "=", "users.id")
    .select(
      { username: "users.username" },
      { user_id: "users.id" },
      { post_id: "posts.id" },
      { last_location_id: "last_location.id" },
      "last_location.last_seen_location",
      "last_location.last_latitude",
      "last_location.last_longitude",
      "last_location.last_date_seen",
      "last_location.last_time_seen",
      "last_location.created_at",
      "last_location.updated_at"
    );
}

function findById(id){
  return db("last_location")
  .where("last_location.id", id)
  .first()
  .join("posts", "last_location.post_id", "=", "posts.id")
  .join("users", "last_location.user_id", "=", "users.id")
  .select(
    { username: "users.username" },
    { user_id: "users.id" },
    { post_id: "posts.id" },
    { last_location_id: "last_location.id" },
    "last_location.last_seen_location",
    "last_location.last_latitude",
    "last_location.last_longitude",
    "last_location.last_date_seen",
    "last_location.last_time_seen",
    "last_location.created_at",
    "last_location.updated_at"
  );
}

async function add(location) {
  const [id] = await db("last_location").insert(location, "id");

  return findById(id);
}

function remove(id) {
  return db("last_location")
    .where({ id })
    .del();
}
