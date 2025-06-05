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
            body: JSON.stringify({ username: "bianca6", content: content, color:color })
        });

        if (response.ok) {
            const result = await response;
            console.log("Successfully sent", result);
            setContent("");
        } else {
            console.error("Submission Failed, try again!");
        }
    }

    // const [color, setColor] = useState('pink');

    return (
        <div className='input-box'>
            <h2 className='input-prompt'>How was your week?</h2>
            <textarea rows="15" cols="45" placeholder="Today was a great day!" autoFocus value={content} onChange={(e) => setContent(e.target.value)} className='input-field'></textarea>
            <div className='color-picker'>
                {['pink', 'orange', 'yellow', 'green', 'blue', 'purple'].map(color => (
                    <div
                        key={color}
                        className={`color-circle ${color}`}
                        // onClick={setColor(color)}
                    ></div>
                ))}
            </div>
            <button type="submit" className="submit-button" onClick={submitText}>Submit</button>
        </div>
    )
}