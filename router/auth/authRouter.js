const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Auth = require("./authModel");
const generateToken = require("../../token/token");


router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  user.avatar = "https://github.com/brokenulock/frontend/blob/master/src/bulfmlimg/default-avatar.png?raw=true"

  Auth.add(user)
    .then(saved => {
      // const token = generateToken(user);
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Auth.findBy({ username })
    .first()
    .then(user => {
      const token = generateToken(user);
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({
          message: `welcome ${user.username}!`,
          user,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentails" });
      }
    })
    .catch(error => {
      res.status(500).json({error, message:"error"});
    });
});


module.exports = router;
