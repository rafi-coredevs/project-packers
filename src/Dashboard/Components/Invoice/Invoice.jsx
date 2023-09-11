/**
 * Invoice() 
 * 
 * @param {object} args.data - object of data sets.
 * 
 * @returns Invoice JSX Element.
 */
import React, { useEffect, useState } from 'react';
import logo from '../../../assets/logo.svg'
import { usePDF, Margin, Resolution } from 'react-to-pdf';
import Button from '../UiElements/Button/Button';

const Invoice = ({ data }) => {
    const { name, email, phone, address, date, orderId, products, request, total, paid, notes } = data;
    const [tax, setTax] = useState(0);
    const [fee, setFee] = useState(0);
 let subTotal = 0;
    useEffect(() => {
        const initial = 0;
        const initial2 = 0;
        const fees = products?.reduce((sum, item) => sum + item?.product?.fee, initial)
        setFee((prev) => typeof fees === 'number' ? prev + fees : prev);
        const taxes = products?.reduce((sum, item) => sum + item?.product?.tax, initial2)
        setTax((prev)=> typeof taxes === 'number' ? prev + taxes : prev);
    }, [data])
    const { toPDF, targetRef } = usePDF({
        method: "save",
        filename: "usepdf-example.pdf",
        resolution: Resolution.NORMAL,
        page: {
            margin: Margin.SMALL,
            format: 'A4'
        }
    });

    return (
        <>
            <div id="invoice" className="h-10">
                <Button onClick={toPDF}></Button>
            </div>
            <div ref={targetRef} className='w-full h-auto border border-[#ededed] mx-auto p-5 bg-white'>
                <header className='my-4 text-xl'>
                    <div className="flex justify-between mt-2">
                        <img className='h-8 w-auto' src={logo} alt="" />
                        <div className="">
                            <p className="font-bold">Date: {`${date?.getDate() || 0}/${(date?.getMonth() + 1) || 0}/${date?.getFullYear() || 0}`}</p>
                            {/* <p className="font-bold">Invoice: #{invoiceId || ""}</p> */}
                            <p className="font-bold">Order: #{orderId || ""}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-end text-lg">
                        <div className="my-2">
                            <p>Name: {name || "Customer Name"}</p>
                            <p className="">Email: {email || 'example@domain.com'}</p>
                            <p>Phone: {phone || "(800) 555-1234"}</p>
                        </div>
                        <address className='w-[20%] text-left'>
                            <p>Address: {address || '101 E. Chapman Ave Orange, CA 92866'}</p>
                        </address>
                    </div>
                    <h1 className=' text-secondary text-center font-bold text-xl py-1'>Invoice</h1>

                </header>
                <article>
                    <table className="w-full border-y  border-[#ededed] my-2">
                        <thead>
                            <tr className='border-b border-[#ededed]'>
                                <th className='text-left w-[3   %] pb-3'>SL</th>
                                <th className='text-left w-[55%] pb-3 '><span >Product</span></th>
                                <th className='text-center w-[10%] pb-3'><span >Quantity</span></th>
                                <th className='text-left  w-[15%] pb-3'><span >Price</span></th>
                                <th className='text-end  w-[15%] pb-3'><span >Total</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map((item, index) => {
                                subTotal += item?.product?.price * item?.productQuantity
                                return (
                                    <tr key={index} className='border-[#ededed] border-b text-xl' >
                                        <td className='pb-3 w-[3%]'>{index + 1}</td>
                                        <td className='pb-3 w-[55%] text-xl'> {item?.product?.name || ""}</td>
                                        <td className='pb-3 text-center w-[15%]'>{item?.productQuantity || 0}</td>
                                        <td className='pb-3 w-[15%]'>{item?.product?.price || 0} tk</td>
                                        <td className='pb-3 text-end w-[15%]'>{(item?.product?.price * item?.productQuantity) || 0} tk</td>
                                    </tr>
                                )
                            })}
                            {request?.map((item, index) => {
                                console.log(item?.product?.price * item?.productQuantity)
                                subTotal += item?.product?.price * item?.productQuantity

                                return (
                                    <tr key={index} className='border-[#ededed] border-b text-xl' >
                                        <td className='pb-3 w-[3%]'>{index + 1}</td>
                                        <td className='pb-3 w-[55%] text-xl'> {item?.product?.name || ""}</td>
                                        <td className='pb-3 text-center w-[15%]'>{item?.productQuantity || 0}</td>
                                        <td className='pb-3 w-[15%]'>{item?.product?.price || 0} tk</td>
                                        <td className='pb-3 text-end w-[15%]'>{(item?.product?.price * item?.productQuantity) || 0} tk</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    <table className="balance ms-auto text-xl">
                        <tbody>

                            <tr>
                                <th className='text-start'><span >Subtotal:</span></th>
                                <td className='text-end'><span>{subTotal}</span><span > tk</span></td>
                            </tr>
                            <tr>
                                <th className='text-start'><span >Tax:</span></th>
                                <td className='text-end'><span >{tax}</span><span > tk</span></td>
                            </tr>
                            <tr>
                                <th className='text-start'><span >packers Fee:</span></th>
                                <td className='text-end'><span>{fee}</span><span > tk</span></td>
                            </tr>
                            <tr>
                                <th className='text-start'><span >Shipping Fee:</span></th>
                                <td className='text-end'><span>{fee}</span><span > tk</span></td>
                            </tr>
                            <tr>
                                <th className='text-start'><span >Total:</span></th>
                                <td className='text-end'><span>{total?.toFixed(2)}</span><span > tk</span></td>
                            </tr>
                        </tbody>
                    </table>
                </article>
                <aside className='text-xl'>
                    <h1 className='mt-4 border-[#ededed] border-b pb-3'><span >Additional Notes</span></h1>
                    <div >
                        <p className='text-xl'>{notes}</p>
                    </div>
                </aside>
            </div>
        </>
    )


};

export default Invoice;