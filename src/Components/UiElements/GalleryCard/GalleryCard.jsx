import { useEffect, useState } from "react";
import errorImg from '../../../assets/noImages.svg'

const GalleryCard = ({ data }) => {
  console.log(data);
  const [presentImage, setPresentImage] = useState(data[0]);
  useEffect(() => {
    setPresentImage(data[0]);
  }, [data]);

  const handleLoading = (event) =>{
    // console.log(`Picture successfully ${event.currentTarget.src} loaded.`);

  }
  const handleError = (event) => {
    event.currentTarget.src = errorImg;
    event.currentTarget.className = ""
  }

  const imgFn = (imgSrc) => {
    return (
      <img
        onClick={() => setPresentImage(imgSrc)}
        onLoad={handleLoading} onError={handleError}
        className="h-full p-4 border rounded-xl cursor-pointer duration-200 active:scale-95 w-full"
        src={`${import.meta.env.VITE_SERVER_URL}/${imgSrc}`}
        alt="product image"
      />
    );
  };

  return (
    <div className="w-full h-[35vh] lg:h-full flex gap-4">
      <aside className="w-1/4 rounded-xl  h-full flex flex-col gap-4 overflow-auto no-scrollbar">
        {data?.map((item) => imgFn(item))}
      </aside>
      <aside className="w-full h-full border rounded-xl flex-1 overflow-hidden flex items-center justify-center">
        <img
          className="h-full w-full p-4 duration-500 hover:scale-105 object-contain "
          onLoad={handleLoading} onError={handleError}
          src={`${import.meta.env.VITE_SERVER_URL}/${presentImage}`}
          alt="product image"
        />
      </aside>
    </div>
  );
};

export default GalleryCard;
