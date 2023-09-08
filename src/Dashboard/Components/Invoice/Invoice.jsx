/**
 * Invoice() 
 * 
 * @param {object} args.data - object of data sets.
 * 
 * @returns Invoice JSX Element.
 */
import React, { useRef } from 'react';
import logo from '../../../assets/logo.svg'
import { usePDF, Margin, Resolution } from 'react-to-pdf';
import Button from '../UiElements/Button/Button';

const Invoice = ({ data }) => {
    const { name, email, phone, address, date, invoiceId, orderId, products, total, paid, notes } = data;
    const { toPDF, targetRef } = usePDF({
        method: "save",
        filename: "usepdf-example.pdf",
        resolution: Resolution.HIGH,
        page: {
            margin: Margin.MEDIUM,
            format: 'A4'
        }
    });

    return (
        <>
            <div id="invoice" className="h-10">
                <Button onClick={toPDF}>Download Invoice</Button>
            </div>
            <div ref={targetRef} className='w-full h-auto border border-[#ededed] mx-auto p-5'>
                <header className='my-4 text-xl'>
                    <div className="flex justify-between mt-2">
                        <img className='h-8 w-auto' src={logo} alt="" />
                        <div className="">
                            <p className="font-bold">Date: {`${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`}</p>
                            <p className="font-bold">Invoice: #{invoiceId || ""}</p>
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
                    <h1 className=' text-primary text-center font-bold text-xl py-1'>Invoice</h1>

                </header>
                <article>
                    <table class="w-full border-y  border-[#ededed] my-2">
                        <thead>
                            <tr className='border-b border-[#ededed]'>
                                <th className='text-left w-[3   %] pb-3'>SL</th>
                                <th className='text-left w-[55%] pb-3 '><span contenteditable>Product</span></th>
                                <th className='text-left w-[10%] pb-3'><span contenteditable>Quantity</span></th>
                                <th className='text-left  w-[15%] pb-3'><span contenteditable>Price</span></th>
                                <th className='text-end  w-[15%] pb-3'><span contenteditable>Total</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map((item, index) => {
                                return (
                                    <tr key={index} className='border-[#ededed] border-b text-xl' >
                                        <td className='pb-3 w-[3%]'>{index + 1}</td>
                                        <td className='pb-3 w-[55%] text-xl'> {item.title || ""}</td>
                                        <td className='pb-3 w-[15%]'>{item.quantity || 0}</td>
                                        <td className='pb-3 w-[15%]'>{item.price || 0} tk</td>
                                        <td className='pb-3 text-end w-[15%]'>{(item.price * item.quantity) || 0} tk</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    <table class="balance ms-auto text-xl">
                        <tr>
                            <th className='text-start'><span >Total:</span></th>
                            <td className='text-end'><span>{total.toFixed(2)}</span><span >tk</span></td>
                        </tr>
                        <tr>
                            <th className='text-start'><span >Amount Paid:</span></th>
                            <td className='text-end'><span >{paid.toFixed(2)}</span><span >tk</span></td>
                        </tr>
                        <tr>
                            <th className='text-start'><span >Balance Due:</span></th>
                            <td className='text-end'><span>{(total - paid).toFixed(2)}</span><span >tk</span></td>
                        </tr>
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