/**
 * SupportModal()
 * This Element only shows when user logged in
 * 
 * @param {boolean} args.show - modal close and open based on this props
 * @param {function} args.onChange - callback function to handle state.
 * 
 * @return JSX Element.
 */

import { useEffect, useRef, useState } from "react";
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
import loader from '../../assets/icons/cd-reload-white.svg'
import { useSupportCtx } from "../../contexts/support/SupportContext";
const SupportModal = () => {
  const { user } = useUserCtx()
  const [chat, setChat] = useState([]);
  const [images, setImages] = useState([])
  const [support, setSupport] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isClosed, setClosed] = useState(false)
  const messageBody = useRef(null)

  const {supportState, enableSupport, disableSupport} = useSupportCtx();
  const supportForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      type: "",
      message: "",
    },
    onSubmit: (values, { resetForm }) => {
      const data = { message: values.message, type: values.type };
      terminal.request({ name: 'registerSupport', body: { data, images } }).then(data => {
        if (data.id) {

          terminal.request({ name: 'getMessage', params: { id: data.id } }).then(data => {
            if (data.docs) {
              setChat(data.docs)
              setTotalPage(data.totalPages)
              setPage(data.page)
              terminal.socket.emit('entry', { "entry": true, "room": data.id })
              resetForm()
            }
          })
        }
      })
      setClosed(false);
    },
  });


  useEffect(() => {
    let id = ''
    supportState && terminal.request({ name: 'userSupport' }).then(data => {
      if (data.id) {
        setSupport(data.id)
        id = data.id
        terminal.socket.emit('entry', { "entry": true, "room": id })
        terminal.request({ name: 'getMessage', params: { id: data.id }, queries: { page: 1 } }).then(data => {
          data.docs?.length > 0 && setChat(data.docs), setTotalPage(data.totalPages), setPage(data.page)
        })
        terminal.socket.on('message', (data) => {

          if (data.id) {
            setChat(prev => [data, ...prev])
            return
          }
          else if (data == 'closed') {
            // condtions
            disableSupport();
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
      terminal.socket.off('message')

    }

  }, [supportState])

  // Chat close
  const handleEnd = () => {

    setClosed(true);
    terminal.request({ name: 'updateSupport', params: { id: support }, body: { status: 'close', user: null } }).then(data => {
      if (data.id) {
        setClosed(true);
        return
      }
      toaster({ type: 'error', message: 'An error occurred' })
    })

  }

  const newChatHandler = () => {
    // setVisible(false);
    setSupport()
    setChat([])
    // setVisible(true);
  }

  const handleImage = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    if (images.length + filesArray.length <= 5) {
      setImages(prev => [...prev, ...filesArray]);
    } else {
      toaster({ type: 'error', message: 'You can only select up to 5 files.' });
    }
  };

  let throttleTimer;
  const debounce = (callback, time) => {
    if (throttleTimer) return;
    throttleTimer = true;
    setTimeout(() => {
      callback();
      throttleTimer = false;
    }, time);
  };

  const handleScroll = () => {
    if (messageBody.current.scrollTop - messageBody.current.clientHeight + messageBody.current.scrollHeight < 1) {
      setLoading(true);
      if (page < totalPage) {
        const nextPage = page + 1;
        debounce(() => {
          terminal.request({ name: 'getMessage', params: { id: support }, queries: { page: nextPage } }).then(data => {
            if (data.docs?.length > 0) {
              setChat(prev => [...prev, ...data.docs]);
            }
            setLoading(false);
          });
        }, 500)
        setPage(nextPage);
      } else {
        setLoading(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    terminal.request({ name: 'sendMessage', params: { id: support }, body: { data: { message: e.target.message.value } } })
    e.target.message.value = ''
  }

  return (
    <>
      {!supportState && (
        <div className=" cursor-pointer z-50 sm:block fixed bottom-4 right-4  ">
          <img
            onClick={() => enableSupport()}
            className="h-fit w-fit p-4 rounded-full bg-primary"
            src={supportIcon}
            alt=""
          />
        </div>
      )}
      <div className={`bg-secondary p-5 min-w-[23.437rem] border-[#6BCCCB] border rounded-2xl fixed bottom-4 right-4 duration-500 origin-bottom-right ${supportState ? 'bottom-4 right-4 overflow-y-auto scale-75 lg:scale-100 z-[100]' : 'bottom-6 right-6 overflow-hidden scale-0 z-[10]'}`}>

        {chat?.length < 1 ? (
          <>          <div className="flex justify-between items-center mb-5">
            <span className="text-white font-sans font-bold text-2xl">
              Contact us
            </span>
            <button
              className="cursor-pointer"
              onClick={() => { disableSupport() }}
              type="button"
            >
              <img src={cancel} className="h-6 w-6" />
            </button>
          </div>
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

                  rows="3"
                  placeholder="-"
                ></textarea>
              </div>

              <div className="flex flex-col">
                <p
                  className="text-white font-semibold text-lg block font-sans  pb-2"

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
          </>
        ) : (
          <>          <div className="flex justify-between items-center mb-5">
            <button onClick={() => { handleEnd() }} className="text-white hover:bg-slate-200 hover:text-black px-2 py-1 rounded duration-200">End</button>
            <span className="text-white font-sans font-bold text-2xl">
              Chat
            </span>
            <button
              className="cursor-pointer"
              onClick={() => { disableSupport()}}
              type="button"
            >
              <img src={cancel} className="h-6 w-6" />
            </button>
          </div>
            <div className="w-full h-full relative">
              {/* text area */}
              {
                loading &&
                <div className='absolute flex w-full justify-center text-primary'>
                  <img src={loader} alt="" className='animate-spin' />
                </div>
              }
              <div ref={messageBody} onScroll={handleScroll} className="w-full h-[22rem] md:h-[38rem]  mb-2 flex flex-col-reverse gap-3 scrollbar overflow-y-auto">

                {chat?.map((chat, index) => {
                  return (
                    <div key={index}
                      className={`flex gap-3 h-fit max-w-[20rem] ${chat.sender?.id === user?.id
                        ? "ml-auto flex-row-reverse"
                        : ""
                        }`}
                    >
                      <span className="h-10 w-10 flex items-center justify-center shrink-0 rounded-full font-bold">
                        <UserIcon name={chat.sender?.fullName} />
                      </span>
                      <div
                        className={`p-2 w-[100%] ${chat.sender?.id === user?.id
                          ? " bg-[#CFF6EF]"
                          : "bg-[#092F3F]"
                          } w-full grid gap-2  rounded-md`}
                      >
                        <div className="flex justify-between w-full">
                          <p className="text-[#3E949A] font-medium text-sm">
                            {chat?.name}
                          </p>
                          <p className="text-[#64748B] text-xs font-semibold">
                            {new Intl.DateTimeFormat('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric',
                              hour12: true,
                            }).format(new Date(chat?.time))}
                          </p>
                        </div>
                        <span className={`${chat.sender?.id === user.id ? "text-[#000316CC]" : "text-[#a7a7a7] w-[300px]"} break-all w-full `
                        }>
                          {chat?.message}

                        </span>
                      </div>
                    </div>
                  )
                })}

              </div>
              {isClosed ? <>


                <p className="text-white text-center">Chat has been closed. <span onClick={() => newChatHandler()} className="text-primary cursor-pointer">Start new Chat</span></p>
              </>
                :
                null
              }
              {!isClosed && <form onSubmit={handleSubmit} className="">
                <div className="w-full space-y-2">
                  <textarea
                    className="outline-none w-full rounded-xl p-3"
                    type="text"
                    rows={3}
                    maxLength={600}
                    name='message'
                    placeholder="Type text message"
                  />
                  <button type='submit' className="text-secondary bg-primary font-bold rounded-xl w-full py-[14px] px-[40px]">
                    Send
                  </button>
                </div>
              </form>}
            </div>
          </>

        )}
      </div>

    </>
  );
};

export default SupportModal;
