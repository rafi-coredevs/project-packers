/**
 * OrderDetails()
 * order details page
 * @returns JSX Element
 */

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTitle } from '../../Components/Hooks/useTitle';
import { terminal } from '../../contexts/terminal/Terminal';
import Button from '../Components/UiElements/Button/Button';
import Heading from '../Components/UiElements/Heading/Heading';
import SideCard from '../Components/UiElements/SideCard/SideCard';
import Input from '../Components/UiElements/Input/Input';
import remove from '../../assets/icons/cd-cancel.svg';
import toaster from '../../Util/toaster';
import CustomSelect from '../../Components/UiElements/Input/CustomSelect';
import removeEmptyFields from '../../Util/removeEmptyFields';
import Invoice from '../Components/Invoice/Invoice';
import toast from 'react-hot-toast';

const OrderDetails = () => {
	useTitle('Order Details');
	const { orderId } = useParams();
	const [order, setOrder] = useState(null);
	const [selectedOrderStatus, setSelectedOrderStatus] = useState({});
	const [invoiceData, setInvoiceData] = useState({})
	const navigate = useNavigate();
	const fetchData = () =>
		terminal
			.request({ name: 'singleOrder', params: { id: orderId } })
			.then((res) => {
				if (res.status === false) {
					toaster({ type: 'error', message: res.message });
				} else {
					setOrder(res);

					//finding older status from order status array
					let olderStatus = orderStatuses.find(
						(status) => status.value === res.status,
					);

					// Set form values from the retrieved data
					odrerForm.setFieldValue('status', olderStatus.value);
					odrerForm.setFieldValue('address', res.shippingaddress.address);
					odrerForm.setFieldValue('city', res.shippingaddress.city);
					odrerForm.setFieldValue('area', res.shippingaddress.area);
					odrerForm.setFieldValue('zip', res.shippingaddress.zip);

					setSelectedOrderStatus(olderStatus);
				}
			})
			.catch((err) => console.error('error when page loaded', err));

	// Fetch order data when the component mounts
	useEffect(() => {
		fetchData();

	}, []);

	// formik initailization
	const odrerForm = useFormik({
		initialValues: {
			status: '',
			address: '',
			city: '',
			area: '',
			zip: '',
		},
	});

	// for status
	const orderStatuses = [
		{ id: 1, name: 'Completed', value: 'completed' },
		{ id: 2, name: 'Pending', value: 'pending' },
		{ id: 3, name: 'Processing', value: 'processing' },
		{ id: 4, name: 'Shipping', value: 'shipping' },
		{ id: 5, name: 'Cancelled', value: 'cancelled' },
		{ id: 6, name: 'Paid', value: 'paid' },
		{ id: 7, name: 'Refunded', value: 'refunded' },
		{ id: 8, name: 'Refund Processing', value: 'refundProcessing' },
	];

	/**
	 * Handles selecting an order status.
	 * @param {number} id - The ID of the selected status.
	 */
	function orderStatusHandler(id) {
		const newStatus = orderStatuses.find((item) => item.id === id); // Find the selected order status by id
		odrerForm.setFieldValue('status', newStatus.value);
		setSelectedOrderStatus(newStatus);
	}


	/**
	 * Handles updating the order details.
	 */
	const updateHandler = () => {
		const shipping = {
			address: odrerForm.values.address,
			city: odrerForm.values.city,
			area: odrerForm.values.area,
			zip: odrerForm.values.zip,
		};

		const billing = {
			address: odrerForm.values.address,
			city: odrerForm.values.city,
			area: odrerForm.values.area,
			zip: odrerForm.values.zip,
		};

		// Remove empty fields from shipping and billing
		removeEmptyFields(shipping);
		removeEmptyFields(billing);

		let data = {
			status: odrerForm.values.status,
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
					? toaster({ type: 'error', message: res.message })
					: (toaster({
						type: 'success',
						message: 'deleted successfully',
					}), navigate('/admin/orders', { replace: true })),

			)
			.catch((err) => console.error('order delete error', err));
	};

	const generatePdf = async () => {
		const btn = document.getElementById('invoice')
		btn.firstChild.click();

	};
	const feesCalculation = () => {
		const packers = order?.products?.reduce(
			(accumulator = 0, product) =>
				accumulator +
				product?.productQuantity * product?.product?.fee,
			0,
		) +
			order?.requests?.reduce(
				(accumulator = 0, request) =>
					accumulator +
					request?.requestQuantity * request?.request?.fee,
				0,
			)

	}
	useEffect(() => {
		feesCalculation()
		const data = {
			orderId: order?.orderNumber,
			name: order?.user?.fullName,
			email: order?.user?.email,
			phone: order?.user?.phone,
			address: `${order?.shippingaddress?.address}, ${order?.shippingaddress?.area}, ${order?.shippingaddress?.city}`,
			date: new Date(),
			products: order?.products || [],
			request: order?.requests || [],
			notes: order?.instructions || '',
			total: order?.total,

		}
		setInvoiceData(data);

	}, [order])
	return (
		<div className='px-5 h-full'>
			<div className="absolute bottom-[500rem]">  {/*absolute bottom-[500rem] */}
				<Invoice data={invoiceData} shipping={(order?.insideDhaka ? 99 : 199) || 0} discount={(order?.discountApplied?.amount ||
					order?.discountApplied?.percentage
					? order?.discountApplied?.percentage + ' %'
					: 0) || 0} tax={order?.products?.reduce(
						(accumulator = 0, product) =>
							accumulator +
							product?.productQuantity * product?.product?.tax,
						0,
					) +
						order?.requests?.reduce(
							(accumulator = 0, request) =>
								accumulator +
								request?.requestQuantity * request?.request?.tax,
							0,
						) || 0} fees={order?.products?.reduce(
							(accumulator = 0, product) =>
								accumulator +
								product?.productQuantity * product?.product?.fee,
							0,
						) +
							order?.requests?.reduce(
								(accumulator = 0, request) =>
									accumulator +
									request?.requestQuantity * request?.request?.fee,
								0,
							)} />
			</div>
			<Heading type='navigate' title={`#${order?.orderNumber || ""}`} back={'All Order'}>
				<div className='flex items-center gap-1'>
					<Button onClick={generatePdf}>Download Invoice</Button>
					<Button style='delete' onClick={deleteHandler}>
						Delete
					</Button>
					<Button style='primary' onClick={updateHandler}>
						Update
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
									{/* if there is no order */}
									{order === null ? (
										<tr className='border-t border-[#0000001c]'>
											<td className='py-2'>
												<div className='flex gap-2 items-center'>
													<div className='w-10 h-10 rounded lazy-loading' />
													<div>
														<p className='line-clamp-1 lazy-loading'>
															<span className='invisible'>
																product?.product?.name
															</span>
														</p>
														<p className='text-[#475569] lazy-loading'>
															<span className='invisible'>price</span>
														</p>
													</div>
												</div>
											</td>
											<td className='py-2'>
												<input type='text' className='h-9 w-28 lazy-loading' />
											</td>
											<td>
												<span className='py-2 px-8 lazy-loading'></span>
											</td>
											<td className='py-2 text-right'>
												{/* <button
													className='pe-3'
													onClick={() => console.log('first')}
												>
													<div className='h-4 w-4 lazy-loading' />
												</button> */}
											</td>
										</tr>
									) : (
										// if order is not null
										<>
											{order.products.length > 0 &&
												// if there any product
												order?.products.map((product) => {
													return (
														<tr
															key={product?.id}
															className='border-t border-[#0000001c]'
														>
															{/* product name and image */}
															<td className='py-2'>
																<div className='flex gap-2 items-center'>
																	<img
																		className='w-8 h-8 rounded border-b border-[#0000001c]'
																		src={
																			import.meta.env.VITE_SERVER_URL +
																			'/' +
																			product?.product?.images[0]
																		}

																		alt=''
																	/>
																	<div className=''>
																		<p className='line-clamp-1'>
																			{product?.product?.name}
																		</p>
																		<p className='text-[#475569] '>
																			৳{product?.product?.price?.toFixed(2)}
																		</p>
																	</div>
																</div>
															</td>

															{/* quantity */}
															<td className='py-2'>
																<Input
																	styles='quantity'
																	buttonDisabled={true}
																	disabled={true}
																	value={product?.productQuantity}
																/>
															</td>

															{/* total */}
															<td className='py-2'>
																৳
																{product?.product?.price?.toFixed(2) *
																	product?.productQuantity}
															</td>

															{/* close */}
															<td className='py-2 text-right'>
																{/* <button
																	className='pe-3'
																	onClick={() => console.log('first')}
																>
																	<img
																		className='h-4 w-4'
																		src={remove}
																		alt=''
																	/>
																</button> */}
															</td>
														</tr>
													);
												})}

											{/* if there any request */}
											{order?.requests.length > 0 &&
												order?.requests.map((request) => {
													return (
														<tr
															key={request?.id}
															className='border-t border-[#0000001c]'
														>
															{/* request image */}
															<td className='py-2'>
																<div className='flex gap-2 items-center'>
																	<img
																		className='w-8 h-8 rounded border-b border-[#0000001c]'
																		src={
																			import.meta.env.VITE_SERVER_URL +
																			'/' +
																			request?.request?.images[0]
																		}

																		alt=''
																	/>
																	<div className=''>
																		<p className='line-clamp-1'>
																			{request?.request?.name}
																		</p>
																		<p className='text-[#475569] '>
																			৳{request?.request?.price?.toFixed(2)}
																		</p>
																	</div>
																</div>
															</td>

															{/* request quantity */}
															<td className='py-2'>
																<Input
																	styles='quantity'
																	buttonDisabled={true}
																	disabled={true}
																	value={request?.requestQuantity}
																/>
															</td>

															{/* total price */}
															<td className='py-2'>
																৳
																{request?.request?.price?.toFixed(2) *
																	request?.requestQuantity}
															</td>

															{/* close */}
															<td className='py-2 text-right'>
																{/* <button
																	className='pe-3'
																	onClick={() => console.log('first')}
																>
																	<img
																		className='h-4 w-4'
																		src={remove}
																		alt=''
																	/>
																</button> */}
															</td>
														</tr>
													);
												})}
										</>
									)}
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
									) +
										order?.requests?.reduce(
											(accumulator = 0, request) =>
												accumulator +
												request?.requestQuantity * request?.request?.price,
											0,
										) || 0}
								</p>
							</div>

							{/* discount */}
							<div className='flex justify-between items-center'>
								<button className='text-emerald-500 underline text-sm'>
									Discount
								</button>
								<p className=''>
									৳
									{(order?.discountApplied?.amount ||
										order?.discountApplied?.percentage
										? order?.discountApplied?.percentage + ' %'
										: 0) || 0}
								</p>
							</div>

							{/* shipping */}
							<div className='flex justify-between items-center'>
								<button className='text-emerald-500 underline text-sm'>
									Shipping
								</button>
								<p className=''>{''}</p>
								<p className=''>৳{(order?.insideDhaka ? 99 : 199) || 0}</p>
							</div>

							{/* packers fee */}
							<div className='flex justify-between items-center'>
								<button className='text-emerald-500 underline text-sm'>
									Packers Fee
								</button>
								<p className=''>
									৳
									{
										order?.products?.reduce(
											(accumulator = 0, product) =>
												accumulator +
												product?.productQuantity * product?.product?.fee,
											0,
										) +
										order?.requests?.reduce(
											(accumulator = 0, request) =>
												accumulator +
												request?.requestQuantity * request?.request?.fee,
											0,
										)
									}
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
									) +
										order?.requests?.reduce(
											(accumulator = 0, request) =>
												accumulator +
												request?.requestQuantity * request?.request?.tax,
											0,
										) || 0}
								</p>
							</div>

							{/* total */}
							<div className='flex justify-between items-center'>
								<p className='text-base font-semibold'>Total</p>
								<p className='text-lg font-semibold'>৳ {order?.total || 0}</p>
							</div>
						</div>

						<hr />

						{/* status selector */}
						<div className='py-5 ml-auto p-5 gap-2  border-[#0000001c] w-full max-w-[200px] '>
							<CustomSelect
								bg='green'
								value={selectedOrderStatus?.name}
								options={orderStatuses}
								onChange={orderStatusHandler}
								appearance='select'
								sitOnTop={true}
							/>
						</div>
					</div>
				</div>
				<div className='col-span-3 sm:col-span-1 h-fit grid gap-5 pb-3'>
					<div className=' border border-[#0000001c] divide-y  rounded-lg '>
						{/* customer name */}
						<SideCard
							types='customer'
							customerName={order?.user?.fullName}
							editable={false}
						/>

						{/* customer information */}
						<SideCard
							types='contact'
							email={order?.user?.email}
							phone={order?.user?.phone}
						/>

						{/* shipping address */}
						<SideCard
							types='shipping'
							title='Shipping Address'
							editable={false}
							formikProps={odrerForm}
							address={
								order ? (order?.shippingaddress?.address +
									', ' +
									order?.shippingaddress?.area +
									', ' +
									order?.shippingaddress?.city +
									', ' +
									order?.shippingaddress?.zip) : ""
							}
						/>
						{/* billing */}
						<SideCard
							types='billing'
							title='Billing Address'
							formikProps={odrerForm}
							editable={false}
							address={
								order ? (order?.shippingaddress?.address +
									', ' +
									order?.shippingaddress?.area +
									', ' +
									order?.shippingaddress?.city +
									', ' +
									order?.shippingaddress?.zip) : ""
							}
						/>
					</div>
					<div className=' border border-[#0000001c] divide-y  rounded-lg '>
						<SideCard
							types='note'
							message={order?.instructions || 'No Notes'}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderDetails;
