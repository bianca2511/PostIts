import './styles/App.css'
import Board from './components/Board.jsx'
import LoginPage from './components/LoginPage.jsx'
import { useState } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useEffect } from 'react'

function App() {
    const [authenticatedUser, setAuthenticatedUser] = useState(null);
        const handleLoginSuccess = (user) => {
        setAuthenticatedUser(user);
        console.log("Authentacted", user);
        // store user info
    }

    useEffect(() => {
        // try restore session
        fetch('http://localhost:3000/api/auth/me', {
            credentials: 'include'
        })
            .then(r => r.ok ? r.json() : null)
            .then(data => {
                if (data?.user) setAuthenticatedUser(data.user);
            })
            .catch(() => {});
    }, []);

    return (
        <GoogleOAuthProvider clientId='425007287387-119id7q79brob846m001vikqhjpkns0o.apps.googleusercontent.com'>
            {authenticatedUser != null ? <Board user={authenticatedUser}></Board> : <LoginPage success={handleLoginSuccess}></LoginPage>}
        </GoogleOAuthProvider>
    )
}

export default App
