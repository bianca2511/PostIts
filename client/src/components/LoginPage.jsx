import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

function LoginPage({success}) {
    const responseMessage = (response) => {
        console.log(response);
        success()

    };
    const errorMessage = (error) => {
        console.log(error);
        alert("Login Failed! Try again :)");
    };
    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </div>
    )
}
export default LoginPage;