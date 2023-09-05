import React from 'react'
import { useUserCtx } from '../contexts/user/UserContext'
import { Navigate, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Unauthorized from './Unauthorized';
import { useLocation } from 'react-router-dom';

export default function ProtectedRoute({ accessTo, children }) {

    const { user, loading } = useUserCtx();
    const navigate = useNavigate();
    const location = useLocation();

    // 
    const accessByRole = {
        'super-admin': ['order', 'support', 'product', 'discount', 'request', 'dashboard', 'staff', 'customer', 'category', 'payment', 'general'],
        'admin': ['order', 'support', 'product', 'request', 'dashboard', 'customer', 'category', 'general'],
        'staff': ['order', 'support', 'request', 'customer', 'product', 'general'],
        'user': ['general'],
    }
    //
    // useEffect(() => {
    // }, [user, loading,accessTo])

    if (loading) {
        return <Loading />
    }
    else {
        if (!user) {
            if (accessTo == "login" || accessTo == "signup" || accessTo == "recover") {
                return <>{children}</>
            }
            else {
                navigate('/login', { state: { afterLogin: location.pathname } });
            }
        }
        else {
            console.log(accessTo, "  <?>   ", user.role)
            if (accessTo == "login" || accessTo == "signup" || accessTo == "recover") {
                return <Navigate to="/" replace={true} />
            }
            else if (accessByRole[user.role].includes(accessTo)) {
                return <>{children}</>
            }
            else {
                return <Unauthorized />
            }
        }
    }

}