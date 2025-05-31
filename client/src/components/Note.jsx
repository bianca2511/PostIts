import '../styles/Note.css'

function Note({username, content}) {
    return(
        <div className="note">
            <h3 className="note-author">{username}</h3>
            <p className="note-content">{content}</p>
        </div>
    )
}

export default Note