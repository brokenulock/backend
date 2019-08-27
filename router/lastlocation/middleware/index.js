const Location = require("../lastLocationModel");

module.exports = {
  verifyLocationPostOwner,
  prepNewLocationPost
};

function prepNewLocationPost(req, res, next) {
    if (req.body.last_seen_location) {
      req.body.post_id = req.params.id
      req.body.user_id = req.decodedToken.id
      next();
    } else {
      res.status(400).json({ message: "Posts must contain a address, lat and lon" });
    }
  }
  
  async function verifyLocationPostOwner(
    req,
    res,
    next
  ) {
    try {
      const { user_id } = await Location.findById(req.params.id);
      user_id === req.decodedToken.id
        ? next()
        : res.status(400).json({ message: "User does not own that location post" });
    } catch (err) {
      // console.log("No post at ID: delete");
      res.status(400).json({ message: "No location with that ID" });
    }
  }