const express = require("express");
const {
  login,
  register,
  retrieveMentors,
  retrieveMentorsByRole,
  fetchRoles,
} = require("../controllers/mentorController");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/mentors", retrieveMentors);
router.get("/roles", retrieveMentorsByRole);

module.exports = router;
