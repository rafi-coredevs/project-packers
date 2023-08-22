
import Input from "../UiElements/Input/Input";

const StaffCard = ({onClick}) => {
 
  return (

      <div
        onClick={onClick}
        className="py-5 flex justify-between items-center cursor-pointer"
      >
        <div className=" flex gap-4">
          <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary">
            <p className="">RF</p>
          </div>
          <div className="space-y-2">
            <p className="text-[#202223] text-sm font-semibold">Robert Fox</p>
            <p className="text-[#6D7175] text-sm">Super Admin</p>
          </div>
        </div>
        <Input
          styles="select"
          option={[
            { name: "Admin", value: "admin" },
            { name: "Super Admin", value: "super-admin" },
            { name: "Staff", value: "staff" },
            { name: "User", value: "user" },
          ]}
        />
      </div>

  );
};

export default StaffCard;
