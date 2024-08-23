const express = require("express");
const {
  login,
  register,
  retrieveStudents,
} = require("../controllers/studentController");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/students", retrieveStudents);

module.exports = router;
