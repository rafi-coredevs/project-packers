/**
 *
 */

import { useState } from "react";
import StaffCard from "../Components/StaffCard/StaffCard";
import Button from "../Components/UiElements/Button/Button";
import Heading from "../Components/UiElements/Heading/Heading";
import Input from "../Components/UiElements/Input/Input";
import Modal from "../../Components/UiElements/Modal/Modal";
import { useTitle } from "../../Components/Hooks/useTitle";

const Staff = () => {
  useTitle("Staff");
  const [modal, setModal] = useState(false);
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
            <div className="p-5 flex gap-4">
              <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary">
                <p className="">RF</p>
              </div>
              <div className="space-y-2">
                <p className="text-[#202223] text-sm font-semibold">
                  Robert Fox
                </p>
                <p className="text-[#6D7175] text-sm">Super Admin</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-[#0000001c] ">
            <div className="flex justify-between p-5 shadow-sm">
              <h3 className="font-semibold text-base  ">Staff Accounts</h3>
              <button className="text-sm text-[#3E949A] font-normal">
                Log out all staff account
              </button>
            </div>
            <div className="grid divide-y max-h-[45vh] px-5 overflow-y-auto">
              <StaffCard onClick={() => setModal(true)} />
              <StaffCard onClick={() => setModal(true)} />
              <StaffCard onClick={() => setModal(true)} />
              <StaffCard onClick={() => setModal(true)} />
              <StaffCard onClick={() => setModal(true)} />
              <StaffCard onClick={() => setModal(true)} />
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
        <div className="shadow-sm pb-5">
          <h3 className="font-semibold ">User Access</h3>
        </div>
        <div className="shadow-sm">
          <StaffCard />
        </div>
        <div className="p-5 grid gap-4 items-start">
          <div className="space-x-2">
            <input
              className="accent-yellow-500"
              type="checkbox"
              name=""
              id=""
            />
            <label htmlFor="" className="text-[#4F4F4F] font-normal">
              Support ticket / life chat
            </label>
          </div>
          <div className="space-x-2">
            <input
              className="accent-yellow-500"
              type="checkbox"
              name=""
              id=""
            />
            <label htmlFor="" className="text-[#4F4F4F] font-normal">
              Product upload and edit
            </label>
          </div>
          <div className="space-x-2">
            <input
              className="accent-yellow-500"
              type="checkbox"
              name=""
              id=""
            />
            <label htmlFor="" className="text-[#4F4F4F] font-normal">
              Order management
            </label>
          </div>
          <div className="space-x-2">
            <input
              className="accent-yellow-500"
              type="checkbox"
              name=""
              id=""
            />
            <label htmlFor="" className="text-[#4F4F4F] font-normal">
              Request management
            </label>
          </div>
          <div className="text-end">
            <Button style="green">Save & Exit</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Staff;
