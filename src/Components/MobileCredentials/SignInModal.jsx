/**
 * SignInModal() returns JSX Element
 * This function for user login
 *
 * @param {function} stateHandler takes string value to navigate state
 * @param {function} onClose callback function to close modal
 *
 * @returns JSX element
 */
import { useFormik } from "formik";
import Button from "../UiElements/Buttons/Button";
import Input from "../UiElements/Input/Input";
import { loginSchema } from "../../Util/ValidationSchema";
import { postApi } from "../../Util/apiCall";
import { useDispatch } from "react-redux";
import { userSignin } from "../../Store/userSlice";
import { toast } from "react-hot-toast";
const SignInModal = ({ stateHandler, onClose }) => {
  const dispatch = useDispatch();

  const clickHandler = (state) => {
    stateHandler(state);
  };

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      postApi("/user/login", values).then((res) => {
        if (res.status === 200) {
          dispatch(userSignin(res.data));
          loginForm.resetForm();
          toast.success("Login Successful", {
            style: {
              padding: "16px",
              color: "#0D3D4B",
              backgroundColor: "#F2C852",
              zIndex: 60,
            },
            iconTheme: {
              primary: "#198754",
              secondary: "#FFFAEE",
            },
          });
          onClose();
        } else {
          loginForm.setFieldError("email", "not valid");
          loginForm.setFieldError("password", "not valid");
          toast.error(res.data, {
            style: {
              padding: "16px",
              color: "#0D3D4B",
              backgroundColor: "#F2C852",
              zIndex: 60,
            },
            iconTheme: {
              primary: "#FF0000",
              secondary: "#FFFAEE",
            },
          });
        }
      });
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
        <div className="text-center text-2xl text-white font-bold">Login</div>
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
      <form onSubmit={loginForm.handleSubmit} className="">
        <div className="grid gap-5">
          <Input
            type="email"
            name="email"
            blur={loginForm.handleBlur}
            error={
              loginForm.touched.email && loginForm.errors.email
                ? loginForm.errors.email
                : null
            }
            change={loginForm.handleChange}
            value={loginForm.values.email}
            label="Email Address"
            placeholder="Enter your email address"
          />
          <Input
            name="password"
            type="password"
            blur={loginForm.handleBlur}
            error={
              loginForm.errors.password && loginForm.touched.password
                ? loginForm.errors.password
                : null
            }
            change={loginForm.handleChange}
            value={loginForm.values.password}
            label="Password"
            placeholder="Enter your password"
          />
          <Button type="primary" buttonType="submit">
            Login
          </Button>
          <p
            onClick={() => clickHandler("reset")}
            className="text-primary text-center"
          >
            Forgot your password?
          </p>
        </div>
      </form>
      <div className="text-center text-white text-xs">
        Don&apos;t have an Account?{" "}
        <span
          onClick={() => clickHandler("signup")}
          className="text-primary underline"
        >
          Sign Up
        </span>
      </div>
    </>
  );
};

export default SignInModal;
