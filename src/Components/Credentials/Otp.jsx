/**
 * Otp() returns JSX Element
 * OTP Validation from email
 * 
 * @param {object} data elements for post method
 * @param {function} getResponse callback function
 * 
 * @return JSX Element
 */


import Input from "../UiElements/Input/Input";
import Button from "../UiElements/Buttons/Button";
import image from '../../assets/icons/otp.svg'
import { useFormik } from "formik";
import { postApi } from "../../Util/apiCall";
import { useState } from "react";
const Otp = ({ data, getResponse }) => {
  const [isSubmit, setIsSubmit] = useState(false)
  const otpForm = useFormik({
    initialValues: {
      field1: "",
      field2: "",
      field3: "",
      field4: "",
    },
    onSubmit: (values) => {
      setIsSubmit(true)
      const otp = Object.values(values).join("");
      postApi("/user/otp-verify", { token: data?.data?.token, otp }).then(
        (res) => {
          getResponse({
            component: "newPass",
            ...res,
            otp,
            email: data?.email,
          });
        }
      ).finally(()=> {
        setIsSubmit(false)
        otpForm.resetForm()
      });
    },
  });

  return (
    <>
      <div className="max-w-[30vw] flex flex-col gap-12">
        <div className="">
          <p className="text-white text-[52px] font-sora font-extrabold">
            Enter your OTP verification code
          </p>
          <p className="font-sans text-lg font-medium text-[#ffffffb3]">
            To get a verification code, first confirm the phone number you added
            to your account <span className="text-primary">{data?.email}</span>. Standard rates apply.
          </p>
        </div>
        <form className="flex flex-col gap-9" onSubmit={otpForm.handleSubmit}>
          <div className="relative flex gap-2">
            <Input
              name="field1"
              placeholder="*"
              change={otpForm.handleChange}
              blur={otpForm.handleBlur}
              max={1}
              value={otpForm.values.field1}
              type="text"
            />
            <Input
              name="field2"
              placeholder="*"
              change={otpForm.handleChange}
              blur={otpForm.handleBlur}
              max={1}
              value={otpForm.values.field2}
              type="text"
            />
            <Input
              name="field3"
              placeholder="*"
              change={otpForm.handleChange}
              blur={otpForm.handleBlur}
              max={1}
              value={otpForm.values.field3}
              type="text"
            />
            <Input
              name="field4"
              placeholder="*"
              change={otpForm.handleChange}
              blur={otpForm.handleBlur}
              max={1}
              value={otpForm.values.field4}
              type="text"
            />
          </div>
          <Button full className="w-full" type="primary" buttonType="submit" disabled={isSubmit}>
            {isSubmit ? "Submitting..." : "Verify Account"}
          </Button>
        </form>
      </div>
      <div className="flex flex-col  w-full h-full justify-center items-center">
        <img src={image} />
      </div>
    </>
  );
};

export default Otp;
