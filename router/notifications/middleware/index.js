const Notification = require("../notificationsModel");
const User = require("../../users/usersModel");
const Comment = require("../../comments/commentsModel")

module.exports = {
  prepNewNotification
  // verifyNotificationExist
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
