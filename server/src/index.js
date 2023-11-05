import express from "express";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(cors());
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://sunday-client-1",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log(data)
  });

  socket.on("disconnect", () => {
  });
  
});

app.get("/", (req, res) => {
  res.send("Hello, this is the Socket.io server!");
});


server.listen(3001, () => {
  console.log("[SERVER RUNNING...]");
});