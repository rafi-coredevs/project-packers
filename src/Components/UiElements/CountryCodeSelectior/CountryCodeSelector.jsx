import { useState } from 'react';
import { COUNTRY_CODE } from './Data';

const CountryCodeSelector = ({ setCountryCode, error, className }) => {
	const data = COUNTRY_CODE;
	const [selected, setSelected] = useState(data[18].dial_code);
	const handleChange = (e) => {
		setSelected(e.target.value);
		setCountryCode(e.target.value);
	};

	return (
		<div className={`flex gap-2 border-r h-full w-fit py-[4.5px] border-[#E2E8F0] ${className}`}>
			<select
				className='bg-transparent border-none focus:outline-none w-fit cursor-pointer'
				onChange={handleChange}
				name='code'
				id='code'
				value={selected}
			>
				{data.map((item, index) => {
					return (
						<option key={index} value={item.dial_code} className='cursor-pointer' >
							{item.flag}&nbsp;&nbsp;
							{item.dial_code}&nbsp;&nbsp;
							{/* {item.name.slice(0, 3)} */}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default CountryCodeSelector;
