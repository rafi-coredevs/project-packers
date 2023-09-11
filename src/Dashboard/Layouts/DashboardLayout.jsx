import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "../Components/Header/Header";
import { useUserCtx } from "../../contexts/user/UserContext";
import { useNavigate } from "react-router-dom";
import Loading from "../../routes/Loading";

import DDNav from "../Components/DDNav/DDNav";

const DashboardLayout = () => {
  const { user, loading } = useUserCtx();
  const navigate = useNavigate();
  const location = useLocation();
  const accessByRole = { admin: true, staff: true, "super-admin": true };

  if (loading) {
    return <Loading />;
  } else {
    if (!user) {
      navigate("/login", { state: { afterLogin: location.pathname } });
    } else if (accessByRole[user.role]) {
      return (
        <div className="grid grid-cols-12 font-inter">
          <div className="col-span-12">
            <Header />
          </div>
          <div className="col-span-2 h-[calc(100vh-68px)] hidden sm:block">
            <DDNav userRole={user.role} />
          </div>
          <div className="col-span-12 sm:col-span-10  shadow-md overflow-y-auto h-full sm:h-[calc(100vh-68px)]">
            <Outlet />
          </div>
        </div>
      );
    } else {
      return <Navigate to="/" replace={true} />
    }
  }
};

export default DashboardLayout;
