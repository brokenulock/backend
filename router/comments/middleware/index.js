const Comment = require("../commentsModel");

module.exports = {
  verifyCommentOwner,
  prepNewComment
};

function prepNewComment(req, res, next) {
  if (req.body.comment) {
    req.body.post_id = req.params.id
    req.body.user_id = req.decodedToken.id
    next();
  } else {
    res.status(400).json({ message: "Posts must contain a comment" });
  }
}

async function verifyCommentOwner(
  req,
  res,
  next
) {
  try {
    const { user_id } = await Comment.findById(req.params.id);
    user_id === req.decodedToken.id
      ? next()
      : res.status(400).json({ message: "User does not own that post" });
  } catch (err) {
    // console.log("No post at ID: delete");
    res.status(400).json({ message: "No post with that ID" });
  }
}
