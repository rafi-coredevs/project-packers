/**
 * Invoice() 
 * 
 * @param {object} args.data - object of data sets.
 * 
 * @returns Invoice JSX Element.
 */
import React from 'react';
import logo from '../../../assets/logo.svg'
const DUMMY_DATA = {
    invoiceId: 1234,
    orderId: 1234,
    name: 'Jhon Doe',
    email: "example@domain.com",
    phone: +8801743986617,
    address: '101 E. Chapman Ave Orange, CA 92866',
    date: new Date(),
    products:[{
        title: 'Iphone 12 pro',
        quantity: 12,
        price: 599,
    },
    {
        title: 'Iphone 12 ',
        quantity: 1,
        price: 369,
    },
    {
        title: 'samsung s20 Ultra samsung s20 Ultra samsung s20 Ultra',
        quantity: 2,
        price: 499,
    }],
    total: 12000,
    paid: 7590,
    notes: 'Please pack carefully. its a Glass product'
}

const Invoice = () => {
    const { name, email, phone, address, date, invoiceId, orderId, products, total, paid, notes } = DUMMY_DATA;
    return (
        <div className='w-[37.1875rem] h-auto border border-[#ededed] mx-auto p-5'>
            <header className='text-sm my-4'>
                <div className="flex justify-between mt-2">
                    <img className='h-8 w-auto' src={logo} alt="" />
                    <div className="">
                        <p className="font-bold">Date: {`${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()}`}</p>
                        <p className="font-bold">Invoice: #{invoiceId || ""}</p>
                        <p className="font-bold">Order: #{orderId || ""}</p>
                    </div>
                </div>
                <div className="flex justify-between items-end">
                    <div className="my-2">
                        <p>Name: {name || "Customer Name"}</p>
                        <p className="">Email: {email || 'example@domain.com'}</p>
                        <p>Phone: {phone || "(800) 555-1234"}</p>
                    </div>
                    <address className='w-[40%]'>
                        <p>Address: {address || '101 E. Chapman Ave Orange, CA 92866'}</p>
                    </address>
                </div>
                <h1 className=' text-primary text-center font-bold text-xl py-1'>Invoice</h1>

            </header>
            <article>

                <table class="w-full border-y border-[#ededed] my-2">
                    <thead>
                        <tr className='border-b border-[#ededed]'>
                            <th className='text-left w-[60%] '><span contenteditable>Product</span></th>
                            <th className='text-left w-[10%]'><span contenteditable>Quantity</span></th>
                            <th className='text-left  w-[15%]'><span contenteditable>Price</span></th>
                            <th className='text-end  w-[15%]'><span contenteditable>Total</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((item, index)=>{
                            return (
                                <tr key={index} className='border-[#ededed] border-b' >
                                   
                                    <td className='py-2 w-[55%] text-xs'> {item.title || ""}</td>
                                    <td className='py-2 w-[15%]'>{item.quantity || 0}</td>
                                    <td className='py-2 w-[15%]'>{item.price || 0} tk</td>
                                    <td className='py-2 text-end w-[15%]'>{(item.price * item.quantity) || 0} tk</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                
                <table class="balance ms-auto">
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
            <aside>
                <h1 className='mt-4 border-[#ededed] border-b mb-2'><span >Additional Notes</span></h1>
                <div >
                    <p className='text-xs'>{notes}</p>
                </div>
            </aside>
        </div>
    );
    
};

export default Invoice;