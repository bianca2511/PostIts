import React from 'react';
import { useEffect, useState } from 'react';
import Note from './Note'
import Input from './Input';
import '../styles/Board.css'

export default function Board() {
    const [notes, setNotes] = useState({});

    const reloadNotes = () => {
        fetch('http://localhost:3000/api/notes')
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch notes");
                }
                return res.json();
            })

            .then((data) => {
                setNotes(data);
            })

            .catch((error) => {
                console.error("Fetch error: ", error);
            });
    }

    useEffect(reloadNotes, []);

    return (
        <div className='note-board'>
            <Input reloadNotes={reloadNotes}></Input>
            <div className='notes'>
                {Object.entries(notes).map(([username, { content, color, submissionDate }]) => (
                    <Note key={username} username={username} content={content} color={color} submissionDate={submissionDate}></Note>
                ))}
            </div>
        </div>
    );
}