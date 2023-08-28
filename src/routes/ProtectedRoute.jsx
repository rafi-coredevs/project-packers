import React, { useEffect } from 'react'
import { UserProvider, useUserCtx } from '../contexts/user/UserContext'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Unauthorized from './Unauthorized';

export default function ProtectedRoute({ accessTo, children }) {

    const { user, loading } = useUserCtx();
    const navigate = useNavigate();
    // 
    const accessByRole = {
        //  to be checked; super-admin doesn't 
        "super-admin": ["order", "support", "product", "request", "dashboard", "staff", "customer", "category", "payment"],
        "admin": ["order", "support", "product", "request", "dashboard", "customer", "category"],
        "staff": ["order", "support", "request", "customer"],
        "user": [],
    }
    // 
    if (loading) {
        return <Loading />
    }
    else {
        if (!user) {
            navigate("/login");
        }
        else if (accessByRole[user.role].includes(accessTo)) {
            return <>{children}</>
        }
        else {
            // return <span>{JSON.stringify(user)}</span>
            return <Unauthorized />
        }
    }
}