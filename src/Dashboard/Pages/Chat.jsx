import { useState, useEffect } from "react";
import {
  ChatCard,
  LazyChatCard,
} from "../Components/UiElements/ChatCard/ChatCard";
import { terminal } from "../../contexts/terminal/Terminal";
import Messages from "../Components/UiElements/Messages/Messages";
import EmptyMassage from "../Components/UiElements/Messages/EmptyMassage";
import { useTitle } from "../../Components/Hooks/useTitle";

const buttonStyle = {
  active: "bg-secondary text-white",
  deactive: "bg-white text-black",
};
const Chat = () => {
  useTitle("Support");
  const [activeStatusButton, setActiveStatusButton] = useState("all");
  const [supportType, setSupportType] = useState("all");
  const [supportData, setSupportData] = useState([]);
  const [activeChat, setActiveChat] = useState({});

  useEffect(() => {
    terminal.socket.on("notification", (data) => {
      if (data.message == "There is a new support request") {
        terminal
          .request({
            name: "allSupport",
            queries: { status: activeStatusButton, type: supportType },
          })
          .then((data) => {
            setSupportData(() => {
              return (
                data.length > 0 &&
                data?.map((support) => {
                  return {
                    id: support.id,
                    status: support.status,
                    type: support.type,
                    number: support.supportNumber,
                    room: support?.user?.id
                  };
                })
              );
            });
          });
      }
    });
    return () => {
      terminal.socket.off("notification");
    };
  });
  useEffect(() => {
    terminal
      .request({
        name: "allSupport",
        queries: { status: activeStatusButton, type: supportType },
      })
      .then((data) => {
        setSupportData(() => {
          return (
            data.length > 0 &&
            data?.map((support) => {
              return {
                id: support.id,
                status: support.status,
                type: support.type,
                number: support.supportNumber,
                room: support?.user?.id
              };
            })
          );
        });
      });
  }, [activeStatusButton, supportType, activeChat]);

  const chatCardHandler = (element) => {
    setActiveChat(element);
  };
  const actionButtonHandler = (value) => {
    setActiveStatusButton(value);
  };

  // const supportTypes = [{ id: 1, name: "All", value: "all" }, { id: 2, name: "Account", value: "account" }, { id: 3, name: "Order", value: "order" }, { id: 4, name: "Payment", value: "payment" }, { id: 5, name: "Refund", value: "refund" }]

  // const supportTypeHandler = (id) => setSupportType(supportTypes.find(item => item.id === id));

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3 shrink-0 hidden sm:grid gap-2 pt-5 px-5">
        <div className=" border border-[#0000001c] text-sm rounded-md overflow-hidden flex">
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
          <div className="py-2 px-1 font-medium w-full ">
            <select
              onChange={(e) => setSupportType(e.target.value)}
              className=" bg-white outline-none w-full "
              defaultValue="all"
            >
              <option selected value="all">
                All
              </option>
              <option value="account">Account</option>
              <option value="order">Order</option>
              <option value="payment">Payment</option>
              <option value="refund">Refund</option>
            </select>

            {/* <CustomSelect value={supportType} options={supportTypes} onChange={categoryHandler} /> */}
          </div>
        </div>
        <div className="">
          <div className="overflow-hidden overflow-y-auto  h-[calc(100vh-140px)]">
            {supportData.length === 0
              ? supportData.map((chat, i) => <LazyChatCard key={i} />)
              : supportData.length > 0 &&
              supportData?.map((chat) => (
                <ChatCard
                  onClick={chatCardHandler}
                  active={activeChat?.id}
                  key={chat.id}
                  status={chat.status}
                  type={chat.type}
                  id={chat.id}
                  number={chat.number}
                  message={chat.message}
                  room={chat.room}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="col-span-12 sm:col-span-9 relative bg-[#E2E8F0]">
        {activeChat?.id ? (
          <Messages
            chatCardHandler={chatCardHandler}
            activeChat={activeChat}
            setSupportData={setSupportData}
          />
        ) : (
          <EmptyMassage />
        )}
      </div>
    </div>
  );
};

export default Chat;
