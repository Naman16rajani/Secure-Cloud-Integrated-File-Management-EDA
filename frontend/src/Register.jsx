import React from 'react';
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const registerURL = "https://xtjuhav0wg.execute-api.ap-south-1.amazonaws.com/prod/register"


const Register = () => {


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const [message, setMessage] = useState("");

    function submitHandler(event) {
        event.preventDefault();
        setMessage("registration is processing......");

        if (name.trim() === '' || email.trim() === '' || password.trim() === '' || username.trim() === '') {
            setMessage("Please fill all the fields");
            return
        }
        console.log(name, email, password, username);
        const requestConfig: axios.AxiosRequestConfig<{ password: string; name: string; email: string; username: string }> = {
            username: username,
            password: password,
            email: email,
            name: name,
            headers: {
                'Content-Type':'application/json',
                'Accept':'*/*',
                'Connection':'keep-alive',
                'x-api-key': 'FaKReIuD131792XyBt6B937x4GtF7OSW6Yd2ib3z'
            }
        }

        const requestBody = {
            username: username,
            password: password,
            email: email,
            name: name
        }

        axios.post(registerURL, requestBody, requestConfig)
            .then(response => {
                setMessage("registration successful");

            }).catch(error => {
            setMessage("registration failed error: " + error);
        })


    }

    return (
        <div className="register">
            <h1>Register</h1>
            <form onSubmit={submitHandler}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </label>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </label>
                <input type="submit" value="Register" />
            </form>
            {message && <p className="message">{message}</p>}
        </div>

    )

}

export default Register;