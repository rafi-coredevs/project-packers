import React, { useEffect, useState } from 'react';
// import uuid from 'uuid';
import cancel from '../../../../assets/icons/cd-cancel.svg';
import ImageUpload from '../../../../assets/icons/cd-camera.svg';

const ProductImageUpload = ({
	formikProps,
	className,
	uploadButtonIcon,
	placeholder,
	preLoadedImages,
}) => {
	const [previewImages, setPreviewImages] = useState([]);
	const [allImages, setAllImages] = useState([]);
	const [removeImages, setRemoveImages] = useState([]);
	const [mouseEnterIndex, setMouseEnterIndex] = useState(false);

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

	// allImages.map((image) => {
	// 	console.log(image instanceof File);
	// });

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
		if (preLoadedImages.length > 0 || !preLoadedImages) {
			setAllImages(preLoadedImages);
		}
	}, [preLoadedImages]);

	useEffect(() => {
		formikProps.setFieldValue('images', allImages);

		return () => {
			allImages.forEach(
				(image) => image instanceof File && URL.revokeObjectURL(image),
			);
		};
	}, [allImages]);

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

	// console.log(allImages);

	const handleReplace = (e, index) => {
		// console.log('Image Upload!');

		const file = e.target.files[0];
		// console.log(file);
		allImages[index] = file;

		// console.log('after replace', replaceed);

		// console.log(replaceed)

		// setAllImages(replaceed);
		setMouseEnterIndex(null);
	};

	console.log('before replace', allImages);

	return (
		<>
			<div className='p-3 rounded-lg'>
				<div className={`flex items-center gap-3 ${className}`}>
					<div className='flex md:max-w-[600px] scrollbar overflow-x-auto overflow-y-hidden'>
						{allImages.map((image, index) => (
							<div
								key={index}
								className={`w-[134px] h-[133px] border rounded-lg flex items-center justify-center relative p-3`}
								onMouseEnter={() => setMouseEnterIndex(index)}
								// onMouseOutCapture={() => setMouseEnterIndex(null)}
							>
								<img
									src={
										image instanceof File
											? URL.createObjectURL(image)
											: `${baseURL}/${image}`
									}
									alt=''
									className='max-w-[123px] min-w-[123px] h-[123px]'
								/>
								{/* hover effect  */}
								{mouseEnterIndex === index && (
									<div
										className={`bg-black/60 rounded-lg absolute z-50 w-[134px] h-[133px] flex-col flex items-center gap-2 justify-center`}
									>
										<div>
											<label
												className='py-1 px-3 bg-white text-[#0D3D4B] rounded text-sm font-medium'
												htmlFor={`r${index}`}
											>
												Replace
											</label>
											<input
												type='file'
												name={`r${index}`}
												id={`r${index}`}
												className='hidden'
												// hidden
												// onChange={(e) =>{

												// 	console.log("sakdsadsahj")
												// 	handleReplace(e, index)}}
												// onChange={(e) => console.log(e.target.files)}
												onChange={(e) => handleReplace(e, index)}
											/>
										</div>
										<button
											onClick={(e) => {
												e.preventDefault();
												handleImageDelete(index);
											}}
											className='py-1 px-3 bg-white text-[#0D3D4B] rounded text-sm font-medium'
										>
											Remove
										</button>
									</div>
								)}
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

export default ProductImageUpload;
