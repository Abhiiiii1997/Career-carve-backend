const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

// Fetch all mentors
app.get("/mentors", (req, res) => {
  db.all("SELECT * FROM mentors", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ mentors: rows });
  });
});

// Create a new booking
app.post("/bookings", (req, res) => {
  const { student_id, mentor_id, duration, time_slot } = req.body;
  db.run(
    `INSERT INTO bookings (student_id, mentor_id, duration, time_slot)
            VALUES (?, ?, ?, ?)`,
    [student_id, mentor_id, duration, time_slot],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ booking_id: this.lastID });
    }
  );
});

// Retrieve bookings
app.get("/bookings", (req, res) => {
  const { student_id, mentor_id } = req.query;
  let query = `SELECT * FROM bookings WHERE 1=1`;
  let params = [];
  if (student_id) {
    query += ` AND student_id = ?`;
    params.push(student_id);
  }
  if (mentor_id) {
    query += ` AND mentor_id = ?`;
    params.push(mentor_id);
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ bookings: rows });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
