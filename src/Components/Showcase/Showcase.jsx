import Heading from "../UiElements/Heading/Heading";
import { ProductCard } from "../UiElements/ProductCard/ProductCard";
import Button from "../UiElements/Buttons/Button";
import { useNavigate } from "react-router-dom";
import arrow from '../../assets/icons/cd-arrow-left-1.svg'
import { useEffect, useState } from "react";
const Showcase = ({ type, title, description, data }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState({ start: 0, end: 4 })
  const screen = window.screen.width;
  useEffect(() => {
    setItems(data);
    if (screen <= 768 && screen > 450) {
      setIndex({ start: 0, end: 3 })
    } else if (screen < 450) {
      setIndex({ start: 0, end: 2 })
    } else {
      setIndex({ start: 0, end: 4 })
    }
  }, [data, screen])
  const increment = () => {
    if (index.end < items.length) {
      const update = { start: index.start + 1, end: index.end + 1 }
      setIndex(update)
    }
  }
  const decrement = () => {
    if (index.start > 0) {
      const update = { start: index.start - 1, end: index.end - 1 }
      setIndex(update)
    }
  }
  return (
    <div className="container mx-auto flex flex-col items-center mb-[9.25rem] px-4">
      <Heading title={title} description={description} />
      {type === 'slide' ? <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        <div className="absolute flex justify-between w-full top-[40%] z-10">
          <img onClick={decrement} className="-ml-7 p-4 bg-primary rounded-full cursor-pointer" src={arrow} alt="" />
          <img onClick={increment} className="-mr-7 p-4 bg-primary rounded-full cursor-pointer rotate-180" src={arrow} alt="" />
        </div>
        {items?.slice(index.start, index.end).map((item, i) => {
          return (
            <ProductCard
              key={i}
              id={item?.id}
              img={item?.images[0]}
              title={item?.name}
              price={item?.price + item?.tax + item?.fee}
              isShop={false}
            />
          );
        }
        )}
      </div>
        :
        (
          <>
            <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {type === 'slide' && <div className="absolute flex justify-between w-full top-[40%] z-10">
                <img className="-ml-7 p-4 bg-primary rounded-full cursor-pointer" src={arrow} alt="" />
                <img className="-mr-7 p-4 bg-primary rounded-full cursor-pointer rotate-180" src={arrow} alt="" />
              </div>}
              {items?.slice(0, 8).map((item, i) => {
                return (
                  <ProductCard
                    key={i}
                    id={item?.id}
                    img={item?.images[0]}
                    title={item?.name}
                    price={item?.price + item?.tax + item?.fee}
                    isShop={false}
                  />
                );
              }
              )}
            </div>
            <div className="mt-8">
              <Button onClick={() => navigate("/shop")} type="primary" arrow>
                View More Items
              </Button>
            </div>
          </>
        )}
    </div>
  );
};

export default Showcase;
