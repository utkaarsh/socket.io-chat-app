const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 3500;
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

const expressServer = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
const io = new Server(expressServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? false
        : ["http://localhost:5500", "http://127.0.0.1:5500/"],
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} has been connected`);
  socket.on("message", (data) => {
    io.emit("message", `User-${socket.id.substring(0, 2)} : ${data}`);
    console.log(data);
  });
});
