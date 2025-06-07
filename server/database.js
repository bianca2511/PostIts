const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('notes3.db');

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS notes (
      username TEXT PRIMARY KEY,
      content TEXT,
      color TEXT,
      date DATE
    )
`);
});

module.exports = db;

