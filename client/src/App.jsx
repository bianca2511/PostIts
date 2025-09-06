import './styles/App.css'
import Board from './components/Board.jsx'
import LoginPage from './components/LoginPage.jsx'
import { useState } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        console.log("Authentacted");
        // store user info
    }
    return (
        <GoogleOAuthProvider clientId='425007287387-119id7q79brob846m001vikqhjpkns0o.apps.googleusercontent.com'>
            {isAuthenticated ? <Board></Board> : <LoginPage success={handleLoginSuccess}></LoginPage>}
        </GoogleOAuthProvider>
    )
}

export default App
