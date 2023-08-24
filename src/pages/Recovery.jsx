import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Account from "../Components/Credentials/Account";
import Otp from "../Components/Credentials/Otp";
import NewPassword from "../Components/Credentials/NewPassword";
import { useTitle } from "../Components/Hooks/useTitle";
//
const Recovery = () => {
  useTitle("Account Recovery");
  const [component, setComponent] = useState("account");
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const getResponse = (res) => {
    if (res.status === 200) {
      {
        if (res.component === "done") {
          toast.success("Password Reset Successful", {
            style: {
              padding: "16px",
              color: "#0D3D4B",
              backgroundColor: "#F2C852",
            },
            iconTheme: {
              primary: "#198754",
              secondary: "#FFFAEE",
            },
          });
          navigate("/login");
        }
      }
      setComponent(res.component);
      setData(res);
    } else {
      toast.error(res.data, {
        style: {
          border: "1px solid #0D3D4B",
          padding: "16px",
          color: "#0D3D4B",
          backgroundColor: "#F2C852",
        },
        iconTheme: {
          primary: "#FF0000",
          secondary: "#FFFAEE",
        },
      });
    }
  };

  return (
    <div className="bg-secondary min-h-[calc(100vh-225px)] flex items-center">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 relative z-20 justify-center divide-x divide-[#ffffff1a] flex-wrap">
        {component === "account" && <Account getResponse={getResponse} />}
        {component === "otp" && <Otp data={data} getResponse={getResponse} />}
        {component === "newPass" && (
          <NewPassword data={data} getResponse={getResponse} />
        )}
      </div>
    </div>
  );
};

export default Recovery;
