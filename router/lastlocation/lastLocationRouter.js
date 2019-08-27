const router = require("express").Router();

const LastLocation = require("./lastLocationModel");
const restricted = require("../auth/middleware/restrictedMiddleware");
const {
  verifyLocationPostOwner,
  prepNewLocationPost
} = require("./middleware");

router.get("/", (req, res) => {
  LastLocation.getAllLocations()
    .then(location => {
      res.status(200).json(location);
    })
    .catch(err => {
      res.status(500).json({ err, message: "Error getting all locations" });
    });
});

router.get("/post/:id", (req, res) => {
  let post = req.params;
  LastLocation.findByPostId(post.id)
    .then(location => {
      return res.status(200).json({ location });
    })
    .catch(err => {
      res.status(500).json({
        err,
        message:
          "we ran into an error retreving the last none locations for this post"
      });
    });
});

router.post(
  "/post/:id",
  restricted,
  verifyLocationPostOwner,
  prepNewLocationPost,
  (req, res) => {
    LastLocation.add(req.body)
      .then(inserted => {
        res.status(201).json(inserted);
      })
      .catch(error => {
        res.status(500).json({
          error,
          message: "we ran into an error posting your last seen location"
        });
      });
  }
);

router.delete("/:id", restricted, verifyLocationPostOwner, (req, res) => {
    LastLocation.remove(req.params.id)
      .then(del => {
        res
          .status(200)
          .json({ message: "the tab has successfully been deleted" })
          .end(del);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

module.exports = router;
