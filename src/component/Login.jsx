import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [show, setShow] = useState("Show")
    const [showHidePassword, setShowHidePassword] = useState("password")
    const handleShowHidePassword = () => {
        if (showHidePassword === "password") {
            setShowHidePassword("text");
            setShow("Hide");
        } else {
            setShowHidePassword("password");
            setShow("Show");
        }
    }
    const handleLoginSubmit = (event) => {
        event.preventDefault();
        const username = event.target[0].value;
        const password = event.target[1].value;
        // console.log(username, password);

        axios.post("https://stg.dhunjam.in/account/admin/login", { username, password })
            .then(res => {
                // console.log(res)
                if (res.data) {
                    document.cookie = "token=" + res.data.data.token + "; expires=" + Date.now() + 1 * 24 * 60 * 60 * 1000;
                    window.location.href = 'http://localhost:3000'
                } else {
                    alert(res.data.response);
                }
            }).catch(e => {
                console.log(e);
            })
    }
    return (
        <form className='login' onSubmit={handleLoginSubmit}>
            <div className="LoginHeading">Venue Admin Login</div>
            <input type="email" required placeholder='Username' />
            <input type={showHidePassword} required placeholder='Password' />
            <div className='showhide' onClick={handleShowHidePassword}>{show}</div>
            <button type='submit' className='loginbtn'>Sign In</button>
            <div className="registration">New Registration?</div>
        </form>
    )
}

export default Login
