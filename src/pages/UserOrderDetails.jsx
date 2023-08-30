import React from 'react';
import { useTitle } from '../Components/Hooks/useTitle';
import { useLoaderData } from 'react-router-dom';

const UserOrderDetails = () => {
    useTitle("Orders");
    const order = useLoaderData();
    console.log(order);
    return (
        <div className='container mx-auto my-12'>
            <div>
                <p className='text-xs text-slate-600'>Order Numer</p>
                <p className='text-lg font-semibold'>#{order.orderNumber}</p>
            </div>

        </div>
    );
};

export default UserOrderDetails;