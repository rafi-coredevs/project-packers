import { useCallback, useEffect, useState } from 'react';
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
import removeEmptyFields from '../../Util/removeEmptyFields';
import CartItem from '../../Components/UiElements/CartItem/CartItem';
import { useLocation, useParams } from 'react-router-dom';

const AddOrder = () => {
    useTitle('Order Details');
    const [price, setPrice] = useState(null);
    const [order, setOrder] = useState({
        products: [],
    });
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [user, setUser] = useState({})
    const [inside, setInside] = useState(true);
    const [discount, setDiscount] = useState({})
    const [productDropDown, setProductDropDown] = useState(false)

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

    useEffect(() => {
        let discountItemsTotal = 0;
        let nondiscountItemsTotal = 0;
        let discountamount = 0;
        let totalPrice = 0;

        if (order) {
            order.products?.length > 0 && order.products.forEach((product) => {
                const total =
                    (product.product.price + product.product.tax + product.product.fee) *
                    product.productQuantity;
                if (
                    discount?.code &&
                    product.product.category.toString() === discount.category &&
                    product.product.subcategory.toString() === discount.subcategory
                ) {
                    discountItemsTotal += total;
                } else {
                    nondiscountItemsTotal += total;
                }
            });

            discountamount = discount?.percentage
                ? (discountItemsTotal * discount.percentage) / 100
                : discount?.amount;
            totalPrice = discountamount
                ? totalPrice + nondiscountItemsTotal - discountamount
                : totalPrice + nondiscountItemsTotal;
            totalPrice = inside ? totalPrice + 99 : totalPrice + 150;
            setPrice(totalPrice);
        }
    }, [order, discount, inside]);

    useEffect(() => {
        user.shippingaddress ? shippingForm.setValues({ ...user.shippingaddress }) : null
    }, [user])
    useEffect(() => {
        if (location.state != null) {
            setUser(location?.state?.userId)
        }
    }, [location])
    /**
     * Handles updating the order details.
     */
    const addHandler = () => {
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

        const products = order.products.map((product) => ({
            product: product.product.id,
            productQuantity: product.productQuantity,
        }));

        let data = {
            user: user.id,
            email: user.email,
            phone: user.phone,
            products,
            shippingaddress: shipping,
            billingaddress: billing,
            discountApplied: discount?.code,
        };

        removeEmptyFields(data); //removing empty objects
        terminal
            .request({
                name: 'createOrderByAdmin',
                body: data,
            })
            .then((res) => {
                if (res.status === false) {
                    toaster({ type: 'error', message: res.message });

                } else {
                    toaster({ type: 'success', message: res.message });
                    shippingForm.resetForm();
                    billingForm.resetForm();
                    setOrder({
                        products: []
                    })
                    setUser({})
                    setCustomers([])
                }
            })
            .catch((err) => console.error('order update error', err));
    };

    // Find Customer
    const findCustomer = (e) => {
        if (e.target.value !== '' && e.target.value.length > 2) {
            terminal.request({ name: 'allUser', queries: { email: JSON.stringify({ $regex: e.target.value, $options: 'i' }) } }).then(data => {
                setCustomers(data.docs)
            })
            return
        }
        setCustomers([])
    }

    //Find Product
    const findProducts = (e) => {
        if (e.target.value !== '' && e.target.value.length > 2) {
            setProductDropDown(true)
            terminal.request({ name: 'allProduct', queries: { name: JSON.stringify({ $regex: e.target.value, $options: 'i' }) } }).then(data => {
                setProducts(data.docs)
            })
            return
        }
        setProducts([])
    }


    const addDiscount = async (e) => {
        e.preventDefault();
        await terminal.request({
            name: "useDiscount",
            queries: { code: e.target.code.value.toUpperCase() },
        }).then(response => {
            if (response.code) {
                setDiscount(response);
                toaster({ type: "success", message: 'Discount applied' });
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

    const addProduct = (newProduct) => {
        if (order?.products.find(item => item.product.id === newProduct.id)) {
            return toaster({ type: 'error', message: 'Product already exists' })
        }
        setOrder(prev => {
            setProductDropDown(false)
            const updatedProducts = [...prev.products, { product: newProduct, productQuantity: 1 }];
            return { ...prev, products: updatedProducts };
        });
    }

    const removeProduct = (removedProduct) => {
        setOrder((prevOrder) => {
            const updatedProducts = prevOrder.products.filter(
                (item) => item.product.id !== removedProduct.id
            );
            return { ...prevOrder, products: updatedProducts };
        });
    };

    const updateQuantity = useCallback((id, quantity) => {
        setOrder((prevOrder) => {
            const updatedOrder = {
                ...prevOrder,
                products: prevOrder.products.map((item) =>
                    item.product.id === id ? { ...item, productQuantity: quantity } : item
                ),
            };
            return updatedOrder;
        });
    }, []);

    // Copying billing address to shipping address
    const shippingHandler = () => {
        billingForm.setValues({ ...shippingForm.values })
    }


    return (
        <div className='px-5 h-full'>
            <Heading type='navigate' title={`Add Order`} back={'All Order'}>
                <div className='flex items-center gap-1'>
                    <Button style='primary' onClick={addHandler}>
                        Add Order
                    </Button>
                </div>
            </Heading>
            <div className='grid grid-cols-3 gap-5'>
                <div className='col-span-3 sm:col-span-2 grid gap-5 h-fit'>
                    {/* product or requests details */}
                    <div className='grid gap-5 p-5 border rounded-lg'>
                        {/*search title */}
                        <div className='flex justify-between'>
                            <h3 className='text-base font-semibold'>Products</h3>
                        </div>

                        {/* search */}
                        <div className='relative'>
                            <div className='w-full'>
                                <Input
                                    styles='secondary'
                                    type='text'
                                    name='products'
                                    placeholder='Search Products'
                                    change={(e) => { findProducts(e) }}
                                >
                                    <img className='opacity-70' src={search} />
                                </Input>
                            </div>
                            <table className='bg-white shadow-md absolute top-[44px] left-0 w-full z-50'>
                                <tbody>
                                    {
                                        (products?.length > 0 && productDropDown) &&
                                        products.map(product =>
                                            <tr key={product.id} onClick={() => { addProduct(product); document.getElementById('products').value = "" }} className='hover:bg-primary hover:cursor-pointer'>
                                                <td className='p-2 border-b border-slate-200'>
                                                    {product.name}
                                                </td>
                                            </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>

                        {/* product table */}
                        <div className='grid gap-3 relative overflow-x-auto'>
                            <table className='w-full '>
                                <thead className=" text-secondary text-left border-b border-[#00000023]">
                                    <tr>
                                        <th className=" w-9/12 font-semibold pb-[14px]">
                                            Product List
                                        </th>
                                        <th className="w-1/12 font-semibold pb-[14px]">Quantity</th>
                                        <th className=" w-2/12 font-semibold pb-[14px] hidden sm:table-cell">
                                            Price
                                        </th>
                                        <th className="font-semibold pb-[14px] hidden sm:table-cell">
                                            Remove
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order?.products?.length > 0 && order?.products.map((product) => {
                                        return (
                                            <div key={product?.id}>
                                                <CartItem
                                                    key={product?.id}
                                                    data={product?.product}
                                                    quantity={product.productQuantity}
                                                    onChange={updateQuantity}
                                                    removeProduct={removeProduct}
                                                />
                                            </div>
                                        );
                                    })}
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
                                            <button onClick={removeDiscount} className='text-emerald-500 underline text-sm'>
                                                Remove Discount
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
                                                    className='py-1 px-2 border border-slate-200  outline-none rounded  '
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
                                <div className='flex items-center space-x-2'>
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
                                <p className='text-lg font-semibold'>৳ {price}</p>
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
                                    name={'customer'}
                                    placeholder='Search User'
                                    change={(e) => findCustomer(e)}
                                >
                                    <img className='opacity-70' src={search} />
                                </Input>
                                <table className='bg-white shadow-md absolute top-[44px] left-0 w-full'>
                                    {
                                        !user?.id && customers?.length > 0 &&
                                        customers.map((user, index) =>
                                            <tr key={index} onClick={() => { setUser(user); document.getElementById('customer').value = "" }} className='hover:bg-primary hover:cursor-pointer'>
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
                            {user.fullName && <div className='flex justify-between items-center w-full'><p className='underline text-emerald-500'>{user.fullName}</p> <img src={remove} className='cursor-pointer' onClick={() => { setUser({}); setCustomers([]); shippingForm.resetForm(); billingForm.resetForm() }} alt="" /></div>}
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
                                ' ' +
                                shippingForm?.values?.city +
                                ' ' +
                                shippingForm?.values?.area +
                                ' ' +
                                shippingForm?.values?.zip
                            }
                        />
                        {/* billing */}
                        <SideCard
                            types='billing'
                            title='Billing Address'
                            formikProps={billingForm}
                            onClick={shippingHandler}
                            editable={true}
                            address={
                                billingForm?.values?.address +
                                ' ' +
                                billingForm?.values?.city +
                                ' ' +
                                billingForm?.values?.area +
                                ' ' +
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