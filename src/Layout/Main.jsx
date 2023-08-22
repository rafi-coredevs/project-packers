import Header from "../Components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Sidebar from "../Components/Header/Sidebar";
import { useState } from "react";
import Support from "../Components/Support/Support";

const Main = () => {
  const [toggle, setToggle] = useState(false);
  const toggleHandler = () => setToggle(!toggle);
  return (
    <div>
      <Sidebar state={toggle} onChange={toggleHandler} />
      <div
        className={`min-h-screen flex flex-col min-w-full duration-300 shadow-2xl ${
          toggle ? "ml-[18rem] sm:ml-0 sm:duration-0" : ""
        }`}
      >
        <Support />
        <Header sideBar={toggleHandler} state={toggle} />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Main;
