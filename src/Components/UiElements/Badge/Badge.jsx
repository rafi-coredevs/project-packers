/**
 * Badge component displays a badge with customizable text and background color.
 *
 * @param {string} text - The text to display on the badge (default: 'completed').
 * @returns {JSX.Element} The rendered badge component.
 */
const Badge = ({ text = 'completed' }) => {
	const data = {
		completed: {
			text: 'Completed',
			bg: 'bg-green-300',
			dot: 'bg-green-700',
		},
		accepted: {
			text: 'Accepted',
			bg: 'bg-green-300',
			dot: 'bg-green-700',
		},
		pending: {
			text: 'Pending',
			bg: 'bg-[#F7DA7C]',
			dot: 'bg-[#8C651A]',
		},

		processing: {
			text: 'Processing',
			bg: 'bg-[#F7DA7C]',
			dot: 'bg-[#8C651A]',
		},
		shipping: {
			text: 'Shipping',
			bg: 'bg-[#F7DA7C]',
			dot: 'bg-[#f3c633]',
		},

		cancelled: {
			text: 'Cancelled',
			bg: 'bg-red-200 ',
			dot: 'bg-red-700 ',
		},
		paid: {
			text: 'Paid',
			bg: 'bg-slate-200',
			dot: 'bg-slate-700',
		},
		refunded: {
			text: 'Refunded',
			bg: 'bg-[#E4E5E7]',
			dot: 'bg-[#808181]',
		},
		refundProcessing: {
			text: 'Processing',
			bg: 'bg-red-200 ',
			dot: 'bg-red-700 ',
		},
		refundCancelled: {
			text: 'Cancelled',
			bg: 'bg-[#FECACA]',
			dot: 'bg-[#e95555]',
		},
		abandoned: {
			text: 'Abandoned',
			bg: 'bg-slate-200',
			dot: 'bg-slate-700',
		},
		estimate: {
			text: 'Estimate Sent',
			bg: 'bg-[#A2EEE7]',
			dot: 'bg-[#092F3F]',
		},
		closed: {
			text: 'Closed',
			bg: 'bg-red-200 ',
			dot: 'bg-red-700 ',
		},
	};
	return (
		<div
			className={`flex items-center gap-2 ${data[text]?.bg} rounded-full p-[0.125rem_0.5rem] w-fit`}
		>
			<span className={`w-2 h-2 rounded-full ${data[text]?.dot}`}></span>
			<p className='text-black'>{data[text]?.text || 'No Text'}</p>
		</div>
	);
};

export default Badge;
