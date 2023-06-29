import React from "react";

import {Navigate, Route} from "react-router-dom";
import {getToken} from "../service/AuthService";

const PublicRoute = ({component: Component, ...rest}) => {



    return (
        <React.Fragment

        >

            {!getToken() ? <Component/> : <Navigate to="/premium"/>}

        </React.Fragment>

    )
}


export default PublicRoute;


