import Heading from "../UiElements/Heading/Heading";
import {ProductCard} from "../UiElements/ProductCard/ProductCard";
import Button from "../UiElements/Buttons/Button";
import { useNavigate } from "react-router-dom";
const Showcase = ({ type, title, description, data }) => {
  const navigate = useNavigate();
  const item = type === "slide" ? 4 : 8;
  return (
    <div className="container mx-auto flex flex-col items-center mb-20 px-4">
      <Heading title={title} description={description} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
