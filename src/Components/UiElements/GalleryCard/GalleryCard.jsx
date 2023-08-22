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
        className="border rounded-xl cursor-pointer duration-200 active:scale-95 w-full"
        src={`${BASE_URL}/api/${imgSrc}`}
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
          alt="product image"
        />
      </aside>
    </div>
  );
};

export default GalleryCard;
