
import { useEffect, useState } from "react";
import StaffCard from "../Components/StaffCard/StaffCard";
import Button from "../Components/UiElements/Button/Button";
import Heading from "../Components/UiElements/Heading/Heading";
import Input from "../Components/UiElements/Input/Input";
import Modal from "../../Components/UiElements/Modal/Modal";
import { useTitle } from "../../Components/Hooks/useTitle";
import { terminal } from "../../contexts/terminal/Terminal";
import StaffModal from "../Components/StaffCard/StaffModal";
import UserIcon from "../../Components/UiElements/UserIcon/UserIcon";
import toaster from "../../Util/toaster";

const Staff = () => {
  useTitle("Staff");
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([])
  const [user, setUser] = useState();
  useEffect(() => {
    terminal.request({ name: 'allUser', queries: { role: JSON.stringify(['admin', 'staff', 'super-admin']) } }).then(data => data?.docs?.length && setUsers(data.docs))
  }, [])

  const handleLogout = () => {
    terminal.request({ name: 'logOutStaff' }).then(data => data.status && toaster({ type: 'success', message: data.message }))
  }

  const submitHandler = () => {
    console.log("update clicked");
  };
  return (
    <div className="px-5 h-full">
      <Heading title={`Staff`}>
        <Button style="primary">Update</Button>
      </Heading>
      <div className="grid grid-cols-2 gap-5 py-5">
        <div className="col-span-2  sm:col-span-1 space-y-3">
          <h2 className="text-secondary text-base font-semibold">
            Account and Permissions
          </h2>
          <p className="text-[#64748B] text-sm max-w-[400px]">
            We can help with that Replace your next meeting with a short video
            and get feedback faster .
          </p>
        </div>
        <div className="col-span-2 sm:col-span-1 mt-auto justify-end">
          <h2 className="text-secondary font-semibold">New Staff</h2>
        </div>
        <div className="col-span-2 sm:col-span-1 space-y-5">
          <div className="rounded-lg border border-[#0000001c] ">
            <h3 className="font-semibold text-base p-5 shadow-sm">
              Account Owner
            </h3>
            {
              users.length > 0 && users?.filter(user => user.role === 'super-admin')?.map(user => <div className="p-5 flex gap-4">
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary">
                  <p className=""><UserIcon name={user.fullName} /></p>
                </div>
                <div className="space-y-2">
                  <p className="text-[#202223] text-sm font-semibold">
                    {user.fullName}
                  </p>
                  <p className="text-[#6D7175] text-sm">{user.role}</p>
                </div>
              </div>)
            }
          </div>
          <div className="rounded-lg border border-[#0000001c] ">
            <div className="flex justify-between p-5 shadow-sm">
              <h3 className="font-semibold text-base  ">Staff Accounts</h3>
              <button onClick={handleLogout} className="text-sm text-[#3E949A] font-normal">
                Log out all staff account
              </button>
            </div>
            <div className="grid divide-y max-h-[45vh] px-5 overflow-y-auto">
              {
                users.length > 0 && users?.filter(user => user.role !== 'super-admin')?.map(user =>
                  <StaffCard user={user} setUser={setUser} onClick={() => setModal(true)} />)
              }
            </div>
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <form
            onSubmit={submitHandler}
            className="col-span-2 sm:col-span-1 grid gap-5"
          >
            <div className="rounded-lg border border-[#0000001c] p-3 grid-cols-1 grid gap-3 ">
              <div className=" grid grid-cols-1 sm:grid-cols-2 gap-3 ">
                <Input
                  styles="basic"
                  label="First Name"
                  placeholder="First Name"
                />
                <Input
                  styles="basic"
                  label="Last Name"
                  placeholder="Last Name"
                />
              </div>
              <Input
                styles="basic"
                label="Email"
                placeholder="example@domain.com"
              />
              <Input
                styles="basic"
                label="Phone Number"
                placeholder="01700000000"
              />
              <Input
                styles="select"
                label="Role"
                option={[
                  { name: "Admin", value: "admin" },
                  { name: "Super Admin", value: "super-admin" },
                  { name: "Staff", value: "staff" },
                  { name: "User", value: "user" },
                ]}
              />
            </div>

            <div className="flex justify-end">
              <Button style="green">Add user</Button>
            </div>
          </form>
        </div>
      </div>
      <Modal show={modal} onClose={() => setModal(false)}>
        <StaffModal user={user} setModal={setModal} />
      </Modal>
    </div>
  );
};

export default Staff;
