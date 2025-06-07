import React from 'react';
import { useEffect, useState } from 'react';
import Note from './Note'
import Input from './Input';
import '../styles/Board.css'

export default function Board() {
    const [notes, setNotes] = useState({});

    useEffect(() => {
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
    }, []); 

    return (
        <div className='note-board'>
            <Input></Input>
            <div className='notes'>
            {Object.entries(notes).map(([username, { content, color }]) => (
                <Note key={username} username={username} content={content} color={color}></Note>
            ))}
            </div>
        </div>
    );
}