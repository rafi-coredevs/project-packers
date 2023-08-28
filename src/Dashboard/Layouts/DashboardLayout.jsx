import { useEffect } from 'react'
import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import { UserProvider, useUserCtx } from '../../contexts/user/UserContext'
import { useNavigate } from 'react-router-dom';
import Loading from '../../routes/Loading';
import Unauthorized from '../../routes/Unauthorized';

import DDNav from "../Components/DDNav/DDNav";

const DashboardLayout = () => {

  const { user, loading } = useUserCtx();
  const navigate = useNavigate();
  const accessByRole = { "admin": true, "staff": true, "super-admin": true }


  if (loading) {
    return <Loading />
  }
  else {
    if (!user) {
      navigate("/login");
    }
    else if (accessByRole[user.role]) {
      return <div className="grid grid-cols-12 font-inter">
        <div className="col-span-12">
          <Header />
        </div>
        <div className="col-span-2 h-[calc(100vh-68px)] hidden sm:block">

          <DDNav />
        </div>
        <div className="col-span-12 sm:col-span-10  shadow-md overflow-y-auto h-full sm:h-[calc(100vh-68px)]">
          <Outlet />
        </div>
      </div>
    }
    else {
      navigate("/")
    }
  }

};

export default DashboardLayout;
