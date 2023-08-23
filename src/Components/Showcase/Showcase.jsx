import Heading from "../UiElements/Heading/Heading";
import Button from "../UiElements/Buttons/Button";
// import Slider from "../UiElements/Slider/Slider";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../UiElements/ProductCard/ProductCard";
const Showcase = ({ type, title, description, data }) => {
  const navigate = useNavigate();
  const item = type === "slide" ? 4 : 8;
  return (
    <div className="container mx-auto flex flex-col items-center my-[34px] sm:my-[74px]">
      <Heading title={title} description={description} />
      <div className="grid  py-[1px] gap-[1px]   grid-cols-2 sm:grid-cols-4">
        {data?.slice(0, item).map((item,i) => {
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
        })}
      </div>
      {type !== "slide" && (
        <div className="mt-8">
          <Button onClick={() => navigate("/shop")} type="primary" arrow>
            View More Items
          </Button>
        </div>
      )}
    </div>
  );
};

export default Showcase;
