import React, { useRef, useState } from 'react';
import star from '../../../assets/icons/star.svg';

const PasswordSymbol = React.forwardRef(({ py, placeholder, width, value, onChange }, ref) => {
    const [pass, setPass] = useState([]);

    return (
        <div className='relative'>
            <input
                value={value}
                ref={ref}
                type="password"
                // required={true}
                className={`border-0 rounded-full text-[14px] duration-200 focus:outline-none focus:shadow-xl bg-transparent absolute top-0 z-10 w-${width} opacity-0 py-${py} pl-6`}
                onChange={(event) => {
                    const passValue = event.target.value;
                    const passArray = passValue.split('');
                    onChange(passValue)
                    setPass(passArray);
                }}
            />
            <span className={`w-${width} flex items-center px-6 gap-1 bg-white rounded-full absolute top-0 text-xl overflow-auto no-scrollbar py-${py}`}>
                {
                    pass.map((word, i) => <img
                        key={i}
                        src={star}
                        className='w-4'
                    />)
                }
                <span className='text-sm text-gray-400'>
                    {
                        pass.length === 0 ? placeholder : <span className='opacity-0'>password</span>
                    }
                </span>
            </span>
        </div>
    );
});

export default PasswordSymbol;
