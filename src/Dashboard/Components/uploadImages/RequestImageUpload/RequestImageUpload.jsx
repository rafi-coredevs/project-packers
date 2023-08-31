import React, { useEffect, useState } from 'react';
import cancel from '../../../../assets/icons/cd-cancel.svg';
import ImageUpload from '../../../../assets/icons/cd-camera.svg';

const RequestImageUpload = ({
	formikProps,
	className,
	uploadButtonIcon,
	placeholder,
	preLoadedImages,
}) => {
	const [allImages, setAllImages] = useState([]);
	const [removeImages, setRemoveImages] = useState([]);

	/**
	 *
	 * @description - for storing all images that have been uploaded
	 */
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (event.target.files.length > 0) {
			setAllImages((prev) => [...prev, file]);
		}
	};

	/**
	 * @description - for showing preLoaded images if theres any
	 */
	useEffect(() => {
		if (preLoadedImages?.length > 0 || !preLoadedImages) {
			setAllImages(preLoadedImages);
		}
	}, [preLoadedImages]);

	/**
	 * @description - for register uploaded images, replaced images and deleted images
	 */
	useEffect(() => {
		const imageFile = allImages.filter((image) => image instanceof File);
		formikProps.setFieldValue('images', imageFile);

		const imageURL = removeImages.filter((image) => !(image instanceof File));
		formikProps.setFieldValue('removeImages', imageURL);

		return () => {
			allImages.forEach(
				(image) => image instanceof File && URL.revokeObjectURL(image),
			);
		};
	}, [allImages, removeImages]);

	/**
	 * @description - for handling image deletion
	 */
	const handleImageDelete = (index) => {
		const removedImages = allImages.find((image, i) => i === index);

		if (removedImages instanceof File === false) {
			setRemoveImages((prev) => [...prev, removedImages]);
		}

		const updatedAllImages = allImages.filter(
			(images, i) => images !== removedImages,
		);

		setAllImages(updatedAllImages);
	};

	/**
	 *
	 * @description - for handling image drag and drop events
	 */
	const handleDrop = (event) => {
		event.preventDefault();
		const file = event.dataTransfer.files[0];
		setAllImages((prev) => [...prev, file]);
	};

	return (
		<>
			<div className=''>
				<div className={`flex items-center gap-3 ${className}`}>
					<div className='flex gap-1 md:max-w-[830px] scrollbar  overflow-x-auto overflow-y-hidden'>
						{allImages.map((image, index) => (
							<div
								key={index}
								className={`w-[134px] h-[133px] border rounded-lg flex items-center justify-center relative p-3	`}
							>
								<img
									src={
										image instanceof File
											? URL.createObjectURL(image)
											: `${import.meta.env.VITE_SERVER_URL}/${image}`
									}
									alt=''
									className='max-w-[123px] min-w-[123px] h-[123px]'
								/>
								<button
									className='p-1 bg-[#CFF6EF] rounded-full absolute right-2 top-2'
									onClick={(e) => {
										e.preventDefault();
										handleImageDelete(index);
									}}
								>
									<img src={cancel} alt='' className='w-4' />
								</button>
							</div>
						))}
					</div>
					<div>
						<label
							htmlFor='file'
							onDrop={handleDrop}
							onDragOver={(e) => e.preventDefault()}
							className={`cursor-pointer w-[134px] h-[133px] border rounded-lg flex flex-col items-center justify-center`}
						>
							<img
								src={uploadButtonIcon ? uploadButtonIcon : ImageUpload}
								alt=''
							/>
							<span className='text-center px-2'>
								{placeholder ? placeholder : 'Upload Image'}
							</span>
						</label>
						<input
							type='file'
							id='file'
							onChange={handleFileChange}
							className='hidden'
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default RequestImageUpload;
