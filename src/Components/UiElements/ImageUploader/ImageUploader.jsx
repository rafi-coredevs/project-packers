import React, { useEffect, useState } from "react";
import cancel from "../../../assets/icons/cd-cancel.svg";
import ImageUpload from "../../../assets/icons/cd-camera.svg";

/**
 * imageUploader component for handling image uploads and replacements.
 *
 * @param {object} formikProps - Used for handling input values with formik.
 * @param {string} className - Additional CSS class names for styling.
 * @param {string} uploadButtonIcon - Icon for the upload button.
 * @param {string} placeholder - Placeholder text for the image upload.
 * @param {string} title - title text for image uploader
 */
const ImageUploader = ({
  formikProps,
  className,
  uploadButtonIcon,
  placeholder,
  title,
}) => {
  const [allImages, setAllImages] = useState([]); // Define state variables to manage uploaded images.

  /**
   * @description Handles the event when a file is selected for upload.
   * @param {Event} event - The file input change event.
   */
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (event.target.files.length > 0) {
      setAllImages((prev) => [...prev, file]);
    }
  };

  /**
   * @description Registers uploaded images,
   * Also handles cleanup when the component unmounts.
   */
  useEffect(() => {
    formikProps.setFieldValue("images", allImages); // Set Formik field value for 'images'.

    // Cleanup function to revoke Object URLs for File objects.
    return () => {
      allImages.forEach(
        (image) => image instanceof File && URL.revokeObjectURL(image)
      );
    };
  }, [allImages]);

  /**
   * @description Handles image deletion by index.
   * @param {number} index - The index of the image to be deleted.
   */
  const handleImageDelete = (index) => {
    const updatedAllImages = allImages.filter((images, i) => i !== index);

    setAllImages(updatedAllImages);
  };

  /**
   * @description Handles image drag and drop events.
   * @param {Event} event - The drag and drop event.
   */
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setAllImages((prev) => [...prev, file]);
  };


  return (
    <>
      <div className=" rounded-lg ">
        <p className="text-base font-semibold text-[#0D3D4B] mb-2">{title}</p>
        <div className={`flex items-center gap-3 ${className}`}>
          <div className="flex  md:max-w-[400px] scrollbar  overflow-x-auto overflow-y-hidden">
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
                  alt=""
                  className="max-w-[123px] min-w-[123px] h-[123px]"
                />
                <button
                  className="p-1 bg-[#CFF6EF] rounded-full absolute right-2 top-2"
                  onClick={(e) => {
                    e.preventDefault();
                    handleImageDelete(index);
                  }}
                >
                  <img src={cancel} alt="" className="w-4" />
                </button>
              </div>
            ))}
          </div>
          <div>
            <label
              htmlFor="file"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className={`cursor-pointer w-[134px] h-[133px] border rounded-lg flex flex-col items-center justify-center`}
            >
              <img
                src={uploadButtonIcon ? uploadButtonIcon : ImageUpload}
                alt=""
              />
              <span className="text-center px-2">
                {placeholder ? placeholder : "Upload Image"}
              </span>
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUploader;
