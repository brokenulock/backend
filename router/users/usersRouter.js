const router = require("express").Router();

const Users = require("./usersModel");
const Posts = require("../posts/postsModel");

const restricted = require("../auth/middleware/restrictedMiddleware");

router.get(
  "/all",
  // restricted,
  (req, res) => {
    Users.find()
      .then(() => {
        res.json({ users, token: req.decodedToken });
      })
      .catch(err => {
        res.send(err);
      });
  }
);

router.get("/", (req, res) => {
  Users.getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err, message: "Cannot retrieve users from database." });
    });
});

router.get(
  "/:id",

  (req, res) => {
    Users.findById(req.params.id)
      .then(user => {
        Posts.getUserPosts(req.params.id)
          .where({ user_id: req.params.id })
          .then(posts => {
            user.posts = posts;
            return res.status(200).json(user);
          });
        // res.status(200).json(user);
      })
      .catch(err => {
        res
          .status(500)
          .json({ err, message: "we ran into an error retreving the user" });
      });
  }
);

router.put("/:id", restricted, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  Users.update(id, changes)
    .then(update => {
      res.status(200).json(update);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: error
      });
    });
});

router.delete("/:id", 
restricted, 
(req, res) => {
  if (req.decodedToken.id == req.params.id) {
    const user = req.decodedToken
    Users.remove(req.params.id)
    .then(del => {
      res
        .status(200)
        .json({ user, message: `User:${user.username} was successfully deleted` })
        .end(del);
    })
    .catch(err => {
      res.status(500).json({ err, message: "error, unable to delete user" });
    });
  } else {
    res.status(400).json({message: "you are not able to delete another users account"})
  }
  
});

module.exports = router;
