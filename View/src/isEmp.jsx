import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const IsEmp = ({ isowner,isloggedIn }) => {
    console.log(isowner)
    if  (isloggedIn) {
        return <Outlet /> ;
    }
    return <Navigate to="/Emplogin" replace /> ; // Render child routes if the user is an employee.
};

export default IsEmp;
