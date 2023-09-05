import Header from "../Components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Sidebar from "../Components/Header/Sidebar";
import { useState } from "react";
import SupportModal from "../Components/SupportModal/SupportModal";
import ReloadPage from "../pages/ReloadPage";
import { useUserCtx } from "../contexts/user/UserContext";

const Main = () => {
  const [toggle, setToggle] = useState(false);
  const toggleHandler = () => setToggle(!toggle);
  const [reload, setReload] = useState(true);
  setTimeout(() => setReload(false), 1000);
  const { user } = useUserCtx()

  return <>
    {
      reload ? <ReloadPage /> :
        <div className="overflow-x-hidden" >
          <Sidebar state={toggle} onChange={toggleHandler} />
          <div className={`min-h-screen flex flex-col min-w-full duration-300 shadow-2xl ${toggle ? "ml-[78vw] sm:ml-0 sm:duration-0" : ""}`}>
            {user?.id && <SupportModal />}
            <Header sideBar={toggleHandler} state={toggle} />
            <Outlet />
            <Footer />
          </div>
        </div >
    }
  </>;
};

export default Main;
