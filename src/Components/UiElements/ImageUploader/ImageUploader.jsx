import React, { useEffect, useState } from 'react';
import cancel from '../../../assets/icons/cd-cancel.svg';
import ImageUpload from '../../../assets/icons/cd-camera.svg';

const ImageUploader = ({
	formikProps,
	className,
	uploadButtonIcon,
	placeholder,
	preLoadedImages,
}) => {
	const [previewImages, setPreviewImages] = useState([]);
	const [allImages, setAllImages] = useState([]);

	const baseURL = import.meta.env.VITE_SERVER_URL;

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
	 * @description - for showing images in display and register images in formink
	 */
	// useEffect(() => {
	// 	const preLoadedPreviewImages = preLoadedImages.map(
	// 		(url) => baseURL + '/' + url,
	// 	);
	// 	const uploadedPreviewImages = allImages.map((file) =>
	// 		URL.createObjectURL(file),
	// 	);
	// 	setPreviewImages([...preLoadedPreviewImages, ...uploadedPreviewImages]);

	// 	formikProps.setFieldValue('images', allImages);

	// 	return () => {
	// 		uploadedPreviewImages.forEach((image) => URL.revokeObjectURL(image));
	// 	};
	// }, [allImages, preLoadedImages]);

	useEffect(() => {
		const newPreviewImages = allImages.map((file) => URL.createObjectURL(file));
		setPreviewImages(newPreviewImages);

		formikProps.setFieldValue('images', allImages);

		return () => {
			newPreviewImages.forEach((image) => URL.revokeObjectURL(image));
		};
	}, [allImages]);

	/**
	 * @description - for handling image deletion
	 */
	const handleImageDelete = (index) => {
		const updatedAllImages = allImages.filter((_, i) => i !== index);
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
			<div className='p-3 rounded-lg '>
				<div className={`flex items-center gap-3 ${className}`}>
					<div className='flex  md:max-w-[400px] scrollbar  overflow-x-auto overflow-y-hidden'>
						{previewImages.map((image, index) => (
							<div
								key={index}
								className={`w-[134px] h-[133px] border rounded-lg flex items-center justify-center relative p-3	`}
							>
								<img
									src={image}
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

export default ImageUploader;
