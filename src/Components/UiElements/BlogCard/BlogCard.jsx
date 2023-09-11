import { useNavigate } from 'react-router-dom';
import errorImg from '../../../assets/noImages.svg';
/**
 * BlogCard component displays a card for a blog post with title, description, and a "Learn More" button.
 *
 * @param {string} id - The unique identifier for the blog post.
 * @param {string} image - The URL of the blog post's image.
 * @param {string} title - The title of the blog post.
 * @param {string} description - The description of the blog post.
 * @returns {JSX.Element} The rendered BlogCard component.
 */
const BlogCard = ({ id, image, title, description }) => {
	const navigate = useNavigate();
	const handleLoading = (event) => {
	};
	const handleError = (event) => {
		event.currentTarget.src = errorImg;
		event.currentTarget.className =
			'flex items-center justify-center  my-auto  mx-auto';
	};
	return (
		<div
			id={id}
			className='bg-white  rounded-md shadow-sm shadow-[#00000026] group hover:shadow-lg overflow-hidden'
		>
			<div className='overflow-hidden'>
				<img
					className='rounded-t-md w-full h-60 duration-500 group-hover:scale-105'
					onLoad={handleLoading}
							onError={handleError}
					src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
					alt=''
				/>
			</div>
			<div className='p-5 flex flex-col justify-between'>
				<h4 className='font-semibold text-base line-clamp-2'>{title}</h4>
				<p className='text-[#475569] text-justify line-clamp-3'>
					{description}
				</p>

				<button
					className='text-secondary text-sm font-medium w-fit rounded p-2 mt-2 border'
					onClick={(e) => navigate(`/blog/${id}`)}
				>
					Learn More
				</button>
			</div>
		</div>
	);
};

export default BlogCard;
