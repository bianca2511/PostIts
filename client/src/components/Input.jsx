import '../styles/Input.css'

export default function Input() {
    return(
    <div className='input-box'>
        <textarea rows="10" cols="50" placeholder="Today was a great day!" autoFocus className='input-field'></textarea>
        <button type="submit" className="submit-button">Submit</button>
    </div>
)}