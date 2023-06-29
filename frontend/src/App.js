import './App.css';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Premium from "./Premium";
import Login from "./Login";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";
import React from "react";
import {useEffect, useState} from "react";
import {getToken, getUser, resetUserSession, setUserSession} from "./service/AuthService";
import axios from "axios";


const verifyTokenApi = "https://xtjuhav0wg.execute-api.ap-south-1.amazonaws.com/prod/verify"


function App() {

    const [isAuthenticating, setIsAuthenticating] = useState(true)

    useEffect(() => {
        const token = getToken()
        if (token === null || token === undefined || !token) {
            return
        }
        const requestConfig: axios.AxiosRequestConfig<{ user: string; token: string; }> = {
            user: getUser(),
            token: token,
            headers: {
                'x-api-key': 'FaKReIuD131792XyBt6B937x4GtF7OSW6Yd2ib3z'
            }
        }

        const requestBody = {
            user: getUser(),
            token: token,
        }

        axios.post(verifyTokenApi, requestBody, requestConfig)
            .then(response => {
                setUserSession(response.data.user, response.data.token)
                setIsAuthenticating(false)
                console.log("verifyTokenApi")
            }).catch(error => {
            resetUserSession()
            setIsAuthenticating(false)
            console.log(error)
        })
    }, [])

    const token = getToken()
    if (isAuthenticating && token) {
        return <div>Loading...</div>
    }
    return (
        <div className="App">
            <BrowserRouter>
                <header>
                    <NavLink exact to="/" className="logo">
                        File Uploader
                    </NavLink>
                    <nav>
                        <NavLink to="/register">Register</NavLink>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/premium">Premium</NavLink>
                    </nav>
                </header>
                <div className="content">

                    <Routes>

                        {/*<Route exact path='/' component={<Home/>}/>*/}
                        <Route path="/" element={<PublicRoute component={Home} />} />

                        <Route path="/register" element={<PublicRoute component={Register} />} />
                        <Route path="/login" element={<PublicRoute component={Login} />} />
                        <Route path="/premium" element={<PrivateRoute component={Premium} />} />



                    </Routes>

                </div>

            </BrowserRouter>
        </div>
    );
}

export default App;
