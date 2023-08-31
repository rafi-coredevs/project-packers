
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
import CustomSelect from "../../Components/UiElements/Input/CustomSelect";

const Staff = () => {
  useTitle("Staff");
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([])
  const [user, setUser] = useState();
  const [selectedRole, setSelectedRole] = useState({ name: 'Select', value: '', id: 0 })
  useEffect(() => {
    terminal.request({ name: 'allUser', queries: { role: JSON.stringify(['admin', 'staff', 'super-admin']) } }).then(data => data?.docs?.length && setUsers(data.docs))
  }, [])

  const handleLogout = () => {
    terminal.request({ name: 'logOutStaff' }).then(data => data.status && toaster({ type: 'success', message: data.message }))
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const [firstName, lastName, email, phone] = ['firstName', 'lastName', 'email', 'phone'].map((k) =>
      e.target.elements[k].value
    );
    terminal.request({ name: 'registerStaff', body: { fullName: `${firstName} ${lastName}`, email, phone, role: selectedRole.value } }).then(data => {
      if (data.id) {
        setUsers(prev => [...prev, { id: data.id, fullName: data.fullName, role: data.role, access: data.access }])
        ['firstName', 'lastName', 'email', 'phone'].map((k) =>
          e.target.elements[k].value = ''
        );
        toaster({ type: 'success', message: 'Staff created successfully' })
      }
      else {
        toaster({ type: 'error', message: 'Error creating staff' })
      }
    })
  };

  const roleOptions =
    [
      { name: "Admin", value: "admin", id: 1 },
      { name: "Super Admin", value: "super-admin", id: 2 },
      { name: "Staff", value: "staff", id: 3 },
      { name: "User", value: "user", id: 4 },
    ]
  const categoryHandler = (id) => setSelectedRole(roleOptions.find(item => item.id === id));

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
              users.length > 0 && users?.filter(user => user.role === 'super-admin')?.map((user, i) => <div key={i} className="p-5 flex gap-4">
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary">
                  <p className=""><UserIcon name={user?.fullName} /></p>
                </div>
                <div className="space-y-2">
                  <p className="text-[#202223] text-sm font-semibold">
                    {user?.fullName}
                  </p>
                  <p className="text-[#6D7175] text-sm">{user?.role}</p>
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
                users.length > 0 && users?.filter(user => user.role !== 'super-admin')?.map((user, i) =>
                  <StaffCard key={i} user={user} setUser={setUser} onClick={() => setModal(true)} />)
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
                  name='firstName'
                />
                <Input
                  styles="basic"
                  label="Last Name"
                  placeholder="Last Name"
                  name='lastName'
                />
              </div>
              <Input
                styles="basic"
                label="Email"
                placeholder="example@domain.com"
                name='email'
              />
              <Input
                styles="basic"
                label="Phone Number"
                placeholder="01700000000"
                name='phone'
              />
              <CustomSelect value={selectedRole.name} options={roleOptions} bg="bg-white" onChange={categoryHandler} appearance={'select'} />
            </div>
            <div className="flex justify-end">
              <Button type="submit" style="green">Add user</Button>
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
