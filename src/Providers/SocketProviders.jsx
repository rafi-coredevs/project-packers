import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { BASE_URL, getApi } from "../Util/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../Store/userSlice";
export const SocketContext = createContext(null);

const SocketProviders = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user, notifications } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) {
      const newSocket = io(BASE_URL, {
        withCredentials: true,
      });
      newSocket.on("connect", () => {
        console.log("Connected to server via socket");
      });

      newSocket.on("disconnect", () => {
        console.log("Disconnected from server via socket");
      });
      newSocket?.on('notification', (data)=>{
        dispatch(setNotification({ docs:[data,...notifications.data], totalDocs: notifications.totalDocs+1}))
      });
      setSocket(newSocket);
    }
  }, []);

  useEffect(()=>{
    if(user){
      getApi('/notifications?paginate=true&limit=20')
      .then(res=> {
        if(res.totalDocs!==notifications?.totalDocs){
          dispatch(setNotification(res));
        }

      })
    }

  },[user])


  const data = {
    socket,
  };
  return (
    <SocketContext.Provider value={data}>{children}</SocketContext.Provider>
  );
};

export default SocketProviders;
