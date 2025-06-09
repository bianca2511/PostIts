const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('notes.db');

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS notes (
      username TEXT,
      content TEXT,
      color TEXT,
      date DATE,
      currentWeekStart TEXT,
      PRIMARY KEY (username, currentWeekStart)
    )
`);
});

module.exports = db;

