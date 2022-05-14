import React from 'react';
import {Route, Navigate} from 'react-router-dom'
import {useAuth,} from "./contexts/authContext"


const PrivateRoute = ({children}) => {

    
    const {currentUser} = useAuth();

    return currentUser ? children : <Navigate to="/admin-login" />;

    
}

export default PrivateRoute;