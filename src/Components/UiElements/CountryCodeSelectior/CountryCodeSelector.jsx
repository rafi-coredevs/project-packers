import { useState } from 'react';
import { COUNTRY_CODE } from './Data';

const CountryCodeSelector = ({ setCountryCode, error }) => {
	const data = COUNTRY_CODE;
	const [selected, setSelected] = useState(data[0].dial_code);
	const handleChange = (e) => {
		setSelected(e.target.value);
		setCountryCode(e.target.value);
	};

	return (
		<div className={`flex gap-2 border-r h-full w-full border-[#E2E8F0]  `}>
			<select
				className='bg-transparent border-none focus:outline-none w-[6rem] h-[2rem] cursor-pointer'
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
