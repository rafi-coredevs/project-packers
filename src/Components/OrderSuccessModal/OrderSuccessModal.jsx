import { useEffect, useState } from 'react';
import icon from '../../assets/icons/product-ok.svg'
import { Link } from 'react-router-dom';
import { terminal } from '../../contexts/terminal/Terminal';
import Button from '../UiElements/Buttons/Button';

const OrderSuccessModal = ({ setOrderModal, id }) => {
    const [orderdata, setOrderdata] = useState({})
    useEffect(() => {
        terminal.request({ name: 'singleOrder', params: { id: id } }).then(data => data.id && setOrderdata(data))
    }, [id])
    const orderDate = new Date(orderdata?.date);
    const oneWeekLater = new Date(orderDate);
    oneWeekLater.setDate(oneWeekLater.getDate() + 7);
    const twoWeeksLater = new Date(oneWeekLater);
    twoWeeksLater.setDate(twoWeeksLater.getDate() + 7);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    return (
<div className="flex flex-col gap-5">
          <div className="p-8 flex w-full items-start flex-col gap-10">
            <img className="w-fit h-auto" src={icon} alt="" />
            <div className="text-start grid gap-3">
              <h5 className="text-xl font-semibold text-secondary mb-2">
                Thanks your for your order.
              </h5>
              <p className="text-sm font-normal max-w-[360px] text-[#00000386]">
                we sent an order confirmation to:
                <span className="text-secondary font-semibold block">
                  {orderdata?.email}
                </span>
              </p>
              <p className="text-sm font-normal max-w-[360px] text-[#00000386]">
                Your order number is:
                <span className="text-secondary font-semibold block">
                  # {orderdata?.id}
                </span>
              </p>
              <p className="text-sm font-normal max-w-[360px] text-[#00000386]">
                Your order will deliver on:
                <span className="text-secondary font-semibold block">
                {oneWeekLater.toLocaleString('en-US', options)} - {twoWeeksLater.toLocaleString('en-US', options)}
                </span>
              </p>

              <p className="text-sm font-normal max-w-[360px] text-[#00000386]">
                to the address:
                <span className="text-secondary font-semibold block">
                {
                orderdata?.shippingaddress?.address + ', ' +
                orderdata?.shippingaddress?.city + ', ' +
                orderdata?.shippingaddress?.area
            }
                </span>
              </p>
            </div>
          </div>
        <Link to={'/'}>
          <Button onClick={()=>setOrderModal(false)} type="primary" full>
            Keep Shopping
          </Button>
        </Link>
        </div>
    );
};

export default OrderSuccessModal;