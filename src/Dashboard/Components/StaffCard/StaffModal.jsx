import React, { useState } from 'react';
import Input from '../UiElements/Input/Input';
import Button from '../UiElements/Button/Button';
import UserIcon from '../../../Components/UiElements/UserIcon/UserIcon';

const StaffModal = ({ setModal, user }) => {
    const totalaccess = ['support', 'product', 'order', 'request']
    const [access, setAccess] = useState(user?.access)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target);
    }
    return (
        <>
            <div className="shadow-sm pb-5">
                <h3 className="font-semibold ">User Access</h3>
            </div>
            <div className="shadow-sm py-5 flex justify-between items-center">
                <div className=" flex gap-4">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary">
                        <p className=""><UserIcon name={user.fullName} /></p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[#202223] text-sm font-semibold">{user.fullName}</p>
                        <p className="text-[#6D7175] text-sm">{user.access.length === totalaccess.length ? 'Full access' : user.access.length === 1 ? user.access : 'Limited access'}</p>
                    </div>
                </div>
                <Input
                    styles="select"
                    change={(e) => console.log(e.target.value)}
                    option={[
                        { name: "Admin", value: "admin" },
                        { name: "Super Admin", value: "super-admin" },
                        { name: "Staff", value: "staff" },
                        { name: "User", value: "user" },
                    ]}
                />
            </div>
            <form onSubmit={handleSubmit} className="p-5 grid gap-4 items-start">
                <div className="space-x-2">
                    <input
                        defaultChecked={access.includes('support')}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setAccess(prev => [...prev, 'support'])
                            }
                            else {
                                setAccess(prev => prev.map(prev => prev !== 'support'))
                            }
                        }}
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
                        defaultChecked={access.includes('product')}
                        className="accent-yellow-500"
                        type="checkbox"
                        name="product"
                        id=""
                    />
                    <label htmlFor="" className="text-[#4F4F4F] font-normal">
                        Product upload and edit
                    </label>
                </div>
                <div className="space-x-2">
                    <input
                        defaultChecked={access.includes('order')}
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
                        defaultChecked={access.includes('request')}
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
                    <Button type='submit'
                        // onClick={() => { setModal(false) }}
                        style="green">Save & Exit</Button>
                </div>
            </form>
        </>
    );
};

export default StaffModal;