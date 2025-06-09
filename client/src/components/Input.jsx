import { useState } from 'react'
import '../styles/Input.css'

export default function Input({reloadNotes}) {

    const [content, setContent] = useState("");
    const [username, setUsername] = useState("");
    const [selectedColor, setSelectedColor] = useState('pink');
    const [inputPlaceholder, setInputPlaceholder] = useState('Today was a great day!');
    const [submitted, setSubmitted] = useState(false); // keep state of wether text in submission box stays read only after submit


    const submitText = async () => {
        const submissionDate = new Date();
        const response = await fetch("http://localhost:3000/api/notes", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, content: content, color: selectedColor, submissionDate: submissionDate })
        });

        if (response.ok) {
            const result = await response;
            console.log("Successfully sent", result);
            setSubmitted(true);
            setInputPlaceholder("Post It submitted this week :)");
            // setContent("");
            reloadNotes();

        } else {
            console.error("Submission Failed, try again!");
            alert("Only one submission per week is possible :)");
        }
    }


    return (
        <div className={`input-box ${selectedColor}`}>
            <h2 className='input-prompt'>How was your week, {username}?</h2>
            <input placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} className={`input-field`}></input>
            <textarea rows="15" cols="45" placeholder={inputPlaceholder} autoFocus value={content} onChange={(e) => setContent(e.target.value)} className={`input-field`} readOnly={submitted}></textarea>
            <div className='color-picker'>
                {['pink', 'orange', 'yellow', 'green', 'blue', 'purple'].map(color => (
                    <div
                        key={color}
                        className={`color-circle ${color} ${selectedColor === color ? 'selected' : ''}`}
                        onClick={() => setSelectedColor(color)}
                    ></div>
                ))}
            </div>
            <button type="submit" className={`submit-button ${selectedColor}`} onClick={submitText}>Submit</button>
        </div>
    )
}