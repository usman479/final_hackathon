import React from 'react';
import {Route, Navigate} from 'react-router-dom'
import {useAuth,} from "./contexts/authContext"


const SignInRoute = ({children}) => {

    
    const {currentUser} = useAuth();

    return currentUser ? <Navigate to="/admin-home" />: children ;

    
}

export default SignInRoute;