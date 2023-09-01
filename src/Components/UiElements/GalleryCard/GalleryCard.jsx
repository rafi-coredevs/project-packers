import { useEffect, useState } from "react";

const GalleryCard = ({ data }) => {
  const [presentImage, setPresentImage] = useState(data[0]);
  useEffect(() => {
    setPresentImage(data[0]);
  }, [data]);
  const imgFn = (imgSrc) => {
    return (
      <img
        onClick={() => setPresentImage(imgSrc)}
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
      <aside className="w-full h-full border rounded-xl flex-1 overflow-hidden">
        <img
          className="h-full w-full p-4 duration-500 hover:scale-105 object-contain"
          src={`${import.meta.env.VITE_SERVER_URL}/${presentImage}`}
          alt="product image"
        />
      </aside>
    </div>
  );
};

export default GalleryCard;
