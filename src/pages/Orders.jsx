import Breadcrumb from "../Components/UiElements/Breadcrumb/Breadcrumb";
import Input from "../Components/UiElements/Input/Input";
import order from "../assets/icons/cd-order.svg";
import profile from "../assets/icons/user-1.svg";
import logout from "../assets/icons/logout-01.svg";
import eye from "../assets/icons/eye.svg";
import { useEffect, useState } from "react";
import Badge from "../Components/UiElements/Badge/Badge";
import Button from "../Components/UiElements/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { profileSchema } from "../Util/ValidationSchema";
import { patchApi } from "../Util/apiCall";
import { useTitle } from "../Components/Hooks/useTitle";

const Orders = () => {
  useTitle("Orders")
  const [active, setActive] = useState("orders");

  const navigate = useNavigate();
  // useEffect(() => {
  //   const name = user?.name.split(" ");
  //   console.log(name);
  //   profileForm.setValues({
  //     firstName: name[0],
  //     lastName: name[1],
  //     phone: user?.phone,
  //     email: user?.email,
  //     currentPassword: "",
  //     newPassword: "",
  //     confirmPassword: "",
  //   });
  // }, [user]);
  const profileForm = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      if (values.currentPassword !== "" && values.newPassword === "") {
        profileForm.setFieldError("newPassword", "New Password Required");
        profileForm.setFieldError(
          "confirmPassword",
          "Password Have to be matched"
        );
      } else if (values.newPassword !== values.confirmPassword) {
        profileForm.setFieldError(
          "confirmPassword",
          "Password Have to be matched"
        );
      } else {
        const data = {
          email: values.email,
          phone: values.phone,
          name: values.firstName + " " + values.lastName,
        };
        if (values.newPassword !== "")
          data.password = {
            new: values.newPassword,
            old: values.currentPassword,
          };
        patchApi("/user/me", data).then((res) => {
          if (res.status === 200) {
            dispatch(userSignin(res.data));
            successToast("Profile successfully updated");
          } else {
            errorToast(res.response.data);
          }
        });
      }
    },
  });

  // const logoutHandler = () => {
  //   dispatch(userSignout());
  //   navigate("/");
  // };
  return (
    <>
      <Breadcrumb />
      <main>
        <div className="container mx-auto p-5 sm:p-0 overflow-hidden">
          <div className="grid grid-cols-5 sm:mt-[60px] sm:mb-[160px] mb-5 gap-[30px]">
            <div className="col-span-5 sm:col-span-1">
              <div className="p-5 flex flex-row sm:flex-col gap-5 border rounded-xl text-base font-semibold ">
                <button
                  onClick={() => setActive("orders")}
                  className={`py-3 px-8 flex  gap-[10px] w-full rounded-full hover:bg-primary ${
                    active === "orders" ? "bg-primary" : "bg-white border"
                  }`}
                >
                  <img src={order} />
                  <span className="hidden sm:block">Orders</span>
                </button>
                <button
                  onClick={() => setActive("account")}
                  className={`py-3 px-8 flex  gap-[10px] w-full rounded-full hover:bg-primary ${
                    active === "account" ? "bg-primary" : "bg-white border"
                  }`}
                >
                  <img src={profile} />
                  <span className="hidden sm:block">User Account</span>
                </button>
                <button
                  onClick={logoutHandler}
                  className={`py-3 px-8 flex  gap-[10px] w-full rounded-full hover:bg-primary bg-white border`}
                >
                  <img src={logout} />
                  <span className="hidden sm:block">logout</span>
                </button>
              </div>
            </div>
            <div className="col-span-5 sm:col-span-4">
              {active === "orders" ? (
                <div className="w-full overflow-x-auto">
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-[#475569]  bg-[#F8FAFC] font-medium border-b">
                        <tr>
                          <th scope="col" className="p-3 font-medium">
                            Order ID
                          </th>
                          <th scope="col" className="px-6 py-3 font-medium">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 font-medium">
                            Items
                          </th>
                          <th scope="col" className="px-6 py-3 font-medium">
                            Total
                          </th>
                          <th scope="col" className="px-6 py-3 font-medium">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 font-medium">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b text-sm text-black">
                          <th scope="row" className="p-3">
                            #2050
                          </th>
                          <td className="px-6 py-4">Today at 6:55am</td>
                          <td className="px-6 py-4">1 item</td>
                          <td className="px-6 py-4">$396.84</td>
                          <td className="px-6 py-4">
                            <Badge text="completed" />
                          </td>
                          <td className="px-6 py-4">
                            <img
                              className="cursor-pointer"
                              onClick={() => console.log("first")}
                              src={eye}
                              alt=""
                            />
                          </td>
                        </tr>
                        <tr className="border-b text-sm text-black">
                          <th scope="row" className="p-3">
                            #2050
                          </th>
                          <td className="px-6 py-4">Today at 6:55am</td>
                          <td className="px-6 py-4">1 item</td>
                          <td className="px-6 py-4">$396.84</td>
                          <td className="px-6 py-4">
                            <Badge text="paid" />
                          </td>
                          <td className="px-6 py-4">
                            <img
                              className="cursor-pointer"
                              onClick={() => console.log("first")}
                              src={eye}
                              alt=""
                            />
                          </td>
                        </tr>
                        <tr className="border-b text-sm text-black">
                          <th scope="row" className="p-3">
                            #2050
                          </th>
                          <td className="px-6 py-4">Today at 6:55am</td>
                          <td className="px-6 py-4">1 item</td>
                          <td className="px-6 py-4">$396.84</td>
                          <td className="px-6 py-4">
                            <Badge text="processing" />
                          </td>
                          <td className="px-6 py-4">
                            <img
                              className="cursor-pointer"
                              onClick={() => console.log("first")}
                              src={eye}
                              alt=""
                            />
                          </td>
                        </tr>
                        <tr className="border-b text-sm text-black">
                          <th scope="row" className="p-3">
                            #2050
                          </th>
                          <td className="px-6 py-4">Today at 6:55am</td>
                          <td className="px-6 py-4">1 item</td>
                          <td className="px-6 py-4">$396.84</td>
                          <td className="px-6 py-4">
                            <Badge text="shipping" />
                          </td>
                          <td className="px-6 py-4">
                            <img
                              className="cursor-pointer"
                              onClick={() => console.log("first")}
                              src={eye}
                              alt=""
                            />
                          </td>
                        </tr>
                        <tr className="border-b text-sm text-black">
                          <th scope="row" className="p-3">
                            #2050
                          </th>
                          <td className="px-6 py-4">Today at 6:55am</td>
                          <td className="px-6 py-4">1 item</td>
                          <td className="px-6 py-4">$396.84</td>
                          <td className="px-6 py-4">
                            <Badge text="cancelled" />
                          </td>
                          <td className="px-6 py-4">
                            <img
                              className="cursor-pointer"
                              onClick={() => console.log("first")}
                              src={eye}
                              alt=""
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="max-w-[700px]">
                  <form
                    onSubmit={profileForm.handleSubmit}
                    className="grid gap-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        styles="primary"
                        type="text"
                        name="firstName"
                        change={profileForm.handleChange}
                        blur={profileForm.handleBlur}
                        value={profileForm.values.firstName}
                        error={
                          profileForm.touched.firstName &&
                          profileForm.errors.firstName
                            ? profileForm.errors.firstName
                            : null
                        }
                        label="First Name"
                        placeholder="Enter your First Name"
                        border
                      />
                      <Input
                        styles="primary"
                        type="text"
                        name="lastName"
                        change={profileForm.handleChange}
                        blur={profileForm.handleBlur}
                        value={profileForm.values.lastName}
                        error={
                          profileForm.touched.lastName &&
                          profileForm.errors.lastName
                            ? profileForm.errors.lastName
                            : null
                        }
                        label="Last Name"
                        placeholder="Enter your Last Name"
                        border
                      />
                    </div>
                    <Input
                      styles="primary"
                      type="email"
                      name="email"
                      change={profileForm.handleChange}
                      blur={profileForm.handleBlur}
                      value={profileForm.values.email}
                      error={
                        profileForm.touched.email && profileForm.errors.email
                          ? profileForm.errors.email
                          : null
                      }
                      label="Email Address"
                      placeholder="Enter your Email id"
                      border
                    />
                    <Input
                      styles="primary"
                      type="phone"
                      name="phone"
                      change={profileForm.handleChange}
                      blur={profileForm.handleBlur}
                      value={profileForm.values.phone}
                      error={
                        profileForm.touched.phone && profileForm.errors.phone
                          ? profileForm.errors.phone
                          : profileForm.errors.phone
                      }
                      label="Phone Number"
                      placeholder="Enter your Phone Number"
                      border
                      required
                    ></Input>
                    <p className="text-secondary text-lg font-medium">
                      Password Change
                    </p>
                    <Input
                      styles="primary"
                      type="password"
                      name="currentPassword"
                      change={profileForm.handleChange}
                      blur={profileForm.handleBlur}
                      value={profileForm.values.currentPassword}
                      error={
                        profileForm.touched.currentPassword &&
                        profileForm.errors.currentPassword
                          ? profileForm.errors.currentPassword
                          : profileForm.errors.currentPassword
                      }
                      label="Current Password"
                      placeholder="Enter your current password"
                      border
                    />
                    <Input
                      styles="primary"
                      type="password"
                      name="newPassword"
                      change={profileForm.handleChange}
                      blur={profileForm.handleBlur}
                      value={profileForm.values.newPassword}
                      error={
                        profileForm.touched.newPassword &&
                        profileForm.errors.newPassword
                          ? profileForm.errors.newPassword
                          : profileForm.errors.newPassword
                      }
                      label="New Password"
                      placeholder="Enter New password"
                      border
                    />
                    <Input
                      styles="primary"
                      type="password"
                      name="confirmPassword"
                      change={profileForm.handleChange}
                      blur={profileForm.handleBlur}
                      value={profileForm.values.confirmPassword}
                      error={
                        profileForm.touched.confirmPassword &&
                        profileForm.errors.confirmPassword
                          ? profileForm.errors.confirmPassword
                          : profileForm.errors.confirmPassword
                      }
                      label="Confirm Password"
                      placeholder="Confirm new password"
                      border
                    />
                    <Button type="primary" buttonType="submit">
                      Save Change
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Orders;
