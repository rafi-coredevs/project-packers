/**
 *
 * @param {boolean} arrow - receives true or false for showing arrow
 * @param {object} children - receives children component inside button for showing button name
 * @param {boolean} full - receives true or false for showing with full width or not
 * @param {string} buttonType - receives button type means for what reason this button will be used for like form submit
 * @param {string} className - receives extra styles for button
 * @param {boolean} disabled - receives true or false for showing button with disabled
 * @param {function} onClick - receive function for any action that will be done by this button.
 * @param {function} eventHandlers - receive one or more eventHandlers for any action that will be done by this button.
 * @returns
 */

const Button = ({
	arrow,
	children,
	full,
	type,
	buttonType,
	disabled,
	className,
	onClick,
	...eventHandlers
}) => {
	// console.log(disabled)
	const styles = {
		text: `${className}`,
		primary: `bg-primary text-secondary py-[12px] px-[20px] ${className}`,
		secondary: `bg-secondary text-white py-[11px] px-[20px] ${className}`,
		outline: `bg-transparent text-secondary py-[11px] px-[20px] border border-primary ${className}`,
		light: `bg-[#F8FAFC] font-normal text-secondary py-[11px] px-[20px] ${className}`,
		lightGreen: `bg-[#CFF6EF] font-normal text-secondary py-[11px] px-[30px] ${className}`,
		default: `bg-[#ffffff] text-secondary border-2 border-primary ${className}`,
	};
	return (
		<button
			{...eventHandlers}
			onClick={onClick}
			type={buttonType}
			disabled={disabled}
			className={`disabled:cursor-not-allowed
             rounded-[50px] font-sans w-full ${
								full != undefined ? 'w-full' : 'sm:max-w-fit'
							} text-center  text-sm font-bold 
             hover:drop-shadow-lg active:scale-[0.99]
             ${
								type
									? styles[type]
									: 'bg-[#ffffff] text-secondary border-2 border-primary'
							}
        `}
		>
			<span className='justify-center flex gap-3 '>
				{children}
				{arrow && (
					<svg
						width='20'
						height='20'
						viewBox='0 0 20 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M15.8335 10H3.3335'
							stroke='#124E58'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
						<path
							d='M12.5 5.83301L16.0774 9.41042C16.3552 9.68817 16.4941 9.82709 16.4941 9.99967C16.4941 10.1723 16.3552 10.3112 16.0774 10.5889L12.5 14.1663'
							stroke='#124E58'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				)}
			</span>
		</button>
	);
};

export default Button;
