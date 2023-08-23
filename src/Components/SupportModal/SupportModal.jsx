/**
 * Support() return Support Modal
 *
 * @returns JSX Element
 *
 */
import { useEffect, useState } from "react";
import supportIcon from "../../assets/icons/cd-customer-support.svg";
import Input from "../UiElements/Input/Input";
import Button from "../UiElements/Buttons/Button";
import { useFormik } from "formik";
import { chatData } from "../../Store/Data";

const SupportModal = () => {
  const [isVisible, setVisible] = useState(true);
  const [chat, setChat] = useState([]);
  const supportForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      type: "",
      description: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  // useEffect(() => {
  //   setChat(chatData);
  // }, []);
  return (
    <>
      {!isVisible && (
        <div className=" cursor-pointer z-50 sm:block fixed bottom-4 right-4  ">
          <img
            onClick={() => setVisible(true)}
            className="h-fit w-fit p-4 rounded-full bg-primary"
            src={supportIcon}
            alt=""
          />
        </div>
      )}

      
        <div className={`bg-secondary p-5 border-[#6BCCCB] border rounded-2xl min-w-[23.437rem]  z-50 fixed duration-300 ${isVisible?'bottom-0 md:bottom-4 right-0 md:right-4':'-bottom-[62.5rem] -right-[62.5rem]'}  overflow-y-auto max-h-[90vh]`}>
          <div className="flex justify-between items-center mb-5">
            <span className="text-white font-sans font-bold text-2xl">
              Contact us
            </span>
            <button
              className="cursor-pointer"
              onClick={() => setVisible(false)}
              type="button"
            >
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
          {chat.length <= 0 ? (
            <form onSubmit={supportForm.handleSubmit} className="grid gap-5">
              <Input
                name="name"
                blur={supportForm.handleBlur}
                change={supportForm.handleChange}
                value={supportForm.values.name}
                label="Your Name"
                type="text"
                placeholder="Enter your name"
              />
              <Input
                name="email"
                blur={supportForm.handleBlur}
                change={supportForm.handleChange}
                value={supportForm.values.email}
                label="Email address"
                type="email"
                placeholder="Enter your Email"
              />
              <div className="flex flex-col">
                <label
                  className="text-white font-semibold text-lg block font-sans  pb-2"
                  htmlFor="type"
                >
                  Type of support request
                </label>
                <select
                  defaultValue=""
                  className="bg-white outline-none px-5 py-2 rounded-full select"
                  name="type"
                  value={supportForm.values.type}
                  onChange={supportForm.handleChange}
                  onBlur={supportForm.handleBlur}
                  id=""
                >
                  <option value="">-</option>
                  <option value="account" className="hover:bg-red-500">
                    Account
                  </option>
                  <option value="order">Order</option>
                  <option value="payment">Payment</option>
                  <option value="refund">Refund</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label
                  className="text-white font-semibold text-lg block font-sans  pb-2"
                  htmlFor="type"
                >
                  How can we help you?
                </label>
                <textarea
                  className="rounded-md outline-none p-2"
                  name="description"
                  onChange={supportForm.handleChange}
                  onBlur={supportForm.handleBlur}
                  value={supportForm.values.description}
                  id=""
                  rows="3"
                  placeholder="-"
                ></textarea>
              </div>

              <div className="flex flex-col">
                <p
                  className="text-white font-semibold text-lg block font-sans  pb-2"
                  htmlFor="attachment"
                >
                  Attatchment
                </p>
                <label
                  className="flex gap-2 items-center justify-center cursor-pointer py-[14px] px-5 rounded-full bg-[#FFFFFF33] text-[#6BCCCB]"
                  htmlFor="attachment"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 8.00049V6.00049C8 3.79135 9.79086 2.00049 12 2.00049C14.2091 2.00049 16 3.79135 16 6.00049V18.0005C16 20.2096 14.2091 22.0005 12 22.0005C9.79086 22.0005 8 20.2096 8 18.0005V13.5005C8 12.1198 9.11929 11.0005 10.5 11.0005C11.8807 11.0005 13 12.1198 13 13.5005V16.0005"
                      stroke="#6BCCCB"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Add up to 5 file
                </label>
                <input
                  className="hidden"
                  type="file"
                  name="attachment"
                  id="attachment"
                  multiple
                />
              </div>
              <Button type="primary" buttonType="submit" full>
                Submit
              </Button>
            </form>
          ) : (
            <div className="w-full h-full">
              {/* text area */}
              <div className="w-full h-[22rem] md:h-[38rem]  mb-2 flex flex-col-reverse gap-3 scrollbar overflow-y-auto">
                {chat?.map((chat, index) => {
                  return (
                    <div key={index}
                    className={`flex gap-3 h-fit max-w-[25rem] ${
                      chat?.type !== "customer"
                        ? "ml-auto flex-row-reverse"
                        : ""
                    }`}
                  >
                    <span className="h-10 w-10 flex items-center justify-center shrink-0 rounded-full font-bold text-amber-800 bg-pink-400">
                      XY
                    </span>
                    <div
                      className={`p-2 ${
                        chat?.type === "customer"
                          ? "bg-[#CFF6EF]"
                          : "bg-[#092F3F]"
                      } w-full grid gap-2  rounded-md`}
                    >
                      <div className="flex justify-between w-full">
                        <p className="text-[#3E949A] font-medium text-sm">
                          {chat?.name}
                        </p>
                        <p className="text-[#64748B] text-xs font-semibold">
                          {chat?.date}
                        </p>
                      </div>
                      <div
                        className={
                          chat?.type !== "customer"
                            ? "text-[#a7a7a7]"
                            : "text-[#000316CC] "
                        }
                      >
                        {chat?.message}
                      </div>
                    </div>
                  </div>
                  )
                })}
              </div>
              <textarea
                className="rounded-md outline-none p-2 w-full"
                name="description"
                onChange={supportForm.handleChange}
                onBlur={supportForm.handleBlur}
                value={supportForm.values.description}
                id=""
                rows="3"
                placeholder="-"
              ></textarea>
              <Button type="primary" buttonType="submit" full>
                Submit
              </Button>
            </div>
          )}
        </div>
    
    </>
  );
};

export default SupportModal;
