const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const connectDB = require("../backend/config/db");
const adminRoutes = require("./routes/adminRoutes");
const hwRoutes = require("./routes/hwRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const familyRoutes = require("./routes/familyRoutes");
const patientRoutes = require("./routes/PatientRoutes");
const logRoutes = require("./routes/logRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const path = require("path");
// dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

console.log(PORT);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // origin: "https://ssfservice.in/"
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Socket ID is" + socket.id);

  socket.on("send-message", (msg, room) => {
    if (socket.rooms.has(room)) {
      socket.to(room).emit("recieve-message", msg);
    }
  });
  socket.on("join-room", (room, userId) => {
    // console.log(room);
    socket.join(room);
    socket.to(room).emit("user-connected", userId);
  });
  socket.on("leave-room", (room, userId) => {
    socket.leave(room);
    console.log("leaving room with id" + socket.id);
    socket.to(room).emit("user-disconnected", userId);
  });
});

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/hw", hwRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/family", familyRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/prescription", prescriptionRoutes);
app.use("/api/med", medicineRoutes);

// app.get('/api',(req,res)=>{
//     res.send("ok");
// })

const __dirname1 = path.resolve();
console.log(__dirname1);
if (process.env.Node_Env == "production") {
  app.use(express.static(path.join(__dirname1, "./backend/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname1, "./backend/frontend/build/index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("ok");
  });
}

server.listen(PORT, console.log("server at " + PORT));
