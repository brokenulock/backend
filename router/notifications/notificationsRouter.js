const router = require("express").Router();

const Notifications = require("./notificationsModel");
const restricted = require("../auth/middleware/restrictedMiddleware");
const { verifyUserExist } = require("../users/middleware");
const { prepNewNotification } = require("./middleware");
router.get("/", (req, res) => {
  Notifications.getAllNotifications()
    .then(notification => {
      newNotification = { notification };
      hello = "hello";
      res.status(200).json(notification);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error, message: "error retrieving all notifications" });
    });
});

router.get("/sender/:id", verifyUserExist, (req, res) => {
  Notifications.findBySenderId(req.params.id)
    .then(sender => {
      return res.status(200).json(sender);
    })
    .catch(err => {
      res
        .status(500)
        .json({ err, message: "we ran into an error retreving the user" });
    });
});

router.get("/receiver/:id", verifyUserExist, (req, res) => {
  Notifications.findByReceiverId(req.params.id)
    .then(receiver => {
      return res.status(200).json(receiver);
    })
    .catch(err => {
      res
        .status(500)
        .json({ err, message: "we ran into an error retreving the user" });
    });
});

router.get("/sender/", restricted, (req, res) => {
  Notifications.findBySenderId(req.decodedToken.id)
    .then(sender => {
      return res.status(200).json(sender);
    })
    .catch(err => {
      res
        .status(500)
        .json({ err, message: "we ran into an error retreving the user" });
    });
});

router.get("/receiver/", restricted, (req, res) => {
  Notifications.findByReceiverId(req.decodedToken.id)
    .then(receiver => {
      return res.status(200).json(receiver);
    })
    .catch(err => {
      res
        .status(500)
        .json({ err, message: "we ran into an error retreving the user" });
    });
});

router.post("/comment/:id", restricted, 
prepNewNotification, 
(req, res) => {
  Notifications.add(req.body)
    .then(inserted => {
      res.status(201).json(inserted);
    })
    .catch(error => {
      res.status(500).json({
        error,
        message: "we ran into an error posting your notification"
      });
    });
});

module.exports = router;
