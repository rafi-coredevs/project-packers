/**
 * Input Component
 *
 * @param {string} label - Label for the input.
 * @param {string} name - Name attribute for the input.
 * @param {string} type - Type of the input (e.g., text, number).
 * @param {string} placeholder - Placeholder text for the input.
 * @param {string} value - Value of the input.
 * @param {function} change - Function to handle input value changes.
 * @param {function} blur - Function to handle input blur event.
 * @param {string} error - Error message to display.
 * @param {object} children - Child components.
 * @param {boolean} border - Whether to display a border around the input.
 * @param {number} min - Minimum value for numeric input.
 * @param {number} max - Maximum value for numeric input.
 * @param {string} styles - Input styles (e.g., "primary").
 * @param {boolean} required - Whether the input is required.
 * @param {boolean} disabled - Whether the input is disabled.
 * @param {function} onKeyUp - Function to handle key-up events.
 * @param {number} tabIndex - Tab index for the input.
 * @param {string} className - Additional CSS classes for styling the input.
 * @param {boolean} otp - checking is this component used for otp or not
 */
const Input = ({
	label,
	name,
	type,
	placeholder,
	value,
	change,
	blur,
	error,
	children,
	border,
	min,
	max,
	styles,
	required,
	disabled,
	onKeyUp,
	tabIndex,
	className,
	otp,
}) => {
	return (
		<div className='relative '>
			{label && (
				<label
					className={`${
						styles === 'primary'
							? 'text-black text-base font-normal'
							: 'text-white font-semibold text-lg'
					} block font-sans  pb-2 ${
						required
							? `after:content-['*'] after:ml-0.5 after:text-red-500`
							: ''
					} `}
				>
					{label}
				</label>
			)}
			<div
				className={` flex items-center w-full bg-[#ffffff] rounded-full ${
					border ? 'border border-[#00000036]' : ''
				}`}
			>
				{children && (
					<div
						className={`pl-[10px] sm:pl-5  rounded-s-full border py-1 ${
							error ? ' border-red-600 border-r-0' : 'border-white'
						}`}
					>
						{children}
					</div>
				)}
				{/* checking for otp */}
				{otp ? (
					<input
						className={`px-5 py-2 focus:  ${
							children ? 'rounded-e-full' : 'rounded-full'
						} w-full outline-none placeholder-secondary text-secondary border ${
							error ? ' border-red-600' : 'border-white'
						}
          ${className}
          `}
						value={value}
						name={name}
						placeholder={placeholder}
						type='number'
						onInput={(e) => {
							// taking only 1st value
							if (e.target.value.length > 1) {
								e.target.value = e.target.value.slice(0, 1);
							}
						}}
						onChange={change}
						onBlur={blur}
						required={required}
						disabled={disabled}
						onKeyUp={onKeyUp}
						tabIndex={tabIndex && tabIndex}
					/>
				) : (
					<input
						className={`px-5 py-2 focus:  ${
							children ? 'rounded-e-full border-l-0' : 'rounded-full'
						} w-full outline-none placeholder-secondary text-secondary border ${
							error ? ' border-red-600' : 'border-white'
						}
          ${className}
          `}
						value={value}
						name={name}
						placeholder={placeholder}
						type={type}
						min={0}
						minLength={min}
						maxLength={max}
						onChange={change}
						onBlur={blur}
						required={required}
						disabled={disabled}
						onKeyUp={onKeyUp}
						tabIndex={tabIndex && tabIndex}
					/>
				)}
			</div>

			{error && (
				<div className=' absolute right-0 mt-1 gap-2 bg-red-600  py-1 px-2 rounded-full w-fit hidden sm:flex'>
					<svg
						width='20'
						height='20'
						viewBox='0 0 20 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18ZM9 8.9996C9 9.55188 9.44772 9.9996 10 9.9996C10.5523 9.9996 11 9.55188 11 8.9996V6.9996C11 6.44732 10.5523 5.9996 10 5.9996C9.44772 5.9996 9 6.44732 9 6.9996V8.9996ZM9 12.9996C9 13.5519 9.44772 13.9996 10 13.9996C10.5523 13.9996 11 13.5519 11 12.9996C11 12.4473 10.5523 11.9996 10 11.9996C9.44772 11.9996 9 12.4473 9 12.9996Z'
							fill='white'
						/>
					</svg>

					<span className=' text-white font-sans text-xs font-semibold'>
						{error}
					</span>
				</div>
			)}
		</div>
	);
};

export default Input;
