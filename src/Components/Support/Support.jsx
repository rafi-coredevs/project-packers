/**
 *
 */
import { useState } from "react";
import supportIcon from "../../assets/icons/cd-customer-support.svg";
import Input from "../UiElements/Input/Input";


const Support = () => {
  const [isVisible, setVisible] = useState(false);
  return (
   

    <>
      {!isVisible &&  <div className=" cursor-pointer z-50 sm:block fixed bottom-8 right-8  ">
        <img
          onClick={() => setVisible(true)}
          className="h-fit w-fit p-4 rounded-full bg-primary"
          src={supportIcon}
          alt=""
        />
        </div>
      }
  

    {
      isVisible &&  <div className=" z-50 sm:block fixed bottom-8 right-8  ">
      <div
      
      className="bg-secondary p-5 border-[#6BCCCB] border rounded-2xl min-w-[335px] "
    >
      <div className="flex justify-between items-center mb-5">
        <span className="text-white font-sans font-bold text-2xl">
          Contact us
        </span>
        <button className="cursor-pointer" onClick={() => setVisible(false)} type="button">

        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 5L5 19"
            stroke="#FFFFFFA6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 5L19 19"
            stroke="#FFFFFFA6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        </button>
      </div>
      <form action="" className="grid gap-5">
        <Input label="Your Name" type="text" placeholder="Enter your name" />
        <Input label="Email address" type="email" placeholder="Enter your Email" />
        <div className="">
          <label htmlFor="type" className="">Type of support request</label>
          <select name="type" id="">
            <option value="account">Account</option>
            <option value="order">Order</option>
            <option value="payment">Payment</option>
            <option value="refund">Refund</option>
          </select>
        </div>
      </form>
    </div></div>
    }
    </>
  );
};

export default Support;
