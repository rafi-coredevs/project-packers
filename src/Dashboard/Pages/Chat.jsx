import { useState, useEffect } from "react";
import ChatCard from "../Components/UiElements/ChatCard/ChatCard";
import { terminal } from "../../contexts/terminal/Terminal";
import Messages from "../Components/UiElements/Messages/Messages";
const buttonStyle = {
  active: "bg-secondary text-white",
  deactive: "bg-white text-black",
};
const Chat = () => {
  const [activeStatusButton, setActiveStatusButton] = useState("all");
  const [supportType, setSupportType] = useState("all");
  const [supportData, setSupportData] = useState([]);
  const [activeChat, setActiveChat] = useState();
  useEffect(() => {
    terminal.request({ name: 'allSupport', queries: { status: activeStatusButton, type: supportType } }).then(data => {
      setSupportData(() => {
        return data.length > 0 && data?.map(support => {
          return {
            id: support.id,
            status: support.status,
            type: support.type,
          }
        }
        )
      })
    })
  }, [activeStatusButton, supportType])

  const chatCardHandler = (element) => {
    setActiveChat(element)
  }
  const actionButtonHandler = (value) => {
    setActiveStatusButton(value);
  };
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3 hidden sm:grid gap-2 pt-5 px-5">
        <div className="border border-[#0000001c] text-sm rounded-md overflow-hidden flex">
          <button
            onClick={() => actionButtonHandler("all")}
            className={`py-2 px-4 font-medium ${activeStatusButton === "all"
              ? buttonStyle["active"]
              : buttonStyle["deactive"]
              }`}
          >
            <div className=" flex gap-2 items-center">
              <span className="w-2 h-2  rounded-full bg-yellow-500"></span>
              <p className="">All</p>
            </div>
          </button>
          <button
            onClick={() => actionButtonHandler("open")}
            className={`py-2 px-4 font-medium ${activeStatusButton === "open"
              ? buttonStyle["active"]
              : buttonStyle["deactive"]
              }`}
          >
            <div className=" flex gap-2 items-center">
              <span className="w-2 h-2  rounded-full bg-green-500"></span>
              <p className="">Open</p>
            </div>
          </button>
          <button
            onClick={() => actionButtonHandler("close")}
            className={`py-2 px-4 font-medium ${activeStatusButton === "close"
              ? buttonStyle["active"]
              : buttonStyle["deactive"]
              }`}
          >
            <div className=" flex gap-2 items-center">
              <span className="w-2 h-2  rounded-full bg-red-500"></span>
              <p className="">Close</p>
            </div>
          </button>
          <div className="py-2 px-1   font-medium">
            <select
              onChange={(e) => setSupportType(e.target.value)}
              className=" bg-white outline-none" defaultValue="all"
            >
              <option selected>
                Support Type
              </option>
              <option value="all">All</option>
              <option value="account">Account</option>
              <option value="order">Order</option>
              <option value="payment">Payment</option>
              <option value="refund">Refund</option>
            </select>
          </div>
        </div>
        <div className="">
          <div className="overflow-hidden overflow-y-auto  h-[calc(100vh-140px)]">
            {supportData.length > 0 && supportData.map((chat) => (
              <ChatCard
                onClick={chatCardHandler}
                active={activeChat?.id}
                key={chat.id}
                status={chat.status}
                type={chat.type}
                id={chat.id}
                message={chat.message}
              />
            ))}
          </div>
        </div>
      </div>
      {
        activeChat?.id && <Messages activeChat={activeChat} />
      }
    </div>

  );
};



export default Chat;