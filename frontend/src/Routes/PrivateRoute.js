import React from "react";

import {Navigate, Route} from "react-router-dom";
import {getToken} from "../service/AuthService";

const PrivateRoute = ({component: Component, ...rest}) => {


    console.log(getToken())
    return (
        <React.Fragment

        >

            {getToken() ? <Component/> : <Navigate to="/login"/>}

        </React.Fragment>

    )
}

export default PrivateRoute;





