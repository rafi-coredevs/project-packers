import { useEffect, useState } from "react";
import cancel from "../../../assets/icons/cd-cancel.svg";
import ImageUpload from "../../../assets/icons/cd-camera.svg";

const ImageUploader = ({ formikProps, className }) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [allImages, setAllImages] = useState([]);

  /**
   *
   * @description - used for image add
   */
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAllImages((prev) => [...prev, file]);
    setPreviewImages((prev) => [...prev, URL.createObjectURL(file)]);
  };

  /**
   *
   * @description - used for image delete
   */
  const handleImageDelete = (index) => {
    const updatedPreviewImages = previewImages.filter((_, i) => i !== index);
    const updatedAllImages = allImages.filter((_, i) => i !== index);
    setPreviewImages(updatedPreviewImages);
    setAllImages(updatedAllImages);
  };

  /**
   *
   * @description - for add image in form
   */
  useEffect(() => {
    formikProps.setFieldValue("images", allImages); // Register the allImages array
    return () => {
      previewImages.forEach((image) => URL.revokeObjectURL(image));
    };
  }, [allImages, previewImages]);

  /**
   *
   * @description - used for image drag and drop
   */
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setAllImages((prev) => [...prev, file]);
    setPreviewImages((prev) => [...prev, URL.createObjectURL(file)]);
  };

  return (
    <>
      <div className="p-2 rounded-lg h-full">
        <div className="flex items-center gap-3">
          <div className="flex max-w-[140px] md:max-w-[400px]  overflow-x-scroll overscroll-y-none">
            {/* Preview Images */}
            {previewImages.map((image, index) => (
              <div
                key={index}
                className={`w-[134px] h-[133px] border rounded-lg flex items-center justify-center relative p-3	`}
              >
                <img
                  src={image}
                  alt=""
                  className="max-w-[123px] min-w-[123px] "
                />

                {/* image cancel button */}
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
          {/* image select button */}
          <div>
            <label
              htmlFor="file"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className={`cursor-pointer w-[134px] h-[133px] border rounded-lg flex flex-col items-center justify-center`}
            >
              <img src={ImageUpload} alt="" />
              <span>Upload Image</span>
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
