import '../styles/Input.css'

export default function Input() {
    return(
    <div className='input-box'>
        <h2 className='input-prompt'>How was your week?</h2>
        <textarea rows="15" cols="45" placeholder="Today was a great day!" autoFocus className='input-field'></textarea>
        <button type="submit" className="submit-button">Submit</button>
    </div>
)}