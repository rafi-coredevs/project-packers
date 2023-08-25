/**
 * @params {string } args.types to determine where and how the card is to be used and it's inside jsx
 * @params {function} args.onClick - event handler function for button 
 *
 */
import canceled from "../../../../assets/icons/cd-cancel.svg";
import copy from "../../../../assets/icons/cd-copy.svg";
// 
const SideCard = ({ types, onClick, title, name, email, phone, address, orders, message }) => {
  if (types === "customer") {
    return (
      <div className="grid gap-5 p-5 ">
        <div className="flex justify-between">
          <p className="text-base text-secondary font-semibold">Customer</p>
          <button onClick={onClick}>

            <img src={canceled} alt="" />
          </button>
        </div>
        <div className="grid gap-2">
          <p className="underline text-emerald-500">{name}</p>
          <p className="text-[#475569]">{orders || "No Orders"}</p>
        </div>
      </div>
    );
  }
  if (types === "contact") {
    return (
      <div className="grid gap-5 p-5">
        <div className="flex justify-between">
          <p className="text-base text-secondary font-semibold">
            Contact information
          </p>
          <button className="text-emerald-500">Edit</button>
        </div>
        <div className="grid gap-2">
          <div className="flex justify-between items-center">
            <p className=" text-emerald-500">{email || "No Details"}</p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(email || "No email");
              }}
            >
              <img className="opacity-70" src={copy} alt="" />
            </button>
          </div>
          <p className="text-[#475569]">{phone || "No Phone Number"}</p>
        </div>
      </div>
    )
  }
  if (types === "address") {
    return (
      <div className="grid gap-5 p-5">
        <div className="flex justify-between">
          <p className="text-base text-secondary font-semibold">
            {title}
          </p>
          <button className="text-emerald-500">Edit</button>
        </div>
        <div className="grid gap-2">
          <p className="text-[#475569]">{address}</p>
        </div>
      </div>
    )
  }
  if (types === "note") {
    return (
      <div className="grid gap-5 p-5">
        <div className="flex justify-between">
          <p className="text-base text-secondary font-semibold">
            Note
          </p>
          <button onClick={onClick}>

            <img src={canceled} alt="" />
          </button>
        </div>
        <div className="grid gap-2">
          <p className="text-[#475569]">{message || "No Message"}</p>
        </div>
      </div>
    )
  }
  return <></>;
};
export default SideCard;
