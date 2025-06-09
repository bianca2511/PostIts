import React from 'react';
import { useEffect, useState, useRef } from 'react';
import Note from './Note'
import Input from './Input';
import '../styles/Board.css'

export default function Board() {
    const [notes, setNotes] = useState({});
    const noteDialogRef = useRef(null); // create a reference to the dialog node in the DOM
    const [selectedNote, setSelectedNote] = useState(null);
    const [expanded, setExpanded] = useState(false); // record if note is in expanded state for creating preview in normal state

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

    function toggleExpandedNote(note) {

        setSelectedNote(note);
        if (!noteDialogRef.current) {
            return;
        }

        if (noteDialogRef.current.hasAttribute('open')) {
            noteDialogRef.current.close();
            setSelectedNote(null);
            setExpanded(false);
        } else {
            noteDialogRef.current.showModal();
            setExpanded(true);
        }
    }

    return (
        <div className='note-board'>
            <Input reloadNotes={reloadNotes}></Input>
            <div className='notes'>
                {Object.entries(notes).map(([username, { content, color, submissionDate }]) => (
                    <Note key={username} onClick={() => toggleExpandedNote({ username, content, color, submissionDate })}
                        username={username} content={content} color={color} submissionDate={submissionDate}></Note>
                ))}
            </div>

            <dialog className='note-dialog-box' ref={noteDialogRef}>
                {selectedNote && (<div className="note-dialog-content">
                    <Note key={selectedNote.username} username={selectedNote.username}
                        content={selectedNote.content}
                        color={selectedNote.color}
                        submissionDate={selectedNote.submissionDate}
                        onClick={() => toggleExpandedNote()}
                        className='dialog'
                        expanded={expanded}></Note>
                </div>)
                }
            </dialog>
        </div>
    );
}