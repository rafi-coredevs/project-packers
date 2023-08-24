import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollTop = () => {
    const location = useLocation()
    useEffect(()=>{
        window.scrollTo({top: 0, left: 0, behavior:'smooth'})
    },[location])
};

export default ScrollTop;