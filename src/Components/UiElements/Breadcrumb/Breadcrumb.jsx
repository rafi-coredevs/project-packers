import { Link } from 'react-router-dom';
import useBreadcrumb from '../../Hooks/BreadcrumbHook';

/**
 * Breadcrumb component displays a navigation path with links.
 *
 * @param {string} title - The title to be displayed at the end of the breadcrumb trail.
 * @returns {JSX.Element} The rendered Breadcrumb component.
 */
const Breadcrumb = ({ title }) => {
	const breadcrumb = useBreadcrumb();
	return (
		<div className='bg-secondary w-full py-[14px] font-sans text-sm'>
			<div className='container px-2 sm:px-0 mx-auto'>
				<Link className='text-[#ffffff66] ' to='/'>
					Home
				</Link>
				{breadcrumb.map((item, index) => {
					return (
						<div className='inline line-clamp-1' key={index}>
							{index !== breadcrumb.length && (
								<span className='px-2 text-[#ffffff66]'>/</span>
							)}
							<Link
								key={index}
								className={`${
									index === breadcrumb.length - 1
										? 'text-white'
										: 'text-[#ffffff66]'
								} capitalize`}
								to={item.url}
							>
								<span>
									{title && index === breadcrumb.length - 1
										? title
										: item.label}
								</span>
							</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Breadcrumb;
