const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
require("./utils/db");
const mentorRoutes = require("./routes/mentorRoutes");
const studentRoutes = require("./routes/studentRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
app.use(cors());
app.use(express.json());
dotenv.configDotenv();
app.use("/api/auth/student", studentRoutes);
app.use("/api/auth/mentor", mentorRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.send("API is working:)");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
