const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Connect to SQLite database
const db = new sqlite3.Database(
  path.join(__dirname, "database.sqlite"),
  (err) => {
    if (err) {
      console.error("Error opening database:", err.message);
    } else {
      console.log("Connected to the SQLite database.");

      //creating mentor table
      db.run(`
      CREATE TABLE IF NOT EXISTS mentors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        roles TEXT NOT NULL,  -- JSON string of expertise areas
        premium INTEGER NOT NULL DEFAULT 0  
      )
    `);

      db.run(`
      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
     
      )
    `);
      //duration can (30, 45, 60) min long
      //interview booking date can any be selected by user
      db.run(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        studentId INTEGER NOT NULL,
        mentorId INTEGER NOT NULL,
        duration INTEGER NOT NULL, 
        dateTime TEXT, 
        status TEXT NOT NULL, 
        price INTEGER NOT NULL,
        FOREIGN KEY(studentId) REFERENCES Students(id),
        FOREIGN KEY(mentorId) REFERENCES Mentors(id)
      )
    `);
    }
  }
);

module.exports = db;
