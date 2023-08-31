import React, { useState } from 'react';
import Input from '../UiElements/Input/Input';
import Button from '../UiElements/Button/Button';
import UserIcon from '../../../Components/UiElements/UserIcon/UserIcon';
import { terminal } from '../../../contexts/terminal/Terminal';
import toaster from '../../../Util/toaster';
import CustomSelect from '../../../Components/UiElements/Input/CustomSelect';

const StaffModal = ({ setModal, user }) => {
    const totalaccess = ['support', 'product', 'order', 'request']
    const [access, setAccess] = useState(user?.access)

    const [selectedRole, setSelectedRole] = useState({ name: 'Select', value: '', id: 0 })
    const handleSubmit = () => {
        terminal.request({ name: 'updateUser', params: { id: user.id }, body: { data: { role, access } } }).then(data => {
            if (data.id) {
                setModal(false)
                toaster({ type: 'success', message: 'Staff updated' })
            }
            else {
                toaster({ type: 'error', message: 'An error has occurred' })
            }
        })
    }

    const roleOptions =
        [
            { name: "Admin", value: "admin", id: 1 },
            { name: "Super Admin", value: "super-admin", id: 2 },
            { name: "Staff", value: "staff", id: 3 },
            { name: "User", value: "user", id: 4 },
        ]
    const selectedRoleHandler = (id) => setSelectedRole(roleOptions.find(item => item.id === id));
    return (
        <>
            <div className="shadow-sm pb-5">
                <h3 className="font-semibold ">User Access</h3>
            </div>
            <div className="shadow-sm py-5 flex justify-between items-start">
                <div className=" flex gap-4">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary">
                        <p className=""><UserIcon name={user.fullName} /></p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[#202223] text-sm font-semibold">{user.fullName}</p>
                        <p className="text-[#6D7175] text-sm">{user.access.length === totalaccess.length ? 'Full access' : user.access.length === 1 ? user.access : 'Limited access'}</p>
                    </div>
                </div>

                <CustomSelect value={selectedRole.name} bg="bg-white" options={roleOptions} onChange={selectedRoleHandler} appearance={"select"} />

            </div>
            <div className="p-5 grid gap-4 items-start">
                <div className="space-x-2">
                    <input
                        checked={access.includes('support')}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setAccess(prev => [...prev, 'support'])
                            }
                            else {
                                setAccess(prev => prev.filter(prev => prev !== 'support'))
                            }
                        }}
                        className="accent-yellow-500"
                        type="checkbox"
                    />
                    <label htmlFor="" className="text-[#4F4F4F] font-normal">
                        Support ticket / life chat
                    </label>
                </div>
                <div className="space-x-2">
                    <input
                        checked={access.includes('product')}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setAccess(prev => [...prev, 'product'])
                            }
                            else {
                                setAccess(prev => prev.filter(prev => prev !== 'product'))
                            }
                        }}
                        className="accent-yellow-500"
                        type="checkbox"
                    />
                    <label htmlFor="" className="text-[#4F4F4F] font-normal">
                        Product upload and edit
                    </label>
                </div>
                <div className="space-x-2">
                    <input
                        checked={access.includes('order')}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setAccess(prev => [...prev, 'order'])
                            }
                            else {
                                setAccess(prev => prev.filter(prev => prev !== 'order'))
                            }
                        }}
                        className="accent-yellow-500"
                        type="checkbox"
                    />
                    <label htmlFor="" className="text-[#4F4F4F] font-normal">
                        Order management
                    </label>
                </div>
                <div className="space-x-2">
                    <input
                        checked={access.includes('request')}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setAccess(prev => [...prev, 'request'])
                            }
                            else {
                                setAccess(prev => prev.filter(prev => prev !== 'request'))
                            }
                        }}
                        className="accent-yellow-500"
                        type="checkbox"
                    />
                    <label htmlFor="" className="text-[#4F4F4F] font-normal">
                        Request management
                    </label>
                </div>
                <div className="text-end">
                    <Button type='submit'
                        onClick={() => { handleSubmit() }}
                        style="green">Save & Exit</Button>
                </div>
            </div>
        </>
    );
};

export default StaffModal;