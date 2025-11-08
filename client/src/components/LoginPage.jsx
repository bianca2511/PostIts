import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import "../styles/Login.css"

function LoginPage({ success }) {
    const responseMessage = async (response) => {
        try {
            const credential = response.credential;
            const res = await fetch('http://localhost:3000/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ credential })
            });
            if (!res.ok) {
                throw new Error('Auth failed');
            }
            const data = await res.json();
            success(data.user);
        } catch (e) {
            console.error(e);
            alert("Login Failed! Try again :)");
        }
    };
    const errorMessage = (error) => {
        console.log(error);
        alert("Login Failed! Try again :)");
    };
    return (
        <div className='login-page'>
            <div className='login-box'>
                <div className='login-pin'></div>
                <h1 className='greeting'>Welcome fellow Brussel Sprout!</h1>
                <h3 className='greeting'>please sign in below to use the post its</h3>
                <GoogleLogin onSuccess={responseMessage} onError={errorMessage}
                    theme="outline"   // "filled_blue" | "filled_black" | "outline"
                    size="large"
                    shape="pill"
                    width="300" />
            </div>
        </div>
    )
}
export default LoginPage;