/**
 * LoginModal() returns JSX Element
 * @param {boolean} show takes boolean value to hide and show modal
 * @param {function} onClose is callback function to close modal.
 * 
 * @returns JSX Element 
 */

import { useState } from "react";
import AccountModal from "../MobileCredentials/AccountModal";
import SignInModal from "../MobileCredentials/SignInModal";
import SignupModal from "../MobileCredentials/SignupModal";
import ResetModal from "../MobileCredentials/ResetModal";
import { toast } from "react-hot-toast";
import OtpModal from "../MobileCredentials/OtpModal";
import ResetPasswordModal from "../MobileCredentials/ResetPasswordModal";
const LoginModal = ({ show, onClose }) => {
  const [activeScreen, setActiveScreen] = useState("account");
  const [data,setData]= useState({});
  
  const getResponse = (res) =>{
    if(res.status===200){
     {
       
       if(res.component==='done'){
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
         setActiveScreen('account')
         
       }
     }
     setActiveScreen(res.component);
     setData(res);
     console.log(res)
    }
    else {
     toast.error(res.data,{
       style: {
         border: '1px solid #0D3D4B',
         padding: '16px',
         color: '#0D3D4B',
         backgroundColor: '#F2C852'
       },
       iconTheme: {
         primary: '#FF0000',
         secondary: '#FFFAEE',
       },
     });
    }
 
   }
  const stateHandler = (state) => {
    setActiveScreen(state);
  };

  const closeHandler = () => {
    setActiveScreen("account");
    onClose();
  };

  
    return (
      <>
      <div className={`${show ? "block" : " hidden"}    fixed bottom-0 top-0 left-0 right-0 bg-[#03182ACC] z-[50] `}>
       </div>
        <div className={`fixed ${show?'bottom-0 ':'-bottom-[1000px] '}  duration-500 left-0 right-0 bg-secondary rounded-t-xl py-5 px-[30px] z-[60]`}>
          <div className="grid gap-8">
            {activeScreen === "account" && (
              <AccountModal stateHandler={stateHandler} onClose={closeHandler} />
            )}

            {activeScreen === "login" && (
              <SignInModal stateHandler={stateHandler} onClose={closeHandler} />
            )}

            {activeScreen === "signup" && (
              <SignupModal stateHandler={stateHandler} onClose={closeHandler} />
            )}

            {activeScreen === "reset" && (
              <ResetModal getResponse={getResponse} stateHandler={stateHandler} onClose={closeHandler} />
            )}

            {activeScreen === "otp" && (
              <OtpModal data={data} getResponse={getResponse} stateHandler={stateHandler} onClose={closeHandler} />
            )}

            {activeScreen === "resetPassword" && (
              <ResetPasswordModal data={data} getResponse={getResponse} stateHandler={stateHandler} onClose={closeHandler} />
            )}
          </div>
        </div></>
      
    );
  }

export default LoginModal;
