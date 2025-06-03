import { useState } from 'react'
import '../styles/Input.css'



export default function Input() {

    const [content, setContent] = useState("");

    const submitText = async () => {

        const response = await fetch("http://localhost:3000/api/notes", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: "bianca4", content: content })
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Successfully sent", result);
            setContent("");
        } else {
            console.error("Submission Failed, try again!");
        }
    }

    return (
        <div className='input-box'>
            <h2 className='input-prompt'>How was your week?</h2>
            <textarea rows="15" cols="45" placeholder="Today was a great day!" autoFocus value={content} onChange={(e) => setContent(e.target.value)} className='input-field'></textarea>
            <button type="submit" className="submit-button" onClick={submitText}>Submit</button>
        </div>
    )
}