import { useLoaderData } from "react-router-dom";
import PriceCard from "../Components/PriceCard/PriceCard";
import Showcase from "../Components/Showcase/Showcase";
import Breadcrumb from "../Components/UiElements/Breadcrumb/Breadcrumb";
import GalleryCard from "../Components/UiElements/GalleryCard/GalleryCard";
import { useEffect, useState } from "react";
import { terminal } from "../contexts/terminal/Terminal";
import { useTitle } from "../Components/Hooks/useTitle";
import toaster from "../Util/toaster";
import { useCartCtx } from "../contexts/cart/CartContext";

const Product = () => {
  const product = useLoaderData();
  useTitle(product?.name);
  const { getCart } = useCartCtx()
  const [relatedProduct, setrelatedProduct] = useState([]);
  useEffect(() => {
    terminal
      .request({
        name: "allProduct",
        query: {
          category: product?.category?.id,
          subcategory: product?.subcategory,
        },
      })
      .then((res) => {
        setrelatedProduct(res.docs.filter((item) => item.id !== product.id));
      });
  }, [product]);
  const requsetItemHandler = () => {
    terminal.request({ name: 'registerCart', body: { products: [{ product: product.id, productQuantity: 1 }] } }).then(data => {
      if (data.id) {
        toaster({ type: 'success', message: 'Added to cart' })
        getCart()
        return
      }
      toaster({ type: 'error', message: data.message || 'An error occured. Please try again later' })
    })
  };

  return (
    <>
      <main>
        <Breadcrumb title={product?.name} />
        <div className="container mx-auto my-12">
          {/* <div className="grid grid-cols-5 px-2 sm:px-0 gap-8"> */}
          <div className="w-full lg:h-[70vh] flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-[70%] h-full px-5 lg:px-0">
              <GalleryCard data={product?.images} />
            </div>
            <div className="w-full lg:w-[30%]">
              <PriceCard
                type={"product"}
                price={product?.price + product?.tax + product?.fee}
                source={new URL(product?.link).hostname.replace(/^www\./, "")}
                origin={product?.origin}
                arrival={"1 - 2 weeks"}
                onSubmit={requsetItemHandler}
              />
            </div>
          </div>
          <div className="px-[20px] sm:px-0 my-12 w-full lg:w-[70%]">
            <h3 className="text-secondary text-[20px] sm:text-[28px] font-semibold mb-4">
              {product?.name}
            </h3>
            <p className="text-[#475569] text-justify">
              {product?.description}
            </p>
          </div>
          <div className="my-10 sm:my-36 text-center mx-auto">
            <Showcase
              type="slide"
              title="Related Items"
              description="Get inspired by what people in your city are buying from abroad with the biggest savings"
              data={relatedProduct}
            />
            {/* <Slider items={relatedProduct} /> */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Product;