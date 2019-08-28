const router = require("express").Router();

const Notifications = require("./notificationsModel");
const restricted = require("../auth/middleware/restrictedMiddleware");
const { verifyUserExist } = require("../users/middleware");
const {
  prepNewNotification,
  verifyNotificationOwner,
  verifyNotificationExist,
  verifyNotificationsExist
} = require("./middleware");

router.get("/", verifyNotificationsExist, (req, res) => {
  Notifications.getAllNotifications()
    .then(notifications => {
      return res.status(200).json(notifications);
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
      if (sender <= 0) {
        return res.status(200).json({ message: "no notifications" });
      } else {
        return res.status(200).json(sender);
      }
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
      if (receiver <= 0) {
        return res.status(200).json({ message: "no notifications" });
      } else {
        return res.status(200).json(receiver);
      }
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
      if (sender <= 0) {
        return res.status(200).json({ message: "no notifications" });
      } else {
        return res.status(200).json(sender);
      }
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
      if (receiver <= 0) {
        return res.status(200).json({ message: "no notifications" });
      } else {
        receiver.forEach(notification => {
          
          if (notification.seen == false) {
          body = { seen: true };
          Notifications.update(notification.notification_id, body); 
          }
        }); 
        return res.status(200).json({receiver});
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ err, message: "we ran into an error retreving the user" });
    });
});

router.post("/comment/:id", restricted, prepNewNotification, (req, res) => {
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

router.put("/:id", restricted, (req, res) => {
  body = { seen: false };
  Notifications.update(req.params.id, body)
    .then(update => {
      res
        .status(200)
        .json({ update, message: "notification has been updated to seen" });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete(
  "/id/:id",
  restricted,
  verifyNotificationExist,
  verifyNotificationOwner,
  (req, res) => {
    Notifications.remove(req.params.id)
      .then(del => {
        res
          .status(200)
          .json({ message: "the notification as successfully been deleted" })
          .end(del);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
);

router.delete("/user/:id", restricted, verifyUserExist, (req, res) => {
  Notifications.removeAllUsersNotifications(req.params.id)
    .then(del => {
      res
        .status(200)
        .json({ message: "All notifications have successfully been deleted" })
        .end(del);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/user/", restricted, (req, res) => {
  Notifications.removeAllUsersNotifications(req.decodedToken.id)
    .then(del => {
      res
        .status(200)
        .json({
          message: "All your notifications have successfully been deleted"
        })
        .end(del);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/all/", restricted, verifyNotificationsExist, (req, res) => {
  Notifications.removeAll()
    .then(del => {
      res
        .status(200)
        .json({
          message: "All notifications database has successfully been deleted"
        })
        .end(del);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
