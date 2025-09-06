import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Input from './Input';

function LoginPage({success}) {
    const responseMessage = (response) => {
        console.log(response);
        const jwtoken = response.credential;
        const decoded = jwtDecode(jwtoken);
        let user = {
            email: decoded.email,
            name:decoded.given_name
        }
        success(user);
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