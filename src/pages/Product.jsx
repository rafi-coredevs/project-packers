import { useLoaderData } from "react-router-dom";
import PriceCard from "../Components/PriceCard/PriceCard";
import Showcase from "../Components/Showcase/Showcase";
import Breadcrumb from "../Components/UiElements/Breadcrumb/Breadcrumb";
import GalleryCard from "../Components/UiElements/GalleryCard/GalleryCard";
import { useEffect, useState } from "react";
// import Slider from "../Components/UiElements/Slider/Slider";

const Product = () => {
  const product = useLoaderData();
  const [relatedProduct, setrelatedProduct] = useState([]);
  const dispatch = useDispatch();
  //  API FETCHING FOR RELATED PRODUCT
  useEffect(() => {
    if (product.status !== 200) {
      return <div>Something wents wrong</div>;
    } else {
      getApi(
        `/product?limit=8&paginate=true&category=${product?.data?.category}`
      ).then((res) => {
        if (res.status === 200) {
          setrelatedProduct(res.data.docs);
        } else console.log(res.response.data);
      });
    }
  }, []);
  const requsetItemHandler = () => {
    const data = {
      productId: product.data._id,
      quantity: 1,
    };
    postApi("/user/cart", data).then((res) => {
      if (res.status === 200) {
  
        dispatch(userSignin(res.data));
      } 
    });
  };
  return (
    <>
      <main>
        <Breadcrumb title={product?.data?.name} />
        <div className="container mx-auto my-12">
          <div className="grid grid-cols-5 px-2 sm:px-0 gap-8">
            <div className="col-span-5 sm:col-span-3">
              <GalleryCard data={product?.data?.thumbnails} />
            </div>
            <div className="col-span-5 sm:col-span-2">
              <PriceCard
                type={"product"}
                price={product?.data?.price}
                source={product?.data?.whereToBuy}
                origin={product?.data?.from}
                arrival={
                  product?.data?.deliveryTime?.min +
                  " - " +
                  product?.data?.deliveryTime?.max +
                  " days"
                }
                onSubmit={requsetItemHandler}
              />
            </div>
          </div>
          <div className="px-[20px] sm:px-0 my-12">
            <h3 className="text-secondary text-[20px] sm:text-[28px] font-semibold mb-4">
              {product?.data?.name}
            </h3>
            <p className=" text-[#475569] max-w-[800px]">
              {product?.data?.desc}
            </p>
          </div>
          <div className=" my-10 sm:my-36 text-center mx-auto px-[20px] sm:px-0">
            <Showcase
              type="slide"
              title="Related Items"
              description="Get inspired by what people in your city are buying from abroad with the biggest savings"
              data={relatedProduct}
            />
            {/* <Slider items={products} /> */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Product;
