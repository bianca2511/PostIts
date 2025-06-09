import '../styles/Note.css'

function Note({ username, content, color, submissionDate, onClick }) {

    const formattedDate = new Intl.DateTimeFormat('en-NL', {
        dateStyle: "full"
    }).format(new Date(submissionDate));

    return (
        // pass the onClick method to the div itself, not the whole component in Board
        <div className={`note ${color}`} onClick={onClick}>
            <div className='note-pin'></div>
            <h2 className="note-author">{username}</h2>
            <p className="note-content">{content}</p>
            <p className='note-date'>{formattedDate}</p>
        </div>
    )
}

export default Note