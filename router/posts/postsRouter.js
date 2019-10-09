const router = require("express").Router();

const Posts = require("./postsModel");
const Comments = require("../comments/commentsModel");
const LastLocation = require("../lastlocation/lastLocationModel");
const restricted = require("../auth/middleware/restrictedMiddleware");
const {
  verifyPostOwner,
  prepNewPost,
  verifyPostExist
} = require("./middleware");

router.get("/", (req, res) => {
  Posts.getAllPosts()
    .then(post => {
      // post.forEach(postInfo => {
      //   LastLocation.findByPostId(postInfo.post_id).then(locations => {
      //     postInfo.all_seen_locations = locations;
      //     return res.status(200).json(post);
      //   });
      // });
      res.status(200).json(post);
    })
    .catch(error => {
      res
        .status(500)
        .json({ req, error, message: "error retrieving all posts" });
    });
});

router.get("/:id", verifyPostExist, (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      LastLocation.findByPostId(req.params.id)
        .then(locations => {
          if (!locations) {
            req.body.all_seen_locations = "no locations";
          } else {
            post.all_seen_locations = locations;
          }
        })
        .catch(err => {
          res.status(200).json(post);
        });
      Comments.findByPostId(req.params.id)
        .then(comment => {
          if (!comment) {
            req.body.comments = "no comments";
            return res.status(200).json(post);
          } else {
            post.comments = comment;
            return res.status(200).json(post);
          }
          res.status(200).json(post);
        })
        .catch(err => {
          res.status(200).json(post);
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ err, message: "we ran into an error retreving the user" });
    });
});

router.post("/", restricted, prepNewPost, async (req, res) => {
  const post = req.body;
  if (post.description && post.image) {
    try {
      const inserted = await Posts.add(post);
      res.status(201).json(inserted);
    } catch (error) {
      res
        .status(500)
        .json({ error, message: "we ran into an error posting your stolen bike" });
    }
  } else {
    res.status(400).json({ message: "Please provide a description" });
  }
});

router.put("/:id", restricted, verifyPostOwner, (req, res) => {
  Posts.update(req.params.id, req.body)
    .then(update => {
      if (
        req.body.last_seen_location &&
        req.body.last_latitude &&
        req.body.last_longitude
      ) {
        let newLocation = {};
        newLocation.post_id = update.post_id;
        newLocation.user_id = req.decodedToken.id;
        newLocation.last_seen_location = update.last_seen_location;
        newLocation.last_latitude = update.last_latitude;
        newLocation.last_longitude = update.last_longitude;

        LastLocation.add(newLocation).then(lastLocation => {
          return res.status(201).json({ lastLocation, update });
        });
      } else {
        return res.status(200).json(update);
      }
    })
    .catch(err => {
      res.status(500).json({ err, message: "error updating your post" });
    });
});

router.delete("/:id", restricted, verifyPostOwner, (req, res) => {
  Posts.remove(req.params.id)
    .then(del => {
      res
        .status(200)
        .json({ message: "the post has successfully been deleted" })
        .end(del);
    })
    .catch(err => {
      res.status(500).json({ err, message: "this post does not exist" });
    });
});

module.exports = router;
