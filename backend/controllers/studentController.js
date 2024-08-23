const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../utils/db");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === "" || password === "") {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    db.get(
      `SELECT * FROM students WHERE email = ?`,
      [email],
      async (err, user) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }

        if (user === undefined)
          return res.status(400).json({ message: "User not found!" });

        const isPasswordMatched = await bcrypt.compare(
          password,
          user?.password
        );

        if (!isPasswordMatched) {
          return res.status(401).json({ message: "Wrong password!" });
        }

        const payload = {
          id: user.id,
          username: user.username,
          email: user.email,
          role: "student",
        };
        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET);
        return res
          .status(200)
          .json({ jwtToken, message: "Student login successful" });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (username === "" || password === "" || email === "") {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    db.get(
      `SELECT * FROM students WHERE email = ?`,
      [email],
      async (err, student) => {
        if (err) {
          return res.status(500).json({ message: error.message });
        }
        if (student) {
          return res
            .status(400)
            .json({ message: "Email is already registered!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const query = `INSERT INTO students (username, password, email) VALUES (?, ?, ?);`;
        db.run(query, [username, hashedPassword, email], function (error) {
          if (error) {
            return res.status(500).json({ message: error.message });
          }

          db.get(
            `SELECT * FROM students WHERE email = ?`,
            [email],
            (err, student) => {
              if (err) {
                return res.status(500).json({ message: err.message });
              }

              const payload = {
                id: student.id,
                username: student.username,
                email: student.email,
                role: "student",
              };
              const jwtToken = jwt.sign(payload, process.env.JWT_SECRET);
              res.status(201).json({
                message: "Student registered successfully",
                jwtToken,
              });
            }
          );
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const retrieveStudents = async (req, res) => {
  try {
    const query = `SELECT * FROM students;`;
    db.all(query, [], (err, students) => {
      if (err) return res.status(500).json({ message: error.message });
      res.status(200).json({ students });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login, register, retrieveStudents };
