import Breadcrumb from "../Components/UiElements/Breadcrumb/Breadcrumb";
import Input from "../Components/UiElements/Input/Input";
import ordericon from "../assets/icons/cd-order.svg";
import profile from "../assets/icons/user-1.svg";
import logout from "../assets/icons/logout-01.svg";
import eye from "../assets/icons/eye.svg";
import { useEffect, useState } from "react";
import Badge from "../Components/UiElements/Badge/Badge";
import Button from "../Components/UiElements/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { profileSchema } from "../Util/ValidationSchema"
import { useUserCtx } from "../contexts/user/UserContext";
import { terminal } from "../contexts/terminal/Terminal";

const Orders = () => {
  const { Logout, user } = useUserCtx()
  const [active, setActive] = useState("orders");
  const [order, setOrder] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    profileForm.setValues({
      'fullName': user?.fullName,
      'phone': user?.phone,
      'email': user?.email,
    });
  }, [user]);
  const profileForm = useFormik({
    initialValues: {
      fullName:  '',
      email: '',
      phone: '',
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      removeEmptyFields(values)
      delete values.email
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
          phone: values.phone,
          fullName: values.fullName,
        };
        if (values.newPassword !== "")
          data.password = {
            new: values.newPassword,
            old: values.currentPassword,
          };
        console.log(data);
        // terminal.request({ name: 'updateOwnProfile', body: { data } }).then(data => {
        //   if (data.id) {
        //     setUser(data)
        //     toaster({ type: 'success', message: 'Profile Updated Successfully!!' })
        //   }
        // })
      }
    },
  });

  const logoutHandler = () => {
    Logout()
    navigate("/");
  };

  useEffect(() => {
    terminal.request({ name: 'userOrder' }).then(data => data.docs && setOrder(data.docs))
  },[])
  return (
    <>
      <Breadcrumb title={active} />
      <main>
        <div className="container mx-auto p-5 sm:p-0 overflow-hidden">
          <div className="grid grid-cols-5 sm:mt-[60px] sm:mb-[160px] mb-5 gap-[30px]">
            <div className="col-span-5 sm:col-span-1">
              <div className="p-5 flex flex-row sm:flex-col gap-5 border rounded-xl text-base font-semibold ">
                <button
                  onClick={() => setActive("orders")}
                  className={`py-3 px-8 flex  gap-[10px] w-full rounded-full hover:bg-primary ${active === "orders" ? "bg-primary" : "bg-white border"
                    }`}
                >
                  <img src={ordericon} />
                  <span className="hidden sm:block">Orders</span>
                </button>
                <button
                  onClick={() => setActive("profile")}
                  className={`py-3 px-8 flex  gap-[10px] w-full rounded-full hover:bg-primary ${active === "account" ? "bg-primary" : "bg-white border"
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
                <>
                  {
                    order?.length < 1 ? <div>
                      <p>No orders available</p>
                    </div> : <div className="w-full overflow-x-auto">
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
                            {
                              order?.map(item => {
                                const formattedDate = new Intl.DateTimeFormat('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: 'numeric',
                                  minute: 'numeric',
                                  hour12: true,
                                }).format(new Date(item.date));
                                return <tr key={item.id} className="border-b text-sm text-black">
                                  <th scope="row" className="p-3 font-normal">
                                    # {item.id}
                                  </th>
                                  <td className="px-6 py-4">{formattedDate}</td>
                                  <td className="px-6 py-4">{item?.products?.length + item?.requests?.length}</td>
                                  <td className="px-6 py-4">{item.total} tk</td>
                                  <td className="px-6 py-4">
                                    <Badge text={item.status} />
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
                              })
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  }
                </>

              ) : (
                <div className="max-w-[700px]">
                  <form
                    onSubmit={profileForm.handleSubmit}
                    className="grid gap-4"
                  >
                    <Input
                      styles="primary"
                      type="text"
                      name="fullName"
                      change={profileForm.handleChange}
                      blur={profileForm.handleBlur}
                      value={profileForm.values.fullName}
                      error={
                        profileForm.touched.fullName &&
                          profileForm.errors.fullName
                          ? profileForm.errors.fullName
                          : null
                      }
                      label="First Name"
                      placeholder="Enter your First Name"
                      border
                    />

                    <Input
                      styles="primary"
                      type="email"
                      name="email"
                      change={profileForm.handleChange}
                      blur={profileForm.handleBlur}
                      value={profileForm.values.email}
                      label="Email Address"
                      placeholder="Enter your Email id"
                      border
                      disabled
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
