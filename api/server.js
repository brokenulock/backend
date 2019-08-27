const cors = require("cors");
const express = require("express");
const helmet = require("helmet");

const authRouter = require("../router/auth/authRouter");
const usersRouter = require("../router/users/usersRouter");
const postsRouter = require("../router/posts/postsRouter");
const commentsRouter = require("../router/comments/commentsRouter");
const lastLocationRouter = require("../router/lastlocation/lastLocationRouter");

// const commentsRouter = require("..router/comments/commentsRouter")
// const notificationsRouter = require("../router/notifications/notificationsRouter")

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/posts", postsRouter);
server.use("/api/lastLocation", lastLocationRouter);
server.use("/api/comments", commentsRouter);

// server.use('/api/notifications', notificationsRouter)

server.get("/", (req, res) => {
  res.status(200).json({ api: "Broken U-Lock api running" });
});
module.exports = server;
