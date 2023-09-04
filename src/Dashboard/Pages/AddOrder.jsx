import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTitle } from '../../Components/Hooks/useTitle';
import { terminal } from '../../contexts/terminal/Terminal';
import Button from '../Components/UiElements/Button/Button';
import Heading from '../Components/UiElements/Heading/Heading';
import SideCard from '../Components/UiElements/SideCard/SideCard';
import Input from '../Components/UiElements/Input/Input';
import search from '../../assets/icons/cd-search2.svg';
import remove from '../../assets/icons/cd-cancel.svg';
import toaster from '../../Util/toaster';
import CustomSelect from '../../Components/UiElements/Input/CustomSelect';
import removeEmptyFields from '../../Util/removeEmptyFields';

const AddOrder = () => {
    useTitle('Order Details');
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();
    const [selectedOrderStatus, setSelectedOrderStatus] = useState({});
    const [customers, setCustomers] = useState([]);
    const [user, setUser] = useState({})
    const [inside, setInside] = useState(true);
    const [discount, setDiscount] = useState({})

    //formik intialization
    const shippingForm = useFormik({
        initialValues: {
            address: '',
            city: '',
            area: '',
            zip: '',
        },
    });
    const billingForm = useFormik({
        initialValues: {
            address: '',
            city: '',
            area: '',
            zip: '',
        },
    });

    /**
     * Handles selecting an order status.
     * @param {number} id - The ID of the selected status.
     */
    function orderStatusHandler(id) {
        const newStatus = orderStatuses.find((item) => item.id === id); // Find the selected order status by id
        odrerForm.setFieldValue('status', newStatus.value);
        setSelectedOrderStatus(newStatus);
    }

    // Fetch order data when the component mounts
    // useEffect(() => {
    //     fetchData();
    // }, []);

    /**
     * Fetches order data from the API and populates the form.
     */
    // const fetchData = () =>
    //     terminal
    //         .request({ name: 'singleOrder', params: { id: orderId } })
    //         .then((res) => {
    //             if (res.status === false) {
    //                 toaster({ type: 'error', message: res.message });
    //             } else {
    //                 setOrder(res);

    //                 //finding older status from order status array
    //                 let olderStatus = orderStatuses.find(
    //                     (status) => status.value === res.status,
    //                 );

    //                 // Set form values from the retrieved data
    //                 odrerForm.setFieldValue('status', olderStatus.value);
    //                 odrerForm.setFieldValue('address', res.shippingaddress.address);
    //                 odrerForm.setFieldValue('city', res.shippingaddress.city);
    //                 odrerForm.setFieldValue('area', res.shippingaddress.area);
    //                 odrerForm.setFieldValue('zip', res.shippingaddress.zip);

    //                 setSelectedOrderStatus(olderStatus);
    //             }
    //         })
    //         .catch((err) => console.error('error when page loaded', err));

    /**
     * Handles updating the order details.
     */
    const updateHandler = () => {
        const shipping = {
            address: shippingForm.values.address,
            city: shippingForm.values.city,
            area: shippingForm.values.area,
            zip: shippingForm.values.zip,
        };

        const billing = {
            address: billingForm.values.address,
            city: billingForm.values.city,
            area: billingForm.values.area,
            zip: billingForm.values.zip,
        };

        // Remove empty fields from shipping and billing
        removeEmptyFields(shipping);
        removeEmptyFields(billing);

        let data = {
            user: user.id,
            email: user.email,
            phone: user.phone,
            status: 'pending',
            shippingaddress: shipping,
            billingaddress: billing,
        };

        removeEmptyFields(data); //removing empty objects

        terminal
            .request({
                name: 'updateOrder',
                params: { id: orderId },
                body: data,
            })
            .then((res) => {
                if (res.status === false) {
                    toaster({ type: 'error', message: res.message });
                } else {
                    toaster({ type: 'success', message: 'successfully updated' });
                    navigate(-1);
                }
            })
            .catch((err) => console.error('order update error', err));
    };

    /**
     * Handles deletion of the order .
     */
    const deleteHandler = (e) => {
        e.preventDefault();

        terminal
            .request({ name: 'deleteOrder', body: { id: [orderId] } })
            .then((res) =>
                res?.status === false
                    ? toaster({ type: 'success', message: res.message })
                    : (toaster({
                        type: 'success',
                        message: 'deleted successfully',
                    }),
                        navigate(-1)),
            )
            .catch((err) => console.error('order delete error', err));
    };

    // Find Customer
    const findCustomer = (e) => {
        if (e.target.value !== '') {
            terminal.request({ name: 'allUser', queries: { email: JSON.stringify({ $regex: e.target.value }) } }).then(data => {
                setCustomers(data.docs)
            })
            return
        }
        setCustomers([])
    }


    const addDiscount = async (e) => {
        e.preventDefault();
        await terminal.request({
            name: "useDiscount",
            queries: { code: e.target.code.value.toUpperCase() },
        }).then(response => {
            if (response.code) {
                setDiscount(response);
            } else {
                toaster({
                    type: "error",
                    message:
                        response.message || "An error occurred. Please try again later",
                });
            }
        })
    };

    const removeDiscount = async () => {
        await terminal
            .request({ name: "abandonDiscount", queries: { code: discount.code } })
            .then((data) => {
                if (data.status) {
                    toaster({ type: "success", message: data.message });
                    setDiscount();
                }
            });
    };


    return (
        <div className='px-5 h-full'>
            <Heading type='navigate' title={`Add Order`} back={'All Order'}>
                <div className='flex items-center gap-1'>
                    <Button style='delete' onClick={deleteHandler}>
                        Delete
                    </Button>
                    <Button style='primary' onClick={updateHandler}>
                        Add to cart
                    </Button>
                </div>
            </Heading>
            <div className='grid grid-cols-3 gap-5'>
                <div className='col-span-3 sm:col-span-2 grid gap-5'>
                    {/* product or requests details */}
                    <div className='grid gap-5 p-5 border rounded-lg'>
                        {/*search title */}
                        <div className='flex justify-between'>
                            <h3 className='text-base font-semibold'>Products</h3>
                        </div>

                        {/* search */}
                        <div className='flex gap-2 items-center'>
                            <div className='w-full'>
                                <Input
                                    styles='secondary'
                                    type='text'
                                    placeholder='Search Products'
                                >
                                    <img className='opacity-70' src={search} />
                                </Input>
                            </div>
                            <Button style='outline'>Browse</Button>
                        </div>

                        {/* product table */}
                        <div className='grid gap-3 relative overflow-x-auto'>
                            <table className='w-full '>
                                <thead className='text-left font-semibold'>
                                    <tr className='border-b border-[#0000001c]'>
                                        <th className='w-8/12 py-2'>Product</th>
                                        <th className='w-2/12 py-2'>Quantity</th>
                                        <th className='w-1/12 py-2'>Total</th>
                                        <th className='w-1/12 py-2'></th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* payment details */}
                    <div className='grid gap-5 border border-[#0000001c] rounded-lg  '>
                        <p className='text-base font-semibold p-5 pb-0'>Payment</p>
                        <div className='grid gap-3 p-5'>
                            {/* subtotal */}
                            <div className='flex justify-between items-center'>
                                <button className=' text-sm'>Subtotal</button>
                                <p className=''>
                                    ৳
                                    {order?.products?.reduce(
                                        (accumulator = 0, product) =>
                                            accumulator +
                                            product?.productQuantity * product?.product?.price,
                                        0,
                                    )}
                                </p>
                            </div>

                            {/* discount */}
                            <div className='flex justify-between items-center'>
                                {
                                    discount?.code ?
                                        <>
                                            <button className='text-emerald-500 underline text-sm cursor-default'>
                                                Discount
                                            </button>
                                            <p className=''>
                                                ৳
                                                {discount?.amount ||
                                                    discount?.percentage
                                                    && discount?.percentage + ' %'
                                                }
                                            </p>
                                        </>

                                        : <>
                                            <form
                                                onSubmit={addDiscount}
                                                className="flex gap-2 flex-wrap justify-between w-full"
                                            >
                                                <button type='submit' className='text-emerald-500 underline text-sm'>
                                                    Add Discount
                                                </button>
                                                <input
                                                    name="code"
                                                    type="text"
                                                    placeholder="Discount code"
                                                    className='py-1 px-2 border border-slate-200    '
                                                />
                                            </form>
                                        </>
                                }

                            </div>

                            {/* shipping */}
                            <div className='flex justify-between items-center'>
                                <button className='text-emerald-500 underline text-sm'>
                                    Shipping
                                </button>
                                <div className=' flex items-center space-x-2'>
                                    <div className="flex gap-1">
                                        <input
                                            type="radio"
                                            id="shippingDhaka"
                                            checked={inside}
                                            value={true}
                                            onClick={() => {
                                                setInside(true);
                                            }}
                                            name="inSideDhaka"
                                            className="accent-orange-600"
                                        />
                                        <label
                                            htmlFor="shippingDhaka"
                                            className="flex justify-between items-center w-full "
                                        >
                                            <span>Inside Dhaka</span>
                                        </label>
                                    </div>
                                    <div className="flex gap-1">
                                        <input
                                            type="radio"
                                            id="shippingOutside"
                                            checked={!inside}
                                            value={false}
                                            name="insideDhaka"
                                            className="accent-orange-600"
                                            onClick={() => {
                                                setInside(false);
                                            }}
                                        />
                                        <label
                                            htmlFor="shippingOutside"
                                            className="flex justify-between items-center w-full "
                                        >
                                            <span>Outside Dhaka</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* packers fee */}
                            <div className='flex justify-between items-center'>
                                <button className='text-emerald-500 underline text-sm'>
                                    Packers Fee
                                </button>
                                <p className=''>
                                    ৳
                                    {order?.products?.reduce(
                                        (accumulator = 0, product) =>
                                            accumulator +
                                            product?.productQuantity * product?.product?.fee,
                                        0,
                                    )}
                                </p>
                            </div>

                            {/* estimated tax */}
                            <div className='flex justify-between items-center'>
                                <button className='text-emerald-500 underline text-sm'>
                                    Estimated Tax
                                </button>
                                <p className=''>
                                    ৳
                                    {order?.products?.reduce(
                                        (accumulator = 0, product) =>
                                            accumulator +
                                            product?.productQuantity * product?.product?.tax,
                                        0,
                                    )}
                                </p>
                            </div>

                            {/* total */}
                            <div className='flex justify-between items-center'>
                                <p className='text-base font-semibold'>Total</p>
                                <p className='text-lg font-semibold'>৳ {order?.total}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-3 sm:col-span-1 h-fit grid gap-5 pb-3'>
                    <div className=' border border-[#0000001c] divide-y  rounded-lg '>
                        {/* customer name */}
                        <div className='grid gap-5 p-5'>
                            <div className='flex justify-between'>
                                <p className='text-base text-secondary font-semibold'>Customer</p>

                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onClick;
                                    }}
                                >
                                </button>
                            </div>
                            <div className='relative w-full'>
                                <Input
                                    styles='secondary'
                                    type='text'
                                    placeholder='Search User'
                                    disabled={user.id}
                                    change={(e) => findCustomer(e)}
                                >
                                    <img className='opacity-70' src={search} />
                                </Input>
                                <table className='bg-white shadow-md absolute top-[44px] left-0 w-full'>
                                    {
                                        !user?.id && customers?.length > 0 &&
                                        customers.map(user =>
                                            <tr onClick={() => setUser(user)} className='hover:bg-primary hover:cursor-pointer'>
                                                <td className='p-2 border-b border-slate-200'>
                                                    {user.fullName}
                                                </td>
                                                <td className='p-2 border-b border-slate-200'>
                                                    {user.email}
                                                </td>
                                            </tr>)
                                    }
                                </table>
                            </div>
                            {user.fullName && <div className='flex justify-between items-center w-full'><p className='underline text-emerald-500'>{user.fullName}</p> <img src={remove} className='cursor-pointer' onClick={() => { setUser({}); setCustomers([]) }} alt="" /></div>}
                        </div>
                        {/* customer information */}
                        <SideCard
                            types='contact'
                            cross={false}
                            email={user?.email || 'No email'}
                            phone={user?.phone || 'No Phone'}
                        />

                        {/* shipping address */}
                        <SideCard
                            types='shipping'
                            title='Shipping Address'
                            editable={true}
                            formikProps={shippingForm}
                            address={
                                shippingForm?.values?.address +
                                ', ' +
                                shippingForm?.values?.city +
                                ', ' +
                                shippingForm?.values?.area +
                                ', ' +
                                shippingForm?.values?.zip
                            }
                        />
                        {/* billing */}
                        <SideCard
                            types='billing'
                            title='Billing Address'
                            formikProps={billingForm}
                            editable={true}
                            address={
                                billingForm?.values?.address +
                                ', ' +
                                billingForm?.values?.city +
                                ', ' +
                                billingForm?.values?.area +
                                ', ' +
                                billingForm?.values?.zip
                            }
                        />
                    </div>
                    {/* <div className=' border border-[#0000001c] divide-y  rounded-lg '>
                        <SideCard
                            types='note'
                            message={order?.instructions || 'Not Available'}
                        />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default AddOrder;