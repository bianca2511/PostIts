import '../styles/Note.css'

function Note({ username, content, color, submissionDate, onClick, className = '', expanded }) {

    // If note content is too long, create preview of the text when in non expanded form
    let previewContent = content;
    let characterThreshold = 150;

    if (!expanded && content.length > characterThreshold) {
        previewContent = content.slice(0, characterThreshold) + "...";
    }

    else if (expanded) {
        previewContent = content;
    }


    const formattedDate = new Intl.DateTimeFormat('en-NL', {
        dateStyle: "full"
    }).format(new Date(submissionDate));

    return (
        // pass the onClick method to the div itself, not the whole component in Board
        // pass the className prop to differentiate the normal note from the one in the dialog element
        <div className={`note ${color} ${className}`} onClick={onClick}>
            <div className='note-pin'></div>
            <h2 className="note-author">{username}</h2>
            <p className="note-content">{previewContent}</p>
            <p className='note-date'>{formattedDate}</p>
        </div>
    )
}

export default Note