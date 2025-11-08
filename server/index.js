'use strict';

require('dotenv').config();
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const db = require('./database');
const cookieParser = require('cookie-parser');
const { verifyGoogleIdToken, issueJwt, authMiddleware } = require('./auth');
const { auth } = require("google-auth-library");


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

function getCurrentWeekStart() {
    let currentDate = new Date();
    let first = currentDate.getDate() - currentDate.getDay() + 1;
    currentDate.setDate(first);
    return currentDate.toISOString().slice(0, 10);
}

let currentStart = getCurrentWeekStart();
// console.log("Curent start:", currentStart);

app.use((req, res, next) => {
    let thisWeekStart = getCurrentWeekStart();
    console.log("This week is: ", thisWeekStart);
    if (thisWeekStart !== currentStart) {
        currentStart = thisWeekStart;
        console.log("New week ahead :)");
    }

    req.currentWeekStart = thisWeekStart; // attach current week to request so it is not needed to calculate again later
    next();
})

app.post('/api/auth/google', async (req, res) => {
    const {credential} = req.body;
    if(!credential) return res.status(400).json({error:'Missing credntials'});
    try {
        const user = await verifyGoogleIdToken(credential);
        const token = issueJwt(user);
        res.cookie('auth', token, {
            httpOnly: true,
            secure:false, //TOD: set this to true in prod
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 //7days?
        });
        res.json({user: {email:user.email, name:user.name}});
    } catch(e){
        console.error(e);
        res.status(401).json({error:'Invalid Google credentials'});
    }
});

app.get('/api/auth/me', (req, res) => {
    const token = req.cookies.auth;
    if (!token) return res.status(401).json({ error: 'No session' });
    const jwt = require('jsonwebtoken');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ user: { email: decoded.email, name: decoded.name } });
    } catch {
        res.status(401).json({ error: 'Invalid session' });
    }
});

app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('auth', { httpOnly: true, sameSite: 'lax' });
    res.json({ ok: true });
});

// Get all notes
app.get("/api/notes",authMiddleware, (req, res) => {
    // Only select the notes from the current week
    db.all(`SELECT * FROM notes WHERE currentWeekStart = ?`, [currentStart], (err, rows) => {
            if (err) {
                console.error('DB read error:', err);
                return res.status(500).json({ error: 'Failed to load notes' });
            }

            const notes = {};
            rows.forEach(row => {
                notes[row.username] = {
                    content: row.content,
                    color: row.color,
                    submissionDate: row.date,
                    currentWeekStart: row.currentWeekStart
                };
            });
            console.log(notes);
            res.json(notes);
        });
    });


    // Post a new note
    app.post("/api/notes", authMiddleware, (req, res) => {
        let { content, color, submissionDate } = req.body;
        let username = req.user.name;
        let currentWeekStart = req.currentWeekStart;
        console.log("Received:", { username, content, color, submissionDate });


        if (!username || !content || username === "" || content === "") {
            return res.status(400).json({ error: "Missing username or content" });
        }

        const insertQuery = `
        INSERT INTO notes (username, content, color, date, currentWeekStart)
        VALUES (?, ?, ?, ?,?)
        `;
        // let currentWeekStart = getCurrentWeekStart(); // Get currentWeekStart when the request is made
        // Add current week to the database
        db.run(insertQuery, [username, content, color, submissionDate, currentWeekStart], function (err) {
            if (err) {
                console.error('DB error:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.send("Note received sucessfully :), safely stored on my server");
        });
    });

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
