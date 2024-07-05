import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateComponent = () => {

    try{
        const auth = localStorage.getItem('users');
        // const auth = true;
        return auth ? <Outlet/> : <Navigate to='/signup' />;
    } catch (error){
        console.error("Error occurred while accessing local storage:", error);
        // Handle the error, for example, redirecting to a generic error page
        return <Navigate to='/error' />;
    }
}

export default PrivateComponent
