/**
 * OtpModal() returns JSX Element
 * @param {object} data required data from server
 * @param {function} getResponse callback function
 * @param {function} stateHandler callback function
 * @param {function} onClose callback function
 * @returns JSX Element
 */

import { useFormik } from "formik";
import { useState } from "react";
import { postApi } from "../../Util/apiCall";
import Input from "../UiElements/Input/Input";
import Button from "../UiElements/Buttons/Button";

const OtpModal = ({ data, getResponse, stateHandler, onClose }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const otpForm = useFormik({
    initialValues: {
      field1: "",
      field2: "",
      field3: "",
      field4: "",
    },
    
    onSubmit: (values) => {
      setIsSubmit(true);
      const otp = Object.values(values).join("");
      postApi("/user/otp-verify", { token: data?.data?.token, otp })
        .then((res) => {
         if(res.status !== 200){
            otpForm.setErrors(['field1','field2','field3','field14'],'error')
         }   
          getResponse({
            component: "resetPassword",
            ...res,
            otp,
            email: data?.email,
          });
        })
        .finally(() => {
          setIsSubmit(false);
          otpForm.resetForm();
        });
    },
  });

  return (
    <>
      
      <div className="grid grid-cols-3">
        <div className="flex justify-start items-center cursor-pointer">
          <div onClick={() => stateHandler("reset")} className="">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.16675 10.0002L16.6667 10"
                stroke="white"
                strokeOpacity="0.65"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.49993 5.83301L3.92253 9.41042C3.64474 9.68817 3.50586 9.82709 3.50586 9.99967C3.50586 10.1723 3.64474 10.3112 3.92253 10.5889L7.49993 14.1663"
                stroke="white"
                strokeOpacity="0.65"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="text-center text-lg text-white font-bold">
          OTP Verify
        </div>
        <div className="flex justify-end items-center">
          <button onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M15.8334 4.16699L4.16675 15.8337"
                stroke="white"
                strokeOpacity="0.65"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.16675 4.16699L15.8334 15.8337"
                stroke="white"
                strokeOpacity="0.65"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="">
        <p className="text-center text-base font-medium text-white">
          To get a verification code, first confirm the phone number you added
          to your account <span className="text-primary">{data?.email}</span> Standard rates apply.
        </p>
      </div>
      <form className="flex flex-col gap-5" onSubmit={otpForm.handleSubmit}>
        <div className="relative flex gap-2">
          <Input
            name="field1"
            placeholder="*"
            change={otpForm.handleChange}
            blur={otpForm.handleBlur}
            max={1}
            value={otpForm.values.field1}
            type="text"
            required
          />
          <Input
            name="field2"
            placeholder="*"
            change={otpForm.handleChange}
            blur={otpForm.handleBlur}
            max={1}
            value={otpForm.values.field2}
            type="text"
            required
          />
          <Input
            name="field3"
            placeholder="*"
            change={otpForm.handleChange}
            blur={otpForm.handleBlur}
            max={1}
            value={otpForm.values.field3}
            type="text"
            required
          />
          <Input
            name="field4"
            placeholder="*"
            change={otpForm.handleChange}
            blur={otpForm.handleBlur}
            max={1}
            value={otpForm.values.field4}
            type="text"
            required
          />
        </div>
        <Button
          full
          className="w-full"
          type="primary"
          buttonType="submit"
          disabled={isSubmit}
        >
          {isSubmit ? "Submitting..." : "Verify Account"}
        </Button>
      </form>

      <div className="text-center text-white text-xs">
        Already have an Account?{" "}
        <span
          onClick={() => stateHandler("login")}
          className="text-primary underline"
        >
          Login
        </span>
      </div>
    </>
  );
};

export default OtpModal;
