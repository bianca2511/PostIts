import '../styles/Note.css'

function Note({ username, content, color }) {
    console.log(color);
    return (
        <div className={`note ${color}`}>
            <div className='note-pin'></div>
            <h2 className="note-author">{username}</h2>
            <p className="note-content">{content}</p>
        </div>
    )
}

export default Note