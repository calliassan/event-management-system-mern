const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const eventRoute = require("./Routes/eventRoute");
dotEnv.config();
const port = process.env.PORT || 5000;
const server = express();
const userRoute = require("./Routes/userroute");
server.use(express.json());
server.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://vercel.com/ashish-bhattarais-projects-48e87578/event-management-system-mern/8V8Gkdn1sLPfMetG6ZJzZckTJegU",
    ],
  }),
);
// Root route (important for deployment check)
server.get("/", (req, res) => {
  res.send("Event Management API running 🚀");
});

server.use("/user", userRoute);
server.use("/event", eventRoute);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected successfully");
    server.listen(port, () => {
      console.log("Listening to the port", port);
    });
  })
  .catch((error) => {
    console.log("could not connect to database", error.message);
  });
