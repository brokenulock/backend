const Notification = require("../notificationsModel");
const User = require("../../users/usersModel");
const Comment = require("../../comments/commentsModel");
const Posts = require("../../posts/postsModel");

module.exports = {
  prepNewNotification,
  prepNewCommentNotification,
  verifyNotificationExist,
  verifyNotificationOwner,
  verifyNotificationsExist
};

function prepNewNotification(req, res, next) {
  req.body.comment_id = req.params.id;
  req.body.sender_id = req.decodedToken.id;
  req.body.sender_username = req.decodedToken.username;
  req.body.seen = false;
  Comment.findById(req.params.id).then(info => {
    req.body.post_id = info.post_id;
  });
  if (req.body.receiver_id) {
    User.findById(req.body.receiver_id).then(info => {
      req.body.receiver_username = info.username;
    });
  }
  next();
}

function prepNewCommentNotification(req, res, next) {
  notification = {};
  notification.sender_id = req.decodedToken.id;
  notification.sender_username = req.decodedToken.username;
  notification.seen = false;
  notification.post_id = req.params.id;
  if (req.body.receiver_id) {
    User.findById(req.body.receiver_id).then(info => {
      notification.receiver_username = info.username;
      notification.receiver_id = req.body.receiver_id;
    });
  } else {
    Posts.findById(req.params.id).then(info => {
      notification.receiver_username = info.username;
      notification.receiver_id = info.user_id;
    });
  }
  next();
}

async function verifyNotificationOwner(req, res, next) {
  try {
    const { receiver_id} = await Notification.findById(req.params.id);
    if(receiver_id == req.decodedToken.id){
      next()
    } else {
      res
          .status(400)
          .json({  message: "User does not own that notification" });
    }
  } catch (err) {
    // console.log("No post at ID: delete");
    res.status(400).json({ message: "No notification with that ID" });
  }
}

async function verifyNotificationExist(req, res, next) {
  try {
    const { notification_id } = await Notification.findById(req.params.id);
    notification_id
      ? next()
      : res.status(400).json({ message: "No Notification with that ID" });
  } catch (err) {
    res.status(400).json({ message: "No Notification with that ID" });
  }
}

function verifyNotificationsExist(req, res, next) {
  Notification.getAllNotifications().then(notification => {
    if (notification <= 0) {
      res.status(400).json({ message: "No notifications" });
    } else {
      next();
    }
  });
}
