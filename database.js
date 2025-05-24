const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('notes.db');

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS notes (
      username TEXT PRIMARY KEY,
      content TEXT
    )
`);
});

module.exports = db;

