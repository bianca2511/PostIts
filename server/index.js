'use strict';

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const db = require('./database');

app.use(cors());
app.use(express.json());

function getCurrentWeekStart() {
    let currentDate = new Date();
    let first = currentDate.getDate() - currentDate.getDay() + 1;
    currentDate.setDate(first);
    return currentDate.toISOString().slice(0, 10);
}

let currentStart = getCurrentWeekStart();
console.log(currentStart);

app.use((req, res, next) => {
    let thisWeekStart = getCurrentWeekStart();
    console.log("This week is: ", thisWeekStart);
    if (thisWeekStart !== currentStart) {
        currentStart = thisWeekStart;
        console.log("New week ahead :)");
    }
    next();
})

// Get all notes
app.get("/api/notes", (req, res) => {

    db.all(`SELECT * FROM notes`, [], (err, rows) => {
        if (err) {
            console.error('DB read error:', err);
            return res.status(500).json({ error: 'Failed to load notes' });
        }

        const notes = {};
        rows.forEach(row => {
            notes[row.username] = {
                content: row.content,
                color: row.color,
                submissionDate: row.date
            };
        });

        res.json(notes);
    });
});


// Post a new note
app.post("/api/notes", (req, res) => {
    let { username, content, color, submissionDate } = req.body;
    console.log("Received:", { username, content, color, submissionDate });


    if (!username || !content || username === "" || content === "") {
        return res.status(400).json({ error: "Missing username or content" });
    }

    const insertQuery = `
        INSERT INTO notes (username, content, color, date)
        VALUES (?, ?, ?, ?)
        `;
    db.run(insertQuery, [username, content, color, submissionDate], function (err) {
        if (err) {
            console.error('DB error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        // notes.set(you, yourEntry, new Date().toISOString());
        res.send("Note received sucessfully :), safely stored on my server");
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
