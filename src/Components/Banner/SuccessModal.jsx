import Button from '../UiElements/Buttons/Button';
import Input from '../UiElements/Input/Input';
import globe from '../../assets/icons/cd-internet.svg';
import icon from '../../assets/icons/product-ok.svg';
import { Link } from 'react-router-dom';

/**
 * Modal View Component for request item modal
 * @param {Function} confirmSubmit - form submission handler
 * @param {Function} setUrl - for storing url in state
 *
 * @returns JSX Modal Element
 */

const SuccessModal = ({ confirmSubmit, setUrl }) => {

  /**
	 * Handles the modal type after submission
	 */
	const submitHandler = () => {
		confirmSubmit('request');
	};
	return (
		<div className='flex flex-col gap-5'>
			<div className='p-8 flex w-full items-center flex-col gap-10'>
				<img className='w-fit h-auto' src={icon} alt='' />
				<div className='text-center'>
					<h5 className='text-xl font-semibold text-secondary mb-2'>
						Item request successful!
					</h5>
					<p className='text-sm font-normal max-w-[360px] text-[#00000386]'>
						We will review it and get back to you within next 24 hours in your
						email and project notification. Also, you can see update in your{' '}
						<Link>
							<span className='text-secondary'>cart.</span>
						</Link>{' '}
					</p>
				</div>
			</div>
			<form className='w-full grid gap-5' onSubmit={submitHandler}>
				<Input
					styles='primary'
					label='Request or search another item'
					placeholder='Product URL'
					change={(e) => setUrl(e.target.value)}
					border
				>
					<img src={globe} alt='' />
				</Input>

			<Button  type='primary' buttonType='submit' full>
				Search
			</Button>
			</form>
		</div>
	);
};

export default SuccessModal;
