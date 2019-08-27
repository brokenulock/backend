const db = require("../../database/dbConfig");

module.exports = {
  add,
  remove,
  update,
  getAllComments,
  findById,
  findByPostId,
  findByUserId
};

function getAllComments() {
  return db("comments")
    .join("posts", "comments.post_id", "=", "posts.id")
    .join("users", "comments.user_id", "=", "users.id")
    .select(
      { username: "users.username" },
      {user_id: "user.id"},
      { post_id: "posts.id" },
      { comment_id: "comments.id" },
      "comments.comment",
      "comments.created_at",
      "comments.updated_at"
    );
}

function findById(id) {
  return db("comments")
    .where("comments.id", id)
    .first()
    .join("posts", "comments.post_id", "=", "posts.id")
    .join("users", "comments.user_id", "=", "users.id")
    .select(
      { username: "users.username" },
      "comments.user_id",
      { post_id: "posts.id" },
      { comment_id: "comments.id" },
      "comments.comment",
      "comments.created_at",
      "comments.updated_at"
    );
}

function findByPostId(id) {
  return db("comments")
    .where("comments.post_id", id)
    .join("posts", "comments.post_id", "=", "posts.id")
    .join("users", "comments.user_id", "=", "users.id")
    .select(
      { username: "users.username" },
      "comments.user_id",
      { post_id: "posts.id" },
      { comment_id: "comments.id" },
      "comments.comment",
      "comments.created_at",
      "comments.updated_at"
    );
}

function findByUserId(id) {
  return db("comments")
    .where("comments.user_id", id)
    .join("posts", "comments.post_id", "=", "posts.id")
    .join("users", "comments.user_id", "=", "users.id")
    .select(
      { username: "users.username" },
      "comments.user_id",
      { post_id: "posts.id" },
      { comment_id: "comments.id" },
      "comments.comment",
      "comments.created_at",
      "comments.updated_at"
    );
}

async function add(comment) {
  const [id] = await db("comments").insert(comment, "id");

  return findById(id);
}

function remove(id) {
  return db("comments")
    .where({ id })
    .del();
}

function update(id, changes) {
  return db("comments")
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
