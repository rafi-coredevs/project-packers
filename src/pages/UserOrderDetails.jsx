import React from 'react';
import { useTitle } from '../Components/Hooks/useTitle';
import { useLoaderData } from 'react-router-dom';
import SideCard from '../Dashboard/Components/UiElements/SideCard/SideCard';
import Button from '../Components/UiElements/Buttons/Button';
import { terminal } from '../contexts/terminal/Terminal';

const UserOrderDetails = () => {
    useTitle("Orders");
    const order = useLoaderData();
    const handlePayment = () => {
        terminal.request({ name: 'payOrder', params: { id: order.id } }).then(data => {
            if (data.url) {
                window.location.replace(data.url);
            } else {
                toaster({ type: "error", message: data.message });
            }
        })
    }
    return (
        <div className='container mx-auto my-12'>
            <div className='mb-5'>
                <p className='text-xs text-slate-600'>Order Number</p>
                <p className='text-lg font-semibold'>#{order.orderNumber}</p>
            </div>
            <div className="grid grid-cols-3 gap-5">
                <div className="col-span-3 sm:col-span-2 grid gap-5">
                    <div className="grid gap-5 p-5 border rounded-lg">
                        <div className="flex justify-between">
                            <h3 className="text-base font-semibold">Products</h3>
                        </div>
                        <div className="grid gap-3 relative overflow-x-auto">
                            <table className="w-full ">
                                <thead className="text-left font-semibold">
                                    <tr className="border-b border-[#0000001c]">
                                        <th className="w-8/12 py-2">Product</th>
                                        <th className="w-2/12 py-2">Quantity</th>
                                        <th className="w-1/12 py-2">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        order === null ? <tr
                                            className="border-t border-[#0000001c]"
                                        >
                                            <td className="py-2">
                                                <div className="flex gap-2 items-center">
                                                    <div
                                                        className="w-10 h-10 rounded lazy-loading"
                                                    />
                                                    <div>
                                                        <p className="line-clamp-1 lazy-loading"><span className="invisible">product?.product?.name</span></p>
                                                        <p className="text-[#475569] lazy-loading">
                                                            <span className="invisible">price</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2">
                                                <input type="text" className='h-9 w-28 lazy-loading' />
                                            </td>
                                            <td><span className="py-2 px-8 lazy-loading"></span></td>

                                        </tr> :
                                            <>
                                                {order.products.length > 0 && order?.products.map((product) => {
                                                    return (
                                                        <tr
                                                            key={product?.id}
                                                            className="border-t border-[#0000001c]"
                                                        >
                                                            <td className="py-2">
                                                                <div className="flex gap-2 items-center">
                                                                    <img
                                                                        className="w-8 h-8 rounded border-b border-[#0000001c]"
                                                                        src={import.meta.env.VITE_SERVER_URL + '/' + product?.product?.images[0]}
                                                                        alt=""
                                                                    />
                                                                    <div className="">
                                                                        <p className="line-clamp-1">{product?.product?.name}</p>
                                                                        <p className="text-[#475569] ">
                                                                            ৳{product?.product?.price?.toFixed(2)}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="py-2">
                                                                {product?.productQuantity}

                                                            </td>
                                                            <td className="py-2"> ৳{(product?.product?.price?.toFixed(2) * (product?.productQuantity))}</td>

                                                        </tr>
                                                    );
                                                }
                                                )
                                                }
                                                {order?.requests.length > 0 && order?.requests.map((request) => {
                                                    return (
                                                        <tr
                                                            key={request?.id}
                                                            className="border-t border-[#0000001c]"
                                                        >
                                                            <td className="py-2">
                                                                <div className="flex gap-2 items-center">
                                                                    <img
                                                                        className="w-8 h-8 rounded border-b border-[#0000001c]"
                                                                        src={import.meta.env.VITE_SERVER_URL + '/' + request?.request?.images[0]}
                                                                        alt=""
                                                                    />
                                                                    <div className="">
                                                                        <p className="line-clamp-1">{request?.request?.name}</p>
                                                                        <p className="text-[#475569] ">
                                                                            ৳{request?.request?.price?.toFixed(2)}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="py-2">
                                                                {request?.requestQuantity}
                                                            </td>
                                                            <td className="py-2"> ৳{(request?.request?.price?.toFixed(2) * (request?.requestQuantity))}</td>

                                                        </tr>
                                                    );
                                                }
                                                )
                                                }
                                            </>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="grid gap-5 border border-[#0000001c] rounded-lg p-5">
                        <p className="text-base font-semibold">Payment</p>
                        <div className="grid gap-3">
                            <div className="flex justify-between items-center">
                                <button className=" text-sm">Subtotal</button>
                                <p className="">৳{order?.products?.reduce((accumulator = 0, product) => accumulator + ((product?.productQuantity) * (product?.product?.price)), 0) + order?.requests?.reduce((accumulator = 0, request) => accumulator + ((request?.requestQuantity) * (request?.request?.price)), 0)}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <button className="text-emerald-500 underline text-sm">
                                    Discount
                                </button>
                                <p className="">৳{order?.discountApplied?.amount || order?.discountApplied?.percentage ? (order?.discountApplied?.percentage + ' %') : 0}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <button className="text-emerald-500 underline text-sm">
                                    Shipping
                                </button>
                                <p className="">{""}</p>
                                <p className="">৳{order?.insideDhaka ? 99 : 199}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <button className="text-emerald-500 underline text-sm">
                                    Packers Fee
                                </button>
                                <p className="">{""}</p>
                                <p className="">৳{order?.products?.reduce((accumulator = 0, product) => accumulator + ((product?.productQuantity) * (product?.product?.fee)), 0) + order?.requests?.reduce((accumulator = 0, request) => accumulator + ((request?.requestQuantity) * (request?.request?.fee)), 0)}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <button className="text-emerald-500 underline text-sm">
                                    Estimated Tax
                                </button>
                                <p className="">৳{order?.products?.reduce((accumulator = 0, product) => accumulator + ((product?.productQuantity) * (product?.product?.tax)), 0) + order?.requests?.reduce((accumulator = 0, request) => accumulator + ((request?.requestQuantity) * (request?.request?.tax)), 0)}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-base font-semibold">Total</p>
                                <p className="text-lg font-semibold">৳ {order?.total}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 sm:col-span-1 h-fit grid gap-5 pb-3">
                    <div className=" border border-[#0000001c] divide-y  rounded-lg ">
                        <SideCard cross={false} types="contact" email={order?.user?.email || 'No email'} phone={order?.user?.phone || 'No Phone'} />
                        <SideCard
                            cross={false}
                            types="address"
                            title="Shipping Address"
                            address={order?.shippingaddress?.address + ', ' + order?.shippingaddress?.area + ', ' + order?.shippingaddress?.city + ', ' + order?.shippingaddress?.zip}
                        />
                    </div>
                    <div className=" border border-[#0000001c] divide-y  rounded-lg ">
                        <SideCard cross={false} types="note" message={order?.instructions || "Not Available"} />
                    </div>
                    {
                        (order.status === 'pending' || order.status === 'cancelled') && <div>
                            <Button type="primary" full onClick={handlePayment}>
                                Continue to payment
                            </Button>
                        </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default UserOrderDetails;