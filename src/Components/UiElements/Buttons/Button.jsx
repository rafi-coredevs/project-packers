/*
Props:=>
text: the text value shown in the button
primary: is the button primary,
secondary: is the button secondary,
onClick: function will trigger when clicked to the button,
onBlur: function will trigger when button will blur
arrow: arrow left will appear
[if primary or secondary is not passed there will be apply a default style ]
               
*/
const Button = ({
	arrow,
	children,
	full,
	type,
	
	buttonType,
	disabled,
  className,
  ...eventHandlers
}) => {
	const styles = {
		text: `${className}`,
		primary: `bg-primary text-secondary py-[12px] px-[20px] ${className}`,
		secondary: `bg-secondary text-white py-[11px] px-[20px] ${className}`,
		outline:
			`bg-transparent text-secondary py-[11px] px-[20px] border border-primary ${className}`,
		light: `bg-[#F8FAFC] font-normal text-secondary py-[11px] px-[20px] ${className}`,
		lightGreen: `bg-[#CFF6EF] font-normal text-secondary py-[11px] px-[30px] ${className}`,
		default: `bg-[#ffffff] text-secondary border-2 border-primary ${className}`,
	};
	return (
		<button
		{...eventHandlers}
			type={buttonType}
			disabled={disabled}
			className={`${
				type
					? styles[type]
					: 'bg-[#ffffff] text-secondary border-2 border-primary'
			}
             rounded-[50px] font-sans w-full ${
								full != undefined ? 'w-full' : 'sm:max-w-fit'
							} text-center  text-sm font-bold 
             hover:drop-shadow-lg active:scale-[0.99]
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
