import { useFormik } from "formik";
import Input from "../Components/UiElements/Input/Input";
import Button from "../Components/UiElements/Buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema } from "../Util/ValidationSchema";
import google from "../assets/icons/google-icon.svg";
import apple from "../assets/icons/apple.svg";
import facebook from "../assets/icons/facebook.svg";
import CountryCodeSelector from "../Components/UiElements/CountryCodeSelectior/CountryCodeSelector";
import { useState } from "react";
import { BASE_URL, postApi } from "../Util/apiCall";
import toast from "react-hot-toast";
import { useTitle } from "../Components/Hooks/useTitle";
// 
const Signup = () => {
  useTitle("Signup");
  const [conutryCode, setCountryCode] = useState(null);
  const navigate = useNavigate();
  const codeGetter = (v) => {
    setCountryCode(v);
    return 0;
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
          navigate("/login");
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
    <div className="bg-secondary pt-[5vh]  min-h-[calc(100vh-241px)]">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 relative z-20 justify-center divide-x divide-[#ffffff1a] flex-wrap ">
        <div className="flex justify-start items-center">
          <div className="max-w-[490px]">
            <p className="text-[24px] font-sans font-medium text-white mb-5">
              User original product shopping experience made easy and fun
            </p>
            <div className="">
              <span className="text-[#ffffffb3] font-sans text-base font-normal">
                Already have an account yet?
                <Link className="text-primary underline" to="/login">
                  Login
                </Link>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col  w-full h-full justify-center items-center">
          <div className="w-full sm:max-w-[30vw]">
            <p className="text-white text-[52px] font-sora font-extrabold">
              Welcome Back
            </p>
            <form
              className="flex flex-col gap-5"
              onSubmit={signupForm.handleSubmit}
            >
              <div className="relative">
                <Input
                  name="name"
                  change={signupForm.handleChange}
                  blur={signupForm.handleBlur}
                  value={signupForm.values.name}
                  error={
                    signupForm.touched.name && signupForm.errors.name
                      ? signupForm.errors.name
                      : null
                  }
                  type="text"
                  placeholder="Enter your Full Name"
                  label="Full Name"
                />
              </div>
              <div className="relative">
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
              </div>
              <div className="relative">
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
              </div>
              <div className="relative">
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
              </div>
              <div className="flex justify-between mt-[10px]">
                <div className="font-sans text-base ">
                  <input
                    type="checkbox"
                    name="remember"
                    onChange={signupForm.handleChange}
                    value={signupForm.values.remember}
                    className="w-4 h-4 text-yellow-400 bg-transparent border-white rounded"
                  />
                  <label className="text-[#ffffffb3] pl-2">
                    I agree to Project Packers Terms of Service and Privacy
                    notice
                  </label>
                  {signupForm.errors.terms && signupForm.touched.terms && (
                    <span></span>
                  )}
                </div>
              </div>
              <div className="flex  gap-2 mt-12">
                <Link
                  to={`${BASE_URL}/api/user/google`}
                  className="p-[11px] cursor-pointer bg-white rounded-full shrink-0"
                >
                  <img src={google} alt="" />
                </Link>
                <Link
                  to={`${BASE_URL}/api/user/facebook`}
                  className="p-[11px] cursor-pointer bg-white rounded-full shrink-0"
                >
                  <img src={facebook} alt="" />
                </Link>
                <span className="p-[11px] cursor-pointer bg-white rounded-full shrink-0">
                  <img src={apple} alt="" />
                </span>
                <Button
                  buttonType="submit"
                  full
                  className="w-full"
                  type="primary"
                >
                  Sign Up
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
