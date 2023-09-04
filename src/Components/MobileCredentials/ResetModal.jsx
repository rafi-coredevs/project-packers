import { useFormik } from "formik";
import { useState } from "react";
import { emailSchema } from "../../Util/ValidationSchema";
import Button from "../UiElements/Buttons/Button";
import Input from "../UiElements/Input/Input";
import { terminal } from "../../contexts/terminal/Terminal";
import toaster from "../../Util/toaster";


/**
 * Represents a React component for email validation with a modal interface.
 *
 * @param {function} getResponse - Callback function for handling responses from the server.
 * @param {function} stateHandler - Callback function to change the state of the modal.
 * @param {function} onClose - Callback function to close the modal.
 *
 * @returns {JSX.Element} - React JSX element for email validation modal component.
 */
const ResetModal = ({ getResponse, stateHandler, onClose }) => {
  const [isSubmit, setIsSubmit] = useState(false);

  const emailForm = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailSchema,
    onSubmit: (values) => {
      setIsSubmit(true);
      terminal
      .request({ name: 'sendOTP', body: values })
      .then((data) => {
        if (data.status === false) {
          toaster({ type: 'error', message: data.message });
        } else {
          getResponse({ component: 'otp', token: data.token , email: values?.email});
          stateHandler("otp")
        }
      }).catch((err)=>console.error("Error reset modal when email verification", err ))
        .finally(() => {
          setIsSubmit(false);
        });
    },
  });

  return (
    <>
      <div className="grid grid-cols-3">
        <div className="flex justify-start items-center cursor-pointer">
          <div onClick={() => stateHandler("login")} className="">
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
          Email Verify
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
      <form onSubmit={emailForm.handleSubmit} action="">
        <div className="grid gap-5">
          <Input
            name="email"
            label="Email address"
            placeholder="Enter your email address"
            change={emailForm.handleChange}
            blur={emailForm.handleBlur}
            value={emailForm.values.email}
            error={
              emailForm.errors.email && emailForm.touched.email
                ? emailForm.errors.email
                : null
            }
            type="email"
            className="h-[50px]"
          />
          <Button
            full
            className="w-full h-[48px]"
            type="primary"
            buttonType="submit"
            disabled={isSubmit}
          >
            {isSubmit ? "Submitting..." : "Reset Password"}
          </Button>
        </div>
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

export default ResetModal;
