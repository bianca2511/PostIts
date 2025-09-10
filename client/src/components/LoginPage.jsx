import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import "../styles/Login.css"

function LoginPage({ success }) {
    const responseMessage = (response) => {
        console.log(response);
        const jwtoken = response.credential;
        const decoded = jwtDecode(jwtoken);
        let user = {
            email: decoded.email,
            name: decoded.given_name
        }
        success(user);
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