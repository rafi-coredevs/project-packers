import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import SideBar from "../Components/Header/SideBar";

const DashboardLayout = () => {
  return (
    <div className="grid grid-cols-12 font-inter">
      <div className="col-span-12">
        <Header />
      </div>
      <div className="col-span-2 h-[calc(100vh-68px)] hidden sm:block">
        <SideBar />
      </div>
      <div className="col-span-12 sm:col-span-10  shadow-md overflow-y-auto h-full sm:h-[calc(100vh-68px)]">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
