import React from 'react';
import Input from '../UiElements/Input/Input';
import Button from '../UiElements/Button/Button';

const StaffModal = ({ setModal }) => {
    return (
        <>
            <div className="shadow-sm pb-5">
                <h3 className="font-semibold ">User Access</h3>
            </div>
            <div className="shadow-sm py-5 flex justify-between items-center">
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
                    <Button onClick={() => { setModal(false) }} style="green">Save & Exit</Button>
                </div>
            </div>
        </>
    );
};

export default StaffModal;