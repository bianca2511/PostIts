import '../styles/Note.css'

function Note({username, content}) {
    return(
        <div className="note">
            <div className='note-pin'></div>
            <h2 className="note-author">{username}</h2>
            <p className="note-content">{content}</p>
        </div>
    )
}

export default Note