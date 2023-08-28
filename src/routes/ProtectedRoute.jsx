import React, { useEffect } from 'react'
import { UserProvider, useUserCtx } from '../contexts/user/UserContext'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Unauthorized from './Unauthorized';

export default function ProtectedRoute({ requestFor, children }) {

    const { user, loading } = useUserCtx();
    const navigate = useNavigate();
    // 
    const accessByRole = {
        "super-admin": ["order", "support", "product", "request", "dashboard"],
        "admin": ["order", "support", "product", "request"],
        "staff": ["order", "support"],
        "customer": [],
    }
    useEffect(() => { // no use, for test
        console.log(user.role)
    }, [])
    // 
    if (loading) {
        return <Loading />
    }
    else {
        if (!user) {
            navigate("/login");

        }
        else if (accessByRole[user.role].includes(requestFor)) {
            return { children }
        }
        else {
            return <Unauthorized />
        }
    }

}