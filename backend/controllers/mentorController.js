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
      `SELECT * FROM mentors WHERE email = ?`,
      [email],
      async (err, mentor) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }

        if (mentor === undefined)
          return res.status(400).json({ message: "User not found!" });

        const isPasswordMatched = await bcrypt.compare(
          password,
          mentor?.password
        );

        if (!isPasswordMatched) {
          return res.status(401).json({ message: "Wrong password!" });
        }

        const payload = {
          id: mentor.id,
          username: mentor.username,
          role: "mentor",
          email: mentor.email,
        };

        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET);
        return res
          .status(200)
          .json({ jwtToken, message: "Mentor login successful" });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { username, password, roles, email } = req.body;
    if (
      username === "" ||
      password === "" ||
      roles === "" || // is a json object
      email === ""
    ) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    db.get(
      `SELECT * FROM mentors WHERE email = ?`,
      [email],
      async (err, mentor) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        if (mentor) {
          return res
            .status(400)
            .json({ message: "mentor is already registered!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const query = `INSERT INTO mentors (username, password, roles, email, premium) VALUES (?, ?, ?, ?, ?);`;
        db.run(
          query,
          [username, hashedPassword, roles, email, 0],
          function (error) {
            if (error) {
              return res.status(500).json({ message: error.message });
            }

            db.get(
              `SELECT * FROM mentors WHERE email = ?`,
              [email],
              (err, mentor) => {
                if (err) {
                  return res.status(500).json({ message: err.message });
                }

                const payload = {
                  id: mentor.id,
                  username: mentor.username,
                  email: mentor.email,
                  role: "mentor",
                };
                const jwtToken = jwt.sign(payload, process.env.JWT_SECRET);
                res.status(201).json({
                  message: "Mentor registration successful",
                  jwtToken,
                });
              }
            );
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const retrieveMentors = async (req, res) => {
  try {
    const query = `SELECT * FROM mentors;`;
    db.all(query, [], (err, mentors) => {
      if (err) return res.status(500).json({ message: error.message });
      res.status(200).json({ mentors });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const retrieveMentorsByRole = async (req, res) => {
  try {
    const { query } = req.query;
    db.all(`SELECT * FROM mentors;`, [], (err, mentors) => {
      if (err) return res.status(500).json({ message: err.message });

      const queryResults = new Map();
      mentors.forEach((mentor) => {
        const formattedRoles = JSON.parse(mentor.roles);

        formattedRoles.forEach((r) => {
          if (r.toLowerCase().includes(query.toLowerCase())) {
            const { id, username, roles } = mentor;
            if (!queryResults.has(id)) {
              queryResults.set(id, { id, mentor: username, roles });
            }
          }
        });
      });

      return res
        .status(200)
        .json({ mentors: Array.from(queryResults.values()) });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchRoles = async (req, res) => {
  try {
    const { query } = req.query;

    db.all(`SELECT * FROM mentors`, [], (err, mentors) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      let roles = new Set();
      mentors.forEach((mentor) => {
        const formattedRoles = JSON.parse(mentor.roles);

        formattedRoles.forEach((r) => {
          roles.add(r);
        });
      });

      let queryResults = [];
      roles.forEach((r) => {
        if (r.toLowerCase().includes(query.toLowerCase())) {
          queryResults.push(r);
        }
      });

      return res.status(200).json({ roles: queryResults });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
  register,
  retrieveMentors,
  retrieveMentorsByRole,
  fetchRoles,
};
