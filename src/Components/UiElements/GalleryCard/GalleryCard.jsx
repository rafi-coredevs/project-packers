import { useEffect, useState } from "react";
import { BASE_URL } from "../../../Util/apiCall";

const GalleryCard = ({ data }) => {
  const [presentImage, setPresentImage] = useState(data[0]);
  useEffect(() => {
    setPresentImage(data[0]);
  }, [data]);
  const imgFn = (imgSrc) => {
    return (
      <img
        onClick={() => setPresentImage(imgSrc)}
        className="p-4 border rounded-xl cursor-pointer duration-200 active:scale-95 w-full"
        src={`${BASE_URL}/api/${imgSrc}`}
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
          src={`${BASE_URL}/api/${presentImage}`}
          alt="product image"
        />
      </aside>
    </div>
  );
};

export default GalleryCard;
