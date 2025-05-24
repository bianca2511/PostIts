const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");

app.use(cors());
app.use(express.json());

let notes = new Map();

function getCurrentWeekStart() {
    let currentDate = new Date();
    let first = currentDate.getDate() - currentDate.getDay() + 1;
    currentDate.setDate(first);
    return currentDate.toISOString().slice(0,10);
}

let currentStart = getCurrentWeekStart();
console.log(currentStart);

app.use((req, res, next) => {
    let thisWeekStart = getCurrentWeekStart();
    console.log("This week is: ", thisWeekStart);
    if(thisWeekStart !== currentStart) {
        notes = new Map();
        currentStart = thisWeekStart;
        console.log("New week ahead :)");
    }
    next();
})

// Get all notes
app.get("/api/notes", (req, res) => {
    res.json(Object.fromEntries(notes.entries()));
});

// Post a new note
app.post("/api/notes", (req, res) => {
    let { username: you, content: yourEntry } = req.body;

    if (!you || !yourEntry || you === "" || yourEntry === "") {
        return res.status(400).json({ error: "Missing username or content" });
    }

    notes.set(you, yourEntry, new Date().toISOString());
    res.send("Note received sucessfully :), safely stored on my server");
    console.log(notes);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
