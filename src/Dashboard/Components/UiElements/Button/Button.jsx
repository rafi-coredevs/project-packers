/**
 *
 * @returns JSX of 'Button' shared component
 * @param {String} args.style - key to use style classes from a predefined 'styles' object
 * @param {function} args.onClick event handling function
 * @param {string} args.type - set to 'button' by default
 *
 *
 */
import trash from '../../../../assets/icons/cd-delete.svg';
const Button = ({ style, disabled, children, onClick, type = 'button' }) => {
	const styles = {
		primary: 'bg-primary text-secondary',
		secondary: 'bg-white hover:bg-primary',
		green: 'bg-[#3E949A] text-white',
		outline: 'text-[#475569] border border-[#0000001c] hover:bg-primary',
		delete: 'text-[#475569] hover:bg-primary',
	};

	if (style === undefined) {
		return (
			<button
				onClick={onClick}
				disabled={disabled}
				type={type}
				className={`${styles['delete']} h-full w-fit px-4 py-2 rounded text-sm font-medium disabled:cursor-not-allowed`}
			>
				<div className='flex gap-1 items-center justify-center'>{children}</div>
			</button>
		);
	}
	if (style === 'delete') {
		return (
			<button
				onClick={onClick}
				disabled={disabled}
				type={type}
				className={`${styles[style]} h-full w-fit px-4 py-2 rounded text-sm font-medium disabled:cursor-not-allowed`}
			>
				<div className='flex gap-1 items-center justify-center'>
					<img className='h-5 w-5' src={trash} alt='' />
					{children}
				</div>
			</button>
		);
	}
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			type={type}
			className={`${styles[style]} h-full w-fit px-4 py-2 rounded text-sm font-medium disabled:cursor-not-allowed`}
		>
			{children}
		</button>
	);
};

export default Button;
