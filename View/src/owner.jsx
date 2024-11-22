import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const IsOwner = ({ isowner ,isloggedIn}) => {
    if (isloggedIn) {
        return <Outlet />;
    }
    return  <Navigate to="/login" replace /> ; // Render child routes if the user is an owner.
};

export default IsOwner;
