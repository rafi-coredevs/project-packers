import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.svg";
import IconCall from "../../assets/icons/cd-call-green.svg";
import IconSupport from "../../assets/icons/cd-customer-support-green.svg";
import IconLoaction from "../../assets/icons/cd-location-green.svg";
import visa from "../../assets/icons/visa.png";
import masterCard from "../../assets/icons/mastercard.png";
import aExpress from "../../assets/icons/american-express.png";
import bkash from "../../assets/icons/bkash.png";
import rocket from "../../assets/icons/rocket.png";
import nagad from "../../assets/icons/nagad.png";
import dbbl from "../../assets/icons/dbbl.png";
import paypal from "../../assets/icons/paypal.png";
import facebook from "../../assets/icons/cd-facebook.svg";
import insta from "../../assets/icons/cd-instagram.svg";
import twitter from "../../assets/icons/cd-twitter.svg";
const Footer = () => {
  const date = new Date().getFullYear();

  const location = useLocation().pathname;
  if (
    location === "/login" ||
    location === "/reset" ||
    location === "/signup"
  ) {
    return (
      <footer className="bg-secondary pt-14">
        <div className="container mx-auto flex flex-col items-center ">
          <div className="flex w-full justify-center py-7 sm:px-0 flex-col sm:flex-row border-t border-[#FFFFFF33]">
            <p className="font-sans text-center font-normal text-base text-[#ffffffb0] ">
              Use of Project Packers signifies agreement with our Privacy Notice
              and Terms of Service <br /> © {date} Project Packers. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }
  return (
    <footer className="bg-secondary pt-14">
      <div className="container mx-auto flex flex-col items-center ">
        <div className="grid grid-cols-1 px-5 sm:px-0 sm:grid-cols-4 gap-8 pb-12 border-b border-[#FFFFFF33]">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Project Packers" />
              <div className="text-white text-base font-bold leading-none">
                Project
                <br />
                Packers
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex gap-2">
                <img src={IconCall} alt="" />
                <Link
                  className="text-white font-sans text-base font-normal"
                  to="tel:+8801265699958"
                >
                  +880 12656 99958
                </Link>
              </div>
              <div className="flex gap-2">
                <img src={IconSupport} alt="" />
                <Link
                  className="text-white font-sans text-base font-normal"
                  to="email:support@projectpackers.com"
                >
                  Support@projectpackers.com
                </Link>
              </div>
              <div className="flex gap-2 text-white font-sans text-base font-normal">
                <img src={IconLoaction} alt="" />
                2118 Thornridge Cir. Syracuse, Connecticut 35624
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <p className="text-[#6BCCCB] font-sans text-lg font-semibold">
              Quick Navigation
            </p>
            <div className="flex flex-col gap-5 text-white text-base font-sans font-normal">
              <div>
                <Link to="/">Home</Link>
              </div>
              <div>
                <Link to="/about">About Us</Link>
              </div>
              <div>
                <Link to="account/orders">My Request</Link>
              </div>
              <div>
                <Link to="/comingsoon">Contact Us</Link>
              </div>
              <div>
                <Link to="/blog">Blog</Link>
              </div>
              <div>
                <Link to="/comingsoon">Careers</Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <p className="text-[#6BCCCB] font-sans text-lg font-semibold">
              Help
            </p>
            <div className="flex flex-col gap-5 text-white text-base font-sans font-normal">
              <div>
                <Link to="/support">Support</Link>
              </div>
              <div>
                <Link to="/comingsoon">How Project Packers Works</Link>
              </div>
              <div>
                <Link to="/comingsoon">Shipping & Delivery</Link>
              </div>
              <div>
                <Link to="/comingsoon">Cancellation & Refund</Link>
              </div>
              <div>
                <Link to="/faq">FAQs</Link>
              </div>
              <div>
                <Link to="/comingsoon">Live Chat Support</Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <p className="text-[#6BCCCB] font-sans text-lg font-semibold">
              Payment Methods
            </p>
            <div className="grid grid-cols-4  gap-2">
              <img className="w-full" src={visa} alt="" />
              <img className="w-full" src={masterCard} alt="" />
              <img className="w-full" src={aExpress} alt="" />
              <img className="w-full" src={bkash} alt="" />
              <img className="w-full" src={rocket} alt="" />
              <img className="w-full" src={nagad} alt="" />
              <img className="w-full" src={dbbl} alt="" />
              <img className="w-full" src={paypal} alt="" />
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between flex-wrap px-5 sm:px-0 flex-col sm:flex-row py-4">
          <p className="font-sans font-normal text-base text-[#ffffffb0] ">
            © Copyright 2023 Project Packers
          </p>
          <div className="pt-5 sm:pt-0 flex-wrap flex gap-5">
            <Link to="/">
              <img src={facebook} alt="" />
            </Link>
            <Link to="/">
              <img src={insta} alt="" />
            </Link>
            <Link to="/">
              <img src={twitter} alt="" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
