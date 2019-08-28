const db = require("../../database/dbConfig");

module.exports = {
  add,
  remove,
  removeAllUsersNotifications,
  update,
  findById,
  getAllNotifications,
  findByReceiverId,
  findBySenderId,
  removeAll
};

function getAllNotifications() {
  return (
    db("notifications")
      .join("posts", "notifications.post_id", "=", "posts.id")
      .join("comments", "notifications.comment_id", "=", "comments.id")
      .join("users", "comments.user_id", "=", "users.id")
      // .join("users", "posts.user_id", "=", "users.id")

      .select(
        { notification_id: "notifications.id" },
        { sender_username: "users.username" },
        { sender_id: "comments.user_id" },
        "notifications.receiver_username",
        "notifications.receiver_id",
        { post_id: "posts.id" },
        { comment_id: "comments.id" },
        "comments.comment",
        "notifications.seen",
        "notifications.created_at",
        "notifications.updated_at"
      )
  );
}

function findByReceiverId(id) {
  return db("notifications")
    .where("notifications.receiver_id", id)
    .join("posts", "notifications.post_id", "=", "posts.id")
    .join("comments", "notifications.comment_id", "=", "comments.id")
    .join("users", "comments.user_id", "=", "users.id")
    .select(
      { notification_id: "notifications.id" },
      "notifications.receiver_username",
      "notifications.receiver_id",
      { sender_username: "users.username" },
      { sender_id: "comments.user_id" },
      { post_id: "posts.id" },
      { comment_id: "comments.id" },
      "comments.comment",
      "notifications.seen",
      "notifications.created_at",
      "notifications.updated_at"
    );
}

function findBySenderId(id) {
  return db("notifications")
    .where("notifications.sender_id", id)
    .join("posts", "notifications.post_id", "=", "posts.id")
    .join("comments", "notifications.comment_id", "=", "comments.id")
    .join("users", "comments.user_id", "=", "users.id")
    .select(
      { notification_id: "notifications.id" },
      { sender_username: "users.username" },
      { sender_id: "comments.user_id" },
      "notifications.receiver_username",
      "notifications.receiver_id",
      { post_id: "posts.id" },
      { comment_id: "comments.id" },
      "comments.comment",
      "notifications.seen",
      "notifications.created_at",
      "notifications.updated_at"
    );
}

function findById(id) {
  return db("notifications")
    .where("notifications.id", id)
    .first()
    .join("posts", "notifications.post_id", "=", "posts.id")
    .join("comments", "notifications.comment_id", "=", "comments.id")
    .join("users", "comments.user_id", "=", "users.id")
    .select(
      { notification_id: "notifications.id" },
      { sender_username: "users.username" },
      { sender_id: "comments.user_id" },
      "notifications.receiver_username",
      "notifications.receiver_id",
      { post_id: "posts.id" },
      { comment_id: "comments.id" },
      "comments.comment",
      "notifications.seen",
      "notifications.created_at",
      "notifications.updated_at"
    );
}

async function add(notification) {
  const [id] = await db("notifications").insert(notification, "id");

  return findById(id);
}

function update(id, changes) {
  return db("notifications")
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
  return db("notifications")
    .where({ id })
    .del();
}

function removeAllUsersNotifications(id) {
  return db("notifications")
    .where("notifications.receiver_id", id)
    .del();
}

function removeAllUsersNotifications(id) {
  return db("notifications")
    .where("notifications.receiver_id", id)
    .del();
}

function removeAll() {
  return db("notifications")
    .del();
}