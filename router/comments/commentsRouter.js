const router = require("express").Router();

const Comments = require("./commentsModel");
const restricted = require("../auth/middleware/restrictedMiddleware");
const { verifyCommentOwner, prepNewComment } = require("./middleware");

router.get("/", (req, res) => {
  Comments.getAllComments()
    .then(comment => {
      res.status(200).json(comment);
    })
    .catch(error => {
      res.status(500).json({ error, message: "error retrieving all posts" });
    });
});

router.get("/:id", (req, res) => {
  Comments.findById(req.params.id)
    .then(comment => {
      return res.status(200).json(comment);
    })
    .catch(err => {
      res
        .status(500)
        .json({ err, message: "we ran into an error retreving the user" });
    });
});

router.get("/post/:id", (req, res) => {
  let post = req.params;
  Comments.findByPostId(post.id)
    .then(comments => {
      return res.status(200).json({ post, comments });
    })
    .catch(err => {
      res.status(500).json({
        err,
        message: "we ran into an error retreving the users comments"
      });
    });
});

router.get("/user/:id", (req, res) => {
  let user = req.params;
  Comments.findByUserId(user.id)
    .then(comments => {
      return res.status(200).json({ user, comments });
    })
    .catch(err => {
      res.status(500).json({
        err,
        message: "we ran into an error retreving the users comments"
      });
    });
});

// router.post(
//   "/",
//   restricted,
//   // prepNewComment,
//   async (req, res) => {
//     if (req.body.comment) {
//       try {
//         const inserted = await Comments.add(comment);
//         res.status(201).json(inserted);
//       } catch (error) {
//         res
//           .status(500)
//           .json({
//             error,
//             message: "we ran into an error posting your comment"
//           });
//       }
//     } else {
//       res.status(400).json({ message: "Please provide a comment" });
//     }
//   }
// );

router.post("/", restricted, prepNewComment, (req, res) => {
  Comments.add(req.body)
    .then(inserted => {
      res.status(201).json(inserted);
    })
    .catch(error => {
      res.status(500).json({
        error,
        message: "we ran into an error posting your comment"
      });
    });
});

router.put("/:id", restricted, verifyCommentOwner, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  Comments.update(id, changes)
    .then(update => {
      res.status(200).json(update);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: error
      });
    });
});

router.delete("/:id", restricted, verifyCommentOwner, (req, res) => {
  Comments.remove(req.params.id)
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
