import { useEffect, useState } from "react";
import { BASE_URL } from "../../../Util/apiCall";
import errorImg from '../../../assets/noImages.svg'
const GalleryCard = ({ data }) => {
  const [presentImage, setPresentImage] = useState(data[0]);
  useEffect(() => {
    setPresentImage(data[0]);
  }, [data]);

  const handleLoading = (event) =>{
    // console.log(`Picture successfully ${event.currentTarget.src} loaded.`);

  }
  const handleError = (event) => {
    event.currentTarget.src = errorImg;
    event.currentTarget.className = "flex items-center justify-center  mt-8 mx-auto"
  }

  const imgFn = (imgSrc) => {
    return (
      <img
        onClick={() => setPresentImage(imgSrc)}
        className="border rounded-xl cursor-pointer duration-200 active:scale-95 w-full"
        src={`${BASE_URL}/api/${imgSrc}`}
        onLoad={handleLoading} onError={handleError}
        alt="product image"
      />
    );
  };

  return (
    // to-do: make array for image
    <div className="w-full h-full flex px-5 gap-4">
      <aside className="w-1/4 h-full flex flex-col gap-4 overflow-y-auto">
        {data?.map((item) => imgFn(item))}
      </aside>
      <aside className="w-full flex-1">
        <img
          className="w-full  h-full border rounded-xl"
          src={`${BASE_URL}/api/${presentImage}`}
          onLoad={handleLoading} onError={handleError}
          alt="product image"
        />
      </aside>
    </div>
  );
};

export default GalleryCard;
