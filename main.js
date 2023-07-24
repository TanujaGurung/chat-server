const express = require("express");
var app = express();
var server = app.listen(3000);
var cors = require("cors");

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
    credentials: false
  }
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("send-message", (message, room) => {
    if (room === "") {
      socket.broadcast.emit("receive-message", message);
    } else {
      socket.to(room).emit("receive-message", message);
    }
  });
  socket.on("join-room", (room, cb) => {
    socket.join(room);
    cb(`Joined ${room}`);
  });
});
app.use(cors(corsOptions));

