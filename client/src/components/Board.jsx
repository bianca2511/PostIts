import React from 'react';
import { useEffect, useState, useRef } from 'react';
import Note from './Note'
import Input from './Input';
import '../styles/Board.css'

export default function Board() {
    const [notes, setNotes] = useState({});
    const noteDialogRef = useRef(null); // create a reference to the dialog node in the DOM

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

    function toggleExpandedNote() {
        if(!noteDialogRef.current) {
            return;
        }

        noteDialogRef.current.hasAttribute("open") ? noteDialogRef.current.close() : noteDialogRef.current.showModal();
    }

    return (
        <div className='note-board'>
            <Input reloadNotes={reloadNotes}></Input>
            <div className='notes'>
                {Object.entries(notes).map(([username, { content, color, submissionDate }]) => (
                    <Note key={username} onClick={toggleExpandedNote} username={username} content={content} color={color} submissionDate={submissionDate}></Note>
                ))}
            </div>

        <dialog ref={noteDialogRef}>
            Hello Word!
        </dialog>
        </div>
    );
}