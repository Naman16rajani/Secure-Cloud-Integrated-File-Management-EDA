import React from "react";
import {getUser, resetUserSession} from "./service/AuthService";
import {Navigate, useNavigate} from "react-router-dom";
import FileUploader from "./fileUploader/FileUploader";


const Premium = (props) => {
    const navigate = useNavigate();

    const user = getUser()
    const name = user !== 'undefined' && user ? user.name : 'Guest';

    function logoutHandler() {
        resetUserSession();
        navigate('/login')
    }

    return (
        <div>
            <h1>hello {name}</h1>
            <br/>
            <input type="button" value="Logout" onClick={logoutHandler} className="cta-button"/>
            <FileUploader></FileUploader>
        </div>
    )
}


export default Premium;


