import { useState, useEffect, useContext } from "react";
import ChatCard from "../Components/UiElements/ChatCard/ChatCard";

import ChatBubble from "../Components/UiElements/ChatBubble/ChatBubble";
import Button from '../Components/UiElements/Button/Button'
import { getApi, postApi } from "../../Util/apiCall";

const buttonStyle = {
  active: "bg-secondary text-white",
  deactive: "bg-white text-black",
};
const Chat = () => {
  const [chatData,setChatData]= useState([]);
  const [filteredData,setFilteredData]= useState([]);
  const [toggle,setToggle]= useState('all');
 

 
 
  


  // useEffect(()=>{
  //   getApi('/support').then(res=>{
  //     setChatData(res.docs);
  //   },)

  // },[]);
  useEffect(()=>{
    setFilteredData(chatData);
  },[chatData])

  // useEffect(()=>{
  //   socket?.emit('joinRoom','supportRoom');
  //   Object.keys(supportRoom).forEach(item=>socket?.emit('joinRoom',item));
  //   socket?.on('newChat',(data)=>{
  //     setChatData(prev=>[data,...prev])
  //   });
  //   socket?.on('supportChat',(data)=>{
  //     if(data.id===activeChat.id){
  //       dispatch(storeActiveChat(data))
  //     }
  //     const index = chatData.findIndex(item=> item.id===data.id);
  //     chatData[index]=data;
  //     setChatData(prev=>[...prev]);

  //   })

    

  // },[socket])

  
  

  const toggleData = (status)=>{
    setToggle(status);
    setFilteredData(status==='all'?chatData:chatData.filter(item=> item.status===status))
  }
  const typedData = (type) =>{
    setFilteredData(type==='all'?chatData:chatData.filter(item=> item.type===type))
  }
  const acceptChat = () =>{
    postApi(`/support/${activeChat.id}`,{})
    .then(res=>{
      if(res.status===200){
        const index = chatData.findIndex(item=> item.id===res.data.id);
        chatData[index]=res.data;
        setChatData(prev=>[...prev]);
        dispatch(storeActiveChat(res.data));
        dispatch(storeSupportRoom(res.data.id));
        socket?.emit('joinRoom',res.data.id);
      }
      else{
        console.log('Something wents wronh');
      }
    })
  }
 
  
  

  return (
  
    <div className="grid grid-cols-12">
      
      <div className="col-span-3 hidden sm:grid gap-2 pt-5 px-5">
        <div className="border border-[#0000001c] text-sm rounded-md overflow-hidden flex">
          <button
            onClick={() => toggleData("all")}
            className={`py-2 px-4 font-medium ${
              toggle === "all"
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
            onClick={() => toggleData("open")}
            className={`py-2 px-4 font-medium ${
              toggle === "open"
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
            onClick={() => toggleData("close")}
            className={`py-2 px-4 font-medium ${
              toggle === "close"
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
              onChange={(e) => typedData(e.target.value)}
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
            
            {filteredData.map((chat) => (
              <ChatCard
                onClick={()=>dispatch(storeActiveChat(chat))}
                key={chat?.id}
                status={chat?.status}
                type={chat?.type}
                order={chat?.order}
                id={chat?.id}
                message={chat?.message}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-12 sm:col-span-9 relative bg-[#E2E8F0]">
      {activeChat.status==='pending' && <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#0000004b] z-10">
                <div className="h-full w-full flex items-center justify-center">
                  <div className="flex gap-2">

                  <Button onClick={()=> console.log("Decline")} style="secondary">Decline</Button>
                  <Button  onClick={acceptChat} style="primary">Accept</Button>
                  </div>
                </div>
              </div>}
        <div className="flex justify-between items-center px-8 py-3 shadow-sm">
          <div className="">
            <div className="flex gap-2 items-center">
              <span className={`h-2 w-2 rounded-full bg-green-600`}></span>
              <p className="text-[#475569] font-medium first-letter:uppercase">
                {"Refund"}
              </p>
            </div>
            <p className="text-sm font-medium">Order ID#123456</p>
          </div>
          <div className="">
            <select
              className="bg-transparent outline-none cursor-pointer"
              name=""
              id=""
            >
              <option value="open" selected>
                Open
              </option>
              <option value="close" selected>
                Close
              </option>
            </select>
          </div>
        </div>
        <div className="px-8 py-2 relative h-[calc(100vh-215px)]  w-full">
          <div className="h-full overflow-y-auto flex  flex-col-reverse gap-12 pb-2">
           {
            activeChat?.chats?.map((chat,i)=><ChatBubble
            key={i}
            type="customer"
            name={chat.user.name}
            date={chat.date}
            message={chat.message}/>)
           }
          </div>
          <div className="p-3 border border-[#0000002a] rounded bg-white">
            <div className="w-full flex ">
              <input
                className="outline-none w-full"
                type="text"
                placeholder="Type text message"
              />
              <button className="text-secondary bg-primary font-bold rounded-full py-[14px] px-[40px]">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Chat;