const db = require("../utils/db");
const nodemailer = require("nodemailer");

const createBooking = async (req, res) => {
  try {
    const { mentorId, duration, status, price } = req.body;
    const { id } = req.user;

    db.run(
      `INSERT INTO bookings (studentId, mentorId, duration, status, price, dateTime) VALUES (?, ?, ?, ?, ?, ?)`,
      [id, mentorId, duration, status, price, null],
      (err) => {
        if (err) return res.status(500).json({ message: err.message });

        return res.status(201).json({ message: "Booked successfully" });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBooking = async (req, res) => {
  try {
    const { dateTime, bookingId } = req.body;

    db.run(
      `UPDATE bookings SET dateTime = ?, status = ? WHERE id = ?;`,
      [dateTime, "success", bookingId],
      (err) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json({ message: "Meet Scheduled" });

        db.get(
          `SELECT * FROM bookings WHERE id == ?`,
          [bookingId],
          (err, booking) => {
            if (err) return res.status(500).json({ message: err.message });

            const { studentId } = booking;
            db.get(
              `SELECT * FROM students WHERE id == ?`,
              [studentId],
              async (err, student) => {
                if (err) return res.status(500).json({ message: err.message });

                const { email, username } = student;
                const formattedDatetime = JSON.parse(dateTime);
                const { startTime, endTime, date } = formattedDatetime;
                const transporter = nodemailer.createTransport({
                  service: "gmail", // You can use other services like 'smtp.mailgun.org' or custom SMTP
                  host: "smtp.gmail.com",
                  port: 587,
                  secure: false,
                  auth: {
                    user: process.env.EMAIL_USER, // Your email address
                    pass: process.env.EMAIL_PASS, // Your email password or app password
                  },
                });

                const sendAssignmentNotification = async () => {
                  const mailOptions = {
                    from: "careerCarveMeets-no-reply@example.com", // Sender address
                    to: email, // List of receivers
                    subject: "Your meeting has been scheduled", // Subject line
                    text: `Dear ${username},\n\nYour meeting has been scheduled as follows:\n\nDate: ${date}\nStart Time: ${startTime}\nEnd Time: ${endTime}\n\nPlease ensure you are available at the scheduled time. You can view more details and manage your bookings in the dashboard.\n\nBest regards,\nCareerCarve Team`, // Plain text body
                  };

                  try {
                    await transporter.sendMail(mailOptions);
                    console.log("Notification email sent successfully");
                  } catch (error) {
                    console.error("Error sending notification email:", error);
                  }
                };

                await sendAssignmentNotification();
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

const fetchMentorBookings = async (req, res) => {
  try {
    const { id } = req.user;
    db.all(
      `SELECT * FROM bookings WHERE mentorId = ?`,
      [id],
      async (err, bookings) => {
        if (err) return res.status(500).json({ message: err.message });

        // Use map to create an array of promises
        const meetsPromises = bookings.map(async (b) => {
          return new Promise((resolve, reject) => {
            db.get(
              `SELECT * FROM students WHERE id = ?`,
              [b.studentId],
              (err, student) => {
                if (err) return reject(err);
                const { username, email } = student;
                resolve({
                  ...b,
                  username,
                  email,
                });
              }
            );
          });
        });

        // Wait for all promises to resolve
        const meets = await Promise.all(meetsPromises);

        return res.status(200).json({ meets });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchStudentBookings = async (req, res) => {
  try {
    const { id } = req.user;
    db.all(
      `SELECT * FROM bookings WHERE studentId = ?`,
      [id],
      async (err, bookings) => {
        if (err) return res.status(500).json({ message: err.message });

        // Use map to create an array of promises
        const meetsPromises = bookings.map(async (b) => {
          return new Promise((resolve, reject) => {
            db.get(
              `SELECT * FROM students WHERE id = ?`,
              [b.studentId],
              (err, student) => {
                if (err) return reject(err);
                const { username, email } = student;
                resolve({
                  ...b,
                  username,
                  email,
                });
              }
            );
          });
        });

        // Wait for all promises to resolve
        const meets = await Promise.all(meetsPromises);

        return res.status(200).json({ meets });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  fetchMentorBookings,
  createBooking,
  updateBooking,
  fetchStudentBookings,
};
