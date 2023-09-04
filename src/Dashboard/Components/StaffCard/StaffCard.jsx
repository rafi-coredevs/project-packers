/**
 * @params {function} args.onClick - handles click on the card, passed as callback.
 */

import UserIcon from "../../../Components/UiElements/UserIcon/UserIcon";

const StaffCard = ({ onClick, user, setUser }) => {
  const totalaccess = ["support", "product", "order", "request"];
  return (
    <div
      onClick={() => {
        onClick();
        setUser(user);
      }}
      className="py-5 flex justify-between items-center cursor-pointer"
    >
      <div className=" flex gap-4">
        <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary">
          <p className="">
            <UserIcon name={user.fullName} />
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-[#202223] text-sm font-semibold">
            {user.fullName}
          </p>
          <p className="text-[#6D7175] text-sm">
            {user.access.length === totalaccess.length
              ? "Full access"
              : user.access.length === 1
              ? user.access
              : user.access.length < 1
              ? "No access"
              : "Limited access"}
          </p>
        </div>
      </div>
      <div className="border-[1px] border-[#64748B] p-3 rounded flex justify-center items-center min-w-[5rem]">
        <p>{user.role}</p>++++
      </div>
    </div>
  );
};

export default StaffCard;
