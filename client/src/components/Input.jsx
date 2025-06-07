import { useState } from 'react'
import '../styles/Input.css'

export default function Input() {

    const [content, setContent] = useState("");
    const [username, setUsername] = useState("");

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
            setContent("");
        } else {
            console.error("Submission Failed, try again!");
        }
    }

    const [selectedColor, setSelectedColor] = useState('pink');

    return (
        <div className='input-box'>
            <h2 className='input-prompt'>How was your week, {username}?</h2>
            <textarea rows="15" cols="45" placeholder="Today was a great day!" autoFocus value={content} onChange={(e) => setContent(e.target.value)} className='input-field'></textarea>
            <input placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} className='input-field'></input>
            <div className='color-picker'>
                {['pink', 'orange', 'yellow', 'green', 'blue', 'purple'].map(color => (
                    <div
                        key={color}
                        className={`color-circle ${color} ${selectedColor === color ? 'selected' : ''}`}
                        onClick={() => setSelectedColor(color)}
                    ></div>
                ))}
            </div>
            <button type="submit" className="submit-button" onClick={submitText}>Submit</button>
        </div>
    )
}