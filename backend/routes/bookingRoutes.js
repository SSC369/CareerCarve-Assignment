const router = require("express").Router();
const {
  fetchMentorBookings,
  createBooking,
  updateBooking,
  fetchStudentBookings,
} = require("../controllers/bookingController");
const { authenticateJWT } = require("../middlewares/authMiddleware");

router.post("/add-booking", authenticateJWT, createBooking);
router.put("/update-booking", updateBooking);
router.get("/mentor", authenticateJWT, fetchMentorBookings);
router.get("/student", authenticateJWT, fetchStudentBookings);

module.exports = router;
