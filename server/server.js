import express from "express";
import http from "http";
import { Server } from "socket.io";
import task from "./routes/task.route.js";
import connectDB from "./utils/db.js";
import cors from "cors";

const app = express();
const server = http.createServer(app);
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust to match your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

export const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/tasks", task);

app.get("/", (req, res) => res.send("Server is running"));

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
