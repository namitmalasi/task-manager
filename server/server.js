const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => res.send("Server is running"));

http.listen(PORT, () => console.log(`Server running on port ${PORT}`));
