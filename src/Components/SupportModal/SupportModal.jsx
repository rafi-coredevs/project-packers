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
import attachment from '../../assets/icons/attachment.svg'
import toaster from "../../Util/toaster";
import { terminal } from "../../contexts/terminal/Terminal";
import { useUserCtx } from "../../contexts/user/UserContext";
import UserIcon from "../UiElements/UserIcon/UserIcon";
import cancel from '../../assets/icons/cd-cancel-w.svg';

const SupportModal = () => {
  const { user } = useUserCtx()
  const [isVisible, setVisible] = useState(false);
  const [chat, setChat] = useState([]);
  const [images, setImages] = useState([])
  const [support, setSupport] = useState()
  const supportForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      type: "",
      message: "",
    },
    onSubmit: (values) => {
      const data = { message: values.message, type: values.type };
      terminal.request({ name: 'registerSupport', body: { data, images } }).then(data => {
        if (data.id) {
          setVisible(false)
          terminal.request({ name: 'getMessage', params: { id: data.id } }).then(data => {
            if (data.docs) {

              setChat(data.docs)
              setVisible(true)
            }
          })
        }
      })
    },
  });
  useEffect(() => {
    let id = ''
    isVisible && terminal.request({ name: 'userSupport' }).then(data => {
      if (data.id) {
        setSupport(data.id)
        id = data.id
        terminal.socket.on('entry')
        terminal.socket.emit('entry', { "entry": true, "room": data.id })
        terminal.request({ name: 'getMessage', params: { id: data.id }, queries: { limit: 100 } }).then(data => {
          data.docs?.length > 0 && setChat(data.docs)
        })
        terminal.socket.on('message', (data) => {
          if (data.id) {
            setChat(prev => [data, ...prev])
            return
          }
          else if (data == 'closed') {
            setVisible(false)
          }
        })
      }
      else {
        setSupport()
        setChat([])
      }
    })
    return () => {
      terminal.socket.emit('entry', { "entry": false, "room": id })
      terminal.socket.off('entry')
      terminal.socket.off('message')

    }
  }, [isVisible])
  const handleImage = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    if (images.length + filesArray.length <= 5) {
      setImages(prev => [...prev, ...filesArray]);
    } else {
      toaster({ type: 'error', message: 'You can only select up to 5 files.' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    terminal.request({ name: 'sendMessage', params: { id: support }, body: { data: { message: e.target.message.value } } })
  }
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
      <div className={`bg-secondary p-5 min-w-[23.437rem] border-[#6BCCCB] border rounded-2xl fixed bottom-4 right-4 duration-500 origin-bottom-right ${isVisible ? 'bottom-4 right-4 overflow-y-auto scale-75 lg:scale-100 z-[100]' : 'bottom-6 right-6 overflow-hidden scale-0 z-[10]'}`}>
        <div className="flex justify-between items-center mb-5">
          <span className="text-white font-sans font-bold text-2xl">
            Contact us
          </span>
          <button
            className="cursor-pointer"
            onClick={() => setVisible(false)}
            type="button"
          >
            <img src={cancel} className="h-6 w-6" />
          </button>
        </div>
        {chat?.length < 1 ? (
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

                className="bg-white outline-none px-5 py-2 rounded-full select"
                name="type"
                value={supportForm.values.type}
                onChange={supportForm.handleChange}
                onBlur={supportForm.handleBlur}
                id=""
              >
                <option >-</option>
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
                name="message"
                onChange={supportForm.handleChange}
                onBlur={supportForm.handleBlur}
                value={supportForm.values.message}
                id=""
                rows="3"
                placeholder="-"
              ></textarea>
            </div>

            <div className="flex flex-col">
              <p
                className="text-white font-semibold text-lg block font-sans  pb-2"
                htmlFor="images"
              >
                Attatchment
              </p>
              <label
                className="flex gap-2 items-center justify-center cursor-pointer py-[14px] px-5 rounded-full bg-[#FFFFFF33] text-[#6BCCCB]"
                htmlFor="images"
              >
                <img src={attachment} alt="" />
                Add up to 5 file
              </label>
              <input
                onChange={handleImage}
                className="hidden"
                type="file"
                name="images"
                id="images"
                multiple
                max={5}
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
                    className={`flex gap-3 h-fit max-w-[25rem] ${chat.sender?.id === user?.id
                      ? "ml-auto flex-row-reverse"
                      : ""
                      }`}
                  >
                    <span className="h-10 w-10 flex items-center justify-center shrink-0 rounded-full font-bold">
                      <UserIcon name={chat.sender?.fullName} />
                    </span>
                    <div
                      className={`p-2 ${chat.sender?.id === user?.id
                        ? " bg-[#CFF6EF]"
                        : "bg-[#092F3F]"
                        } w-full grid gap-2  rounded-md`}
                    >
                      <div className="flex justify-between w-full">
                        <p className="text-[#3E949A] font-medium text-sm">
                          {chat?.name}
                        </p>
                        <p className="text-[#64748B] text-xs font-semibold">
                          {chat?.time}
                        </p>
                      </div>
                      <div
                        className={
                          chat.sender?.id === user.id ? "text-[#000316CC]" : "text-[#a7a7a7]"
                        }
                      >
                        {chat?.message}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <form onSubmit={handleSubmit} className="">
              <div className="w-full space-y-2">
                <textarea
                  className="outline-none w-full rounded-xl p-3"
                  type="text"
                  rows={3}
                  name='message'
                  placeholder="Type text message"
                />
                <button type='submit' className="text-secondary bg-primary font-bold rounded-xl w-full py-[14px] px-[40px]">
                  Send
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

    </>
  );
};

export default SupportModal;
