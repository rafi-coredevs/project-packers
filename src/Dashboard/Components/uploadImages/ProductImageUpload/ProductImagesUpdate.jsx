import React, { useEffect, useState } from 'react';
import ImageUpload from '../../../../assets/icons/cd-camera.svg';

const ProductImageUpload = ({
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
		if (preLoadedImages.length > 0 || !preLoadedImages) {
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

	/**
	 * @description - for handling image replace
	 */
	const handleReplace = (e, index) => {
		const file = e.target.files[0];
		const replacedImage = allImages[index];
		setRemoveImages((prev) => [...prev, replacedImage]);
		console.log(allImages[index]);
		allImages[index] = file;
	};

	return (
		<>
			<div className='p-3 rounded-lg'>
				<div className={`flex items-center gap-3 ${className}`}>
					<div className='flex md:max-w-[600px] scrollbar overflow-x-auto overflow-y-hidden'>
						{allImages.map((image, index) => (
							<div
								key={index}
								className={`w-[134px] h-[133px] border rounded-lg flex items-center justify-center relative p-3`}
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
								{/* hover effect  */}
								{
									<div
										className={`bg-black/60 rounded-lg absolute z-50 w-[134px] h-[133px] flex-col flex items-center gap-2 justify-center opacity-0 hover:opacity-100`}
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
								}
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
