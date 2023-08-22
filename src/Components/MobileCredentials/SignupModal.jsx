/**
 * SignupModal() returns JSX Element
 * This function for user Sign up
 *
 * @param {function} stateHandler takes string value to navigate state
 * @param {function} onClose callback function to close modal
 *
 * @returns JSX element
 */

import { useFormik } from "formik";
import { signupSchema } from "../../Util/ValidationSchema";
import { postApi } from "../../Util/apiCall";
import { toast } from "react-hot-toast";
import Input from "../UiElements/Input/Input";
import CountryCodeSelector from "../UiElements/CountryCodeSelectior/CountryCodeSelector";
import Button from "../UiElements/Buttons/Button";
import { useState } from "react";

const SignupModal = ({ stateHandler, onClose }) => {
  const [conutryCode, setCountryCode] = useState(null);
  const codeGetter = (v) => {
    setCountryCode(v);
    return 0;
  };
  const clickHandler = (state) => {
    stateHandler(state);
  };
  const signupForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      terms: false,
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      const data = { ...values, phone: conutryCode + values.phone };
      delete data.terms;
      delete data.remember;
      postApi("/user", data).then((res) => {
        if (res?.status === 200) {
          toast.success("Sign Up successfull. Now you can login .", {
            style: {
              border: "1px solid #0D3D4B",
              padding: "16px",
              color: "#0D3D4B",
              backgroundColor: "#F2C852",
            },
            iconTheme: {
              primary: "#198754",
              secondary: "#FFFAEE",
            },
          });
          stateHandler('login')
        } else if (res.status === 400) {
          signupForm.setFieldError("email", res.data);
        } else {
          toast.error(res.data, {
            style: {
              border: "1px solid #0D3D4B",
              padding: "16px",
              color: "#0D3D4B",
              backgroundColor: "#F2C852",
            },
            iconTheme: {
              primary: "#FF0000",
              secondary: "#FFFAEE",
            },
          });
        }
      });

      // signupForm.resetForm();
    },
  });
  return (
    <>
      <div className="grid grid-cols-3">
        <div className="flex justify-start items-center cursor-pointer">
          <div onClick={() => clickHandler("account")} className="">
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
        <div className="text-center text-2xl text-white font-bold">Sign Up</div>
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
      <form onSubmit={signupForm.handleSubmit} className="">
        <div className="grid gap-5">
          <Input
            type="text"
            name="name"
            blur={signupForm.handleBlur}
            error={
              signupForm.touched.name && signupForm.errors.name
                ? signupForm.errors.name
                : null
            }
            change={signupForm.handleChange}
            value={signupForm.values.name}
            label="Full Name"
            placeholder="Enter your name"
          />
          <Input
            name="email"
            change={signupForm.handleChange}
            blur={signupForm.handleBlur}
            value={signupForm.values.email}
            error={
              signupForm.touched.email && signupForm.errors.email
                ? signupForm.errors.email
                : null
            }
            type="email"
            placeholder="Enter your Email Address"
            label="Email Address"
          />
          <Input
            name="phone"
            change={signupForm.handleChange}
            blur={signupForm.handleBlur}
            value={signupForm.values.phone}
            error={
              signupForm.touched.phone && signupForm.errors.phone
                ? signupForm.errors.phone
                : null
            }
            type="text"
            placeholder="Enter Your Phone Number"
            label="Phone Number"
          >
            <CountryCodeSelector code={codeGetter} />
          </Input>
          <Input
            name="password"
            change={signupForm.handleChange}
            blur={signupForm.handleBlur}
            value={signupForm.values.password}
            error={
              signupForm.errors.password && signupForm.touched.password
                ? signupForm.errors.password
                : null
            }
            type="password"
            placeholder="Enter your Password"
            label="Password"
          />
          <Button type="primary" buttonType="submit">
            Sign Up
          </Button>
        </div>
      </form>

      <div className="text-center text-white text-xs">
        Already have an Account?{" "}
        <span
          onClick={() => clickHandler("login")}
          className="text-primary underline"
        >
          Login
        </span>
      </div>
    </>
  );
};

export default SignupModal;
