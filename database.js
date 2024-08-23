// const sqlite3 = require("sqlite3").verbose();

// const db = new sqlite3.Database("./bookings.db", (err) => {
//   if (err) {
//     console.error("Error opening database:", err);
//   } else {
//     console.log("Connected to SQLite database");
//   }
// });

// db.serialize(() => {
//   // Create tables if they do not exist
//   db.run(`CREATE TABLE IF NOT EXISTS mentors (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT,
//         availability TEXT,
//         areas_of_expertise TEXT,
//         is_premium INTEGER
//     )`);

//   db.run(`CREATE TABLE IF NOT EXISTS students (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT,
//         availability TEXT,
//         area_of_interest TEXT
//     )`);

//   db.run(`CREATE TABLE IF NOT EXISTS bookings (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         student_id INTEGER,
//         mentor_id INTEGER,
//         duration INTEGER,
//         time_slot TEXT,
//         FOREIGN KEY(student_id) REFERENCES students(id),
//         FOREIGN KEY(mentor_id) REFERENCES mentors(id)
//     )`);

//   // Insert sample mentors if not already present
//   // Insert sample students if not already present
//   db.get(`SELECT COUNT(*) AS count FROM students`, (err, row) => {
//     if (err) {
//       console.error("Error checking students table:", err);
//     } else if (row.count === 0) {
//       db.run(`INSERT INTO students (name, availability, area_of_interest)
//               VALUES ('Alice', '18:00-19:00', 'Math')`);
//       db.run(`INSERT INTO students (name, availability, area_of_interest)
//               VALUES ('Bob', '20:00-21:00', 'English')`);
//     }
//   });
// });

// module.exports = db;

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./bookings.db", (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Connected to SQLite database");
  }
});

db.serialize(() => {
  // Create tables if they do not exist
  db.run(`CREATE TABLE IF NOT EXISTS mentors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        availability TEXT,
        areas_of_expertise TEXT,
        is_premium INTEGER
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        availability TEXT,
        area_of_interest TEXT
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER,
        mentor_id INTEGER,
        duration INTEGER,
        time_slot TEXT,
        FOREIGN KEY(student_id) REFERENCES students(id),
        FOREIGN KEY(mentor_id) REFERENCES mentors(id)
    )`);

  // Seed the mentors table
  db.get(`SELECT COUNT(*) AS count FROM mentors`, (err, row) => {
    if (err) {
      console.error("Error checking mentors table:", err);
    } else if (row.count === 0) {
      console.log("Seeding mentors...");
      db.run(`INSERT INTO mentors (name, availability, areas_of_expertise, is_premium)
              VALUES ('John Doe', '09:00-17:00', 'Math, Science', 1)`);
      db.run(`INSERT INTO mentors (name, availability, areas_of_expertise, is_premium)
              VALUES ('Jane Smith', '10:00-18:00', 'English, History', 0)`);
    }
  });

  // Seed the students table
  db.get(`SELECT COUNT(*) AS count FROM students`, (err, row) => {
    if (err) {
      console.error("Error checking students table:", err);
    } else if (row.count === 0) {
      console.log("Seeding students...");
      db.run(`INSERT INTO students (name, availability, area_of_interest)
              VALUES ('Alice', '18:00-19:00', 'Math')`);
      db.run(`INSERT INTO students (name, availability, area_of_interest)
              VALUES ('Bob', '20:00-21:00', 'English')`);
    }
  });
});

module.exports = db;
