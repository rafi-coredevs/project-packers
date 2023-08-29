import Button from "../Components/UiElements/Button/Button";
import Heading from "../Components/UiElements/Heading/Heading";
import { useParams } from "react-router-dom";
import SideCard from "../Components/UiElements/SideCard/SideCard";
import Input from "../Components/UiElements/Input/Input";
import search from "../../assets/icons/cd-search2.svg";
import remove from "../../assets/icons/cd-cancel.svg";
import { products } from "../../Store/Data";
import { useTitle } from "../../Components/Hooks/useTitle";
import { terminal } from "../../contexts/terminal/Terminal";
import { useEffect, useState } from "react";
import toaster from "../../Util/toaster";
import { BASE_URL } from "../../Util/apiCall";
import { useFormik } from "formik";
import CustomSelect from "../../Components/UiElements/Input/CustomSelect";
// 
const DROP_DOWN = [
  {
    id: 1,
    name: 'Completed',
    value: 'completed'
  },
  {
    id: 2,
    name: 'Pending',
    value: 'pending'
  },
  {
    id: 3,
    name: 'Processing',
    value: 'processing'
  },
  {
    id: 4,
    name: 'Shipping',
    value: 'shipping'
  },
  {
    id: 5,
    name: 'Cancelled',
    value: 'cancelled'
  },
]
const OrderDetails = () => {
  useTitle("Order Details");
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
const [selected, setSelected] = useState(DROP_DOWN[0])
  useEffect(() => {
    fetchData();

  }, []);

  const odrerForm = useFormik({
    initialValues:{

    }
  })
  const fetchData = () => terminal.request({ name: 'singleOrder', params: { id: orderId } }).then(res => res.status === false ? toaster({ type: 'error', message: res.message }) : setOrder(res))
  const statusHandler = (value) => {
    console.log(value)
    setSelected(DROP_DOWN.find((item)=> item.id === value))
  }
  const updateHandler = () => {
    console.log("update clicked");
  };
  return (
    <div className="px-5 h-full">
      <Heading type="navigate" title={`#${orderId}`} back={'All Order'}>
        <div className="flex items-center gap-1">
          <Button>Download Invoice</Button>
          <Button style="delete" onClick={updateHandler}>
            Delete
          </Button>
          <Button style="primary" onClick={updateHandler}>
            Update
          </Button>
        </div>
      </Heading>
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-3 sm:col-span-2 grid gap-5">
          <div className="grid gap-5 p-5 border rounded-lg">
            <div className="flex justify-between">
              <h3 className="text-base font-semibold">Products</h3>
              <button className="text-emerald-500">Add custom item</button>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-full">
                <Input
                  styles="secondary"
                  type="text"
                  placeholder="Search Products"
                >
                  <img className="opacity-70" src={search} />
                </Input>
              </div>
              <Button style="outline">Browse</Button>
            </div>
            <div className="grid gap-3 relative overflow-x-auto">
              <table className="w-full ">
                <thead className="text-left font-semibold">
                  <tr className="border-b border-[#0000001c]">
                    <th className="w-8/12 py-2">Product</th>
                    <th className="w-2/12 py-2">Quantity</th>
                    <th className="w-1/12 py-2">Total</th>
                    <th className="w-1/12 py-2"></th>
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
                      <td className="py-2 text-right">
                        <button
                          className="pe-3"
                          onClick={() => console.log("first")}
                        >
                          <div className="h-4 w-4 lazy-loading" />
                        </button>
                      </td>
                    </tr> :
                      order?.products.map((product) => {
                        return (
                          <tr
                            key={product?.id}
                            className="border-t border-[#0000001c]"
                          >
                            <td className="py-2">
                              <div className="flex gap-2 items-center">
                                <img
                                  className="w-8 h-8 rounded border-b border-[#0000001c]"
                                  src={BASE_URL + '/api/' + product?.product?.images[0]}
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
                              <Input styles="quantity" value={product?.productQuantity} />
                            </td>
                            <td className="py-2"> ৳{(product?.product?.price?.toFixed(2) * (product?.productQuantity))}</td>
                            <td className="py-2 text-right">
                              <button
                                className="pe-3"
                                onClick={() => console.log("first")}
                              >
                                <img className="h-4 w-4" src={remove} alt="" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
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
                <p className="">৳{order?.products?.reduce((accumulator = 0, product) => accumulator + ((product?.productQuantity) * (product?.product?.price)), 0)}</p>
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
                <p className="">৳{order?.products?.reduce((accumulator = 0, product) => accumulator + ((product?.productQuantity) * (product?.product?.fee)), 0)}</p>
              </div>
              <div className="flex justify-between items-center">
                <button className="text-emerald-500 underline text-sm">
                  Estimated Tax
                </button>


                <p className="">৳{order?.products?.reduce((accumulator = 0, product) => accumulator + ((product?.productQuantity) * (product?.product?.tax)), 0)}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-base font-semibold">Total</p>
                <p className="text-lg font-semibold">৳ {order?.total}</p>
              </div>
              <div className="py-5 flex gap-2 justify-end border-t border-[#0000001c] ">
                <div className="w-40">

                <CustomSelect options={DROP_DOWN} styles={'bg-[#3E949A] text-white'} value={selected.name} onChange={statusHandler} />
                </div>
               
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 sm:col-span-1 h-fit grid gap-5 pb-3">
          <div className=" border border-[#0000001c] divide-y  rounded-lg ">
            <SideCard types="customer" name={order?.user?.fullName || 'No Name'} />
            <SideCard types="contact" email={order?.user?.email || 'No email'} phone={order?.user?.phone || 'No Phone'} />
            <SideCard
              types="address"
              title="Shipping Address"
              address={order?.shippingaddress?.address + ', ' + order?.shippingaddress?.area + ', ' + order?.shippingaddress?.city + ', ' + order?.shippingaddress?.zip}
            />
            <SideCard
              types="address"
              title="Billing Address"
              address={order?.shippingaddress?.address + ', ' + order?.shippingaddress?.area + ', ' + order?.shippingaddress?.city + ', ' + order?.shippingaddress?.zip}
            />
          </div>
          <div className=" border border-[#0000001c] divide-y  rounded-lg ">
            <SideCard types="note" message={order?.instructions || "Not Available"} />

          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
