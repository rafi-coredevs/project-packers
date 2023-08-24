import Input from "../Components/UiElements/Input/Input";
import { useFormik } from "formik";
import { loginSchema } from "../Util/ValidationSchema";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Components/UiElements/Buttons/Button";
import google from "../assets/icons/google-icon.svg";
import facebook from "../assets/icons/facebook.svg";
import apple from "../assets/icons/apple.svg";
import { useTitle } from "../Components/Hooks/useTitle";

const Login = () => {
  useTitle("Login")
  const navigate = useNavigate();
  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      // postApi("/user/login", values).then((res) => {
      //   if (res.status === 200) {
         
      //     dispatch(userSignin(res.data));
      //     loginForm.resetForm();
      //     toast.success("Login Successful", {
      //       style: {
      //         padding: "16px",
      //         color: "#0D3D4B",
      //         backgroundColor: "#F2C852",
      //       },
      //       iconTheme: {
      //         primary: "#198754",
      //         secondary: "#FFFAEE",
      //       },
      //     });
      //     setTimeout(() => {
      //       navigate("/");
      //     }, 2000);
      //   } else {
      //     toast.error(res.data, {
      //       style: {
      //         padding: "16px",
      //         color: "#0D3D4B",
      //         backgroundColor: "#F2C852",
      //       },
      //       iconTheme: {
      //         primary: "#FF0000",
      //         secondary: "#FFFAEE",
      //       },
      //     });
      //   }
      // });
    },
  });
  return (
    <div className="bg-secondary pt-[10vh] pb-[15vh] min-h-[calc(100vh-225px)]">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 relative z-20 justify-center divide-x divide-[#ffffff1a] flex-wrap">
        <div className="w-full sm:max-w-[30vw]">
          <p className="text-white text-[52px] font-sora font-extrabold">
            Welcome Back
          </p>
          <form
            className="flex flex-col gap-5"
            onSubmit={loginForm.handleSubmit}
          >
            <div className="relative">
              <Input
                name="email"
                change={loginForm.handleChange}
                blur={loginForm.handleBlur}
                value={loginForm.values.email}
                error={
                  loginForm.touched.email && loginForm.errors.email
                    ? loginForm.errors.email
                    : null
                }
                type="email"
                placeholder="Enter your Email Address"
                label="Email Address/ Phone number"
              />
            </div>
            <div className="relative">
              <div className="absolute h-[42px] bottom-0 left-0 right-0 rounded-full bg-red-600"></div>
                <Input
                  name="password"
                  change={loginForm.handleChange}
                  blur={loginForm.handleBlur}
                  value={loginForm.values.password}
                  error={
                    loginForm.errors.password && loginForm.touched.password
                      ? loginForm.errors.password
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
                  onChange={loginForm.handleChange}
                  value={loginForm.values.remember}
                  className="w-4 h-4 text-yellow-400 bg-transparent border-white rounded"
                />
                <label className="text-white pl-2">Remember me</label>
              </div>
              <Link className="text-primary" to="/reset">
                Forgot Password?
              </Link>
            </div>
            <div className="flex  gap-2 mt-12">
              <span className="p-[11px] cursor-pointer bg-white rounded-full shrink-0">
                <img src={google} alt="" />
              </span>
              <span className="p-[11px] cursor-pointer bg-white rounded-full shrink-0">
                <img src={facebook} alt="" />
              </span>
              <span className="p-[11px] cursor-pointer bg-white rounded-full shrink-0">
                <img src={apple} alt="" />
              </span>
              <Button
                full
                className="w-full"
                type="primary"
                buttonType="submit"
              >
                Login
              </Button>
            </div>
          </form>
        </div>
        <div className="flex flex-col  w-full h-full justify-center items-center">
          <div className="max-w-[490px]">
            <p className="text-[24px] font-sans font-medium text-white mb-5">
              Log in to access your Project Packers Platform for order your
              products from any USA website.
            </p>
            <div className="">
              <span className="text-[#ffffffb3] font-sans text-base font-normal">
                Don’t have an account yet?
                <Link className="text-primary underline" to="/signup">
                  Sign up
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
