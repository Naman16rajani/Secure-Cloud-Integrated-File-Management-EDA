import React from "react";
import {useState} from "react";
import axios from "axios";
import {setUserSession} from "./service/AuthService"
import { useNavigate } from 'react-router-dom';

const loginURL = "https://xtjuhav0wg.execute-api.ap-south-1.amazonaws.com/prod/login"

const Login = (props) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage]=useState("")
    function handleSubmit(event) {
        event.preventDefault();
        setMessage("login is processing......");

        if (password.trim() === '' || username.trim() === '') {
            setMessage("Please fill all the fields");
            return
        }
        console.log( password, username);
        const requestConfig: axios.AxiosRequestConfig<{ password: string; username: string }> = {
            username: username,
            password: password,

            headers: {
                'x-api-key': 'FaKReIuD131792XyBt6B937x4GtF7OSW6Yd2ib3z'
            }
        }

        const requestBody = {
            username: username,
            password: password,

        }

        axios.post(loginURL, requestBody, requestConfig)
            .then(response => {

                setUserSession(response.data.user,response.data.token);
                setMessage("login successful");
                navigate('/premium');
                // props.history.push('premium')

            }).catch(error => {
            setMessage("login failed error: " + error);
        })
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input type="submit" value="Login" />
            </form>
            {message && <p className="message">{message}</p>}
        </div>
        // <div>
        //     <h1>Login</h1>
        //     <form onSubmit={handleSubmit}>
        //         <input type="text" placeholder="username" value={username}
        //                onChange={(e) => setUsername(e.target.value)}/>
        //         <input type="password" placeholder="password" value={password}
        //                onChange={(e) => setPassword(e.target.value)}/>
        //         <input type="submit" value="Login"/>
        //     </form>
        //     {message && <p className="message">{message}</p>}
        //
        // </div>
    )
}
export default Login;


