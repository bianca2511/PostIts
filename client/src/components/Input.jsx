import '../styles/Input.css'

export default function Input() {
    return(
    <div className='input-box'>
        <h3>How was your week?</h3>
        <textarea rows="15" cols="45" placeholder="Today was a great day!" autoFocus className='input-field'></textarea>
        <button type="submit" className="submit-button">Submit</button>
    </div>
)}