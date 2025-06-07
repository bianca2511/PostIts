import '../styles/Note.css'

function Note({ username, content, color, submissionDate }) {


    console.log(typeof submissionDate);
    const formattedDate = new Intl.DateTimeFormat('en-NL', {
        dateStyle: "full"
    }).format(new Date(submissionDate));

    return (
        <div className={`note ${color}`}>
            <div className='note-pin'></div>
            <h2 className="note-author">{username}</h2>
            <p className="note-content">{content}</p>
            <p className='note-date'>{formattedDate}</p>
        </div>
    )
}

export default Note